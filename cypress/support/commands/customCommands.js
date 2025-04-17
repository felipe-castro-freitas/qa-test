// Custom commands for working with DemoQA application

// Command to scroll to an element (DemoQA often requires this)
Cypress.Commands.add("scrollToElement", (selector) => {
  cy.get(selector).scrollIntoView();
});

// Command to handle advertisements that might interfere with tests
Cypress.Commands.add("handleAds", () => {
  // Method 1: Hide ads using CSS
  cy.window().then((win) => {
    // Hide all iframes (common ad containers)
    win.document.querySelectorAll("iframe").forEach((iframe) => {
      iframe.style.display = "none";
    });

    // Hide common ad containers
    win.document
      .querySelectorAll(
        '[id*="google_ads"],[id*="advertisement"],[class*="ad-"],[class*="banner"]'
      )
      .forEach((el) => {
        el.style.display = "none";
      });
  });

  // Method 2: Handle ad-related overlays
  cy.get("body").then(($body) => {
    if ($body.find(".modal-backdrop").length > 0) {
      cy.get(".modal-backdrop").click({ force: true });
    }

    // Close cookie consent if present
    if ($body.find('[id*="cookie"]').length > 0) {
      cy.get('[id*="cookie"] button').eq(0).click({ force: true });
    }
  });

  cy.log("Ad elements have been handled");
});

Cypress.Commands.add("dismissPopupAds", () => {
  // Look for common popup ad close buttons
  cy.get("body").then(($body) => {
    // Check if popup exists and close it
    if (
      $body.find(
        '[class*="popup"],[class*="modal"],[id*="popup"],[id*="modal"]'
      ).length > 0
    ) {
      cy.get('[class*="close"],[class*="dismiss"],[aria-label*="close"]')
        .filter(":visible")
        .click({ force: true, multiple: true });
    }
  });
});

// Add this to your customCommands.js file
Cypress.Commands.add("waitForPageToLoad", () => {
  // First wait for the page to finish loading
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      if (win.document.readyState === "complete") {
        resolve();
      } else {
        win.addEventListener("load", resolve);
      }
    });
  });

  // Then handle any ads
  cy.handleAds();

  // Wait a moment for any delayed ads
  cy.wait(1000);
  cy.handleAds(); // Handle again in case of delayed ads
});

// Command to force click (useful for DemoQA elements that sometimes need force: true)
Cypress.Commands.add("forceClick", (selector) => {
  cy.get(selector).click({ force: true });
});

// Support file upload operations
Cypress.Commands.add("uploadFile", (selector, filePath) => {
  cy.get(selector).attachFile(filePath);
});
