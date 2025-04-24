// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "./commands/customCommands";

// Import Cypress file upload plugin
// import "cypress-file-upload";

// Alternatively you can use CommonJS syntax:
// require('./commands')

const path = require("path");
const reporter = require("./reporter");

// Before all tests
before(() => {
  // Reset reporter for a fresh run
  reporter.results = [];
  reporter.summary = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
  };
});

// After each test
Cypress.on("test:after:run", (test, runnable) => {
  // Extract test metadata
  const testArea =
    runnable.parent.testArea || runnable.parent.parent?.testArea || "Unknown";

  const testId = test.testId || `Test-${reporter.summary.total + 1}`;
  const description = test.title;

  let status;
  if (test.state === "passed") status = "PASSED";
  else if (test.state === "failed") status = "FAILED";
  else status = "SKIPPED";

  // Add to reporter
  reporter.addResult(testArea, testId, description, status);
});

// After all tests
after(() => {
  // Get the spec file name from Cypress.spec
  const specFile = Cypress.spec
    ? path.basename(Cypress.spec.name, ".cy.js")
    : "unknown";

  // Save the report data with test info
  const reportData = reporter.getReportData();
  reportData.testInfo = {
    name: specFile,
    browser: Cypress.browser ? Cypress.browser.name : "unknown",
    viewport: `${Cypress.config("viewportWidth")}x${Cypress.config(
      "viewportHeight"
    )}`,
  };

  cy.task("saveReportData", reportData).then((dataPath) => {
    cy.log(`Report data saved at: ${dataPath}`);
  });
});
