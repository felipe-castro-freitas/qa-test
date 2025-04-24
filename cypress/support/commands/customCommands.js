// Custom commands for working with DemoQA application

// Command to scroll to an element (DemoQA often requires this)
Cypress.Commands.add("scrollToElement", (selector) => {
  cy.get(selector).scrollIntoView();
});

Cypress.Commands.add("blockAdRequests", () => {
  cy.log("Blocking ad network requests...");

  // More aggressive pattern matching
  cy.intercept({ hostname: /doubleclick\.net$/ }, { statusCode: 204 }).as(
    "blockDoubleClick"
  );
  cy.intercept({ hostname: /googlesyndication\.com$/ }, { statusCode: 204 }).as(
    "blockGoogleSyndication"
  );
  cy.intercept({ hostname: /googleadservices\.com$/ }, { statusCode: 204 }).as(
    "blockGoogleAdServices"
  );
  cy.intercept({ hostname: /google-analytics\.com$/ }, { statusCode: 204 }).as(
    "blockGoogleAnalytics"
  );
  cy.intercept({ hostname: /googletagmanager\.com$/ }, { statusCode: 204 }).as(
    "blockGoogleTagManager"
  );
  cy.intercept({ hostname: /googletagservices\.com$/ }, { statusCode: 204 }).as(
    "blockGoogleTagServices"
  );
  cy.intercept({ hostname: /analytics\.google\.com$/ }, { statusCode: 204 }).as(
    "blockAnalyticsGoogle"
  );

  // Block by URL patterns
  cy.intercept("**/googleads*", { statusCode: 204 }).as("blockGoogleAds");
  cy.intercept("**/pagead*", { statusCode: 204 }).as("blockPageAds");
  cy.intercept("**/adsbygoogle*", { statusCode: 204 }).as("blockAdsByGoogle");
  cy.intercept("**/analytics*", { statusCode: 204 }).as("blockAnalytics");
  cy.intercept("**/ads/*", { statusCode: 204 }).as("blockAdsPath");
  cy.intercept("**/ad-manager/*", { statusCode: 204 }).as("blockAdManager");

  // Block common ad patterns with regex
  cy.intercept(
    { url: /\/(ads|ad|advert|adserv|banner|pop|track)\// },
    { statusCode: 204 }
  ).as("blockAdPatterns");
  cy.intercept(
    { url: /\.(ads|ad|advert|adserv|banner|pop|track)\./ },
    { statusCode: 204 }
  ).as("blockAdExtensions");

  // Block scripts with ad-related filenames
  cy.intercept("**/*ad*.js", { statusCode: 204 }).as("blockAdJs");
  cy.intercept("**/*ads*.js", { statusCode: 204 }).as("blockAdsJs");
  cy.intercept("**/*advert*.js", { statusCode: 204 }).as("blockAdvertJs");
  cy.intercept("**/*track*.js", { statusCode: 204 }).as("blockTrackingJs");
  cy.intercept("**/*pixel*.js", { statusCode: 204 }).as("blockPixelJs");

  // Block common ad dimensions
  cy.intercept("**/*300x250*", { statusCode: 204 }).as("blockBannerSize1");
  cy.intercept("**/*728x90*", { statusCode: 204 }).as("blockBannerSize2");
  cy.intercept("**/*160x600*", { statusCode: 204 }).as("blockBannerSize3");

  cy.log("Ad network requests blocked");
});

// Command to clean up ad elements - use this AFTER page has loaded
Cypress.Commands.add("cleanupAdElements", () => {
  cy.log("Starting ads elements cleanup...");
  // Clean up elements in the DOM
  cy.window().then((win) => {
    // Hide all iframes (common ad containers)
    win.document.querySelectorAll("iframe").forEach((iframe) => {
      iframe.style.display = "none";
      // Prevent iframe from loading content
      iframe.src = "about:blank";
    });

    // Hide common ad containers
    win.document
      .querySelectorAll(
        '[id*="google_ads"],[id*="advertisement"],[class*="ad-"],[class*="banner"],[class*="adsbygoogle"],[class$="-Ad"]'
      )
      .forEach((el) => {
        el.style.display = "none";
      });
  });

  // Handle ad-related overlays
  cy.get("body").then(($body) => {
    if ($body.find(".modal-backdrop").length > 0) {
      cy.get(".modal-backdrop").click({ force: true });
    }

    // Close cookie consent if present
    if ($body.find('[id*="cookie"]').length > 0) {
      cy.get('[id*="cookie"] button').eq(0).click({ force: true });
    }

    // Close any popups that might interfere with tests
    $body.find('[class*="popup"]:visible').each((_i, popup) => {
      cy.wrap(popup)
        .find('[class*="close"],[class*="dismiss"]')
        .click({ force: true });
    });
  });

  cy.log("Ad elements cleaned up");
});

Cypress.Commands.add("handleAds", () => {
  cy.blockAdRequests();
  cy.cleanupAdElements();
  cy.log("Ad handling complete (legacy method)");
});

Cypress.Commands.add("waitForPageToLoad", (options = {}) => {
  const timeoutMs = options.timeout || 30000;
  const delayMs = options.delay || 500;
  const adCheckCount = options.adCheckCount || 0;

  // Wait for document to complete loading
  cy.log("Waiting for page to finish initial loading...");
  cy.window({ timeout: timeoutMs }).then((win) => {
    return new Cypress.Promise((resolve) => {
      if (win.document.readyState === "complete") {
        resolve();
      } else {
        const listener = () => {
          win.removeEventListener("load", listener);
          resolve();
        };
        win.addEventListener("load", listener);
      }
    });
  });

  // Wait for network to be idle (all XHR completed)
  cy.log("Waiting for network requests to complete...");
  cy.wait(delayMs);

  // Multiple delayed ad checks with progressively longer waits
  // This helps catch ads that load with different timing
  for (let i = 1; i <= adCheckCount; i++) {
    cy.wait(delayMs * i);
    cy.log(`Performing ad cleanup check #${i}...`);
    cy.cleanupAdElements();
  }

  // Check page stability - look for loading indicators or spinners
  cy.log("Checking page stability...");
  cy.get("body").then(($body) => {
    // Check for common loading indicators
    const spinners = $body.find(
      '[class*="loading"],[class*="spinner"],[class*="progress"]'
    );
    if (spinners.length > 0 && spinners.is(":visible")) {
      cy.log("Loading indicators detected, waiting for them to disappear...");
      cy.get(
        '[class*="loading"],[class*="spinner"],[class*="progress"]:visible',
        { timeout: timeoutMs }
      ).should("not.exist");
    }
  });

  // Final ad cleanup after everything is settled
  cy.cleanupAdElements();
  cy.log("Page fully loaded and cleaned up");
});

// Other commands remain unchanged
Cypress.Commands.add("forceClick", (selector) => {
  cy.get(selector).click({ force: true });
});

Cypress.Commands.add("uploadFile", (selector, filePath) => {
  cy.get(selector).attachFile(filePath);
});
