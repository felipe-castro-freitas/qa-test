/**
 * Base Page Object that contains common methods used across all page objects
 */
class BasePage {
  constructor() {
    this.url = "https://demoqa.com";
  }

  visit(path = "") {
    cy.blockAdRequests();
    cy.visit(`${this.url}${path}`, { failOnStatusCode: false });
    cy.waitForPageToLoad();
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    this.getElement(selector).click();
  }

  typeText(selector, text, parseSpecialChars = true) {
    this.getElement(selector).type(text, {
      parseSpecialCharSequences: parseSpecialChars,
    });
  }

  shouldBeVisible(selector) {
    this.getElement(selector).should("be.visible");
  }

  shouldHaveText(selector, text) {
    this.getElement(selector).should("have.text", text);
  }

  shouldContainText(selector, text) {
    this.getElement(selector).should("contain", text);
  }

  // Handle alerts
  acceptAlert() {
    cy.on("window:alert", (text) => {
      expect(text).to.exist;
      return true;
    });
  }

  // Handle confirms
  handleConfirm(accept = true) {
    cy.on("window:confirm", (text) => {
      expect(text).to.exist;
      return accept;
    });
  }

  // Handle new windows/tabs
  handleNewWindow(callback) {
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        callback(url);
        return { closed: false, close: () => {} };
      });
    });
  }
}

export default BasePage;
