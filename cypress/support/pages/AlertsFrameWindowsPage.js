import BasePage from "./BasePage";

class AlertsFrameWindowsPage extends BasePage {
  constructor() {
    super();
    this.path = "/alertsWindows";

    // Menu selectors
    this.browserWindowsMenu = "#item-0";
    this.alertsMenu = "#item-1";
    this.framesMenu = "#item-2";
    this.nestedFramesMenu = "#item-3";
    this.modalDialogsMenu = "#item-4";

    // Browser Windows selectors
    this.newTabButton = "#tabButton";
    this.newWindowButton = "#windowButton";
    this.newWindowMessageButton = "#messageWindowButton";

    // Alerts selectors
    this.alertButton = "#alertButton";
    this.timerAlertButton = "#timerAlertButton";
    this.confirmButton = "#confirmButton";
    this.promtButton = "#promtButton"; // Note: there's a typo in the original site
    this.confirmResult = "#confirmResult";
    this.promptResult = "#promptResult";

    // Modal Dialogs
    this.smallModalButton = "#showSmallModal";
    this.largeModalButton = "#showLargeModal";
    this.closeSmallModalButton = "#closeSmallModal";
    this.closeLargeModalButton = "#closeLargeModal";
    this.modalContent = ".modal-content";
  }

  visitAlertsFrameWindowsPage() {
    this.visit(this.path);
    return this;
  }

  // Browser Windows methods
  clickBrowserWindowsMenu() {
    this.clickElement(this.browserWindowsMenu);
    return this;
  }

  clickNewTabButton() {
    // Handle new tab opening
    this.handleNewWindow((url) => {
      // You would verify the URL here if needed
      cy.log(`New tab would open with URL: ${url}`);
    });
    this.clickElement(this.newTabButton);
    return this;
  }

  clickNewWindowButton() {
    // Handle new window opening
    this.handleNewWindow((url) => {
      cy.log(`New window would open with URL: ${url}`);
    });
    this.clickElement(this.newWindowButton);
    return this;
  }

  // Alerts methods
  clickAlertsMenu() {
    this.clickElement(this.alertsMenu);
    return this;
  }

  clickAlertButton() {
    this.acceptAlert();
    this.clickElement(this.alertButton);
    return this;
  }

  clickTimerAlertButton() {
    this.acceptAlert();
    this.clickElement(this.timerAlertButton);
    // Wait for the timer to complete
    cy.wait(6000);
    return this;
  }

  clickConfirmButton(accept = true) {
    this.handleConfirm(accept);
    this.clickElement(this.confirmButton);
    return this;
  }

  clickPromptButton(text = "Cypress Test") {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(text);
    });
    this.clickElement(this.promtButton);
    return this;
  }

  // Modal Dialogs methods
  clickModalDialogsMenu() {
    this.clickElement(this.modalDialogsMenu);
    return this;
  }

  openSmallModal() {
    this.clickElement(this.smallModalButton);
    this.shouldBeVisible(this.modalContent);
    return this;
  }

  openLargeModal() {
    this.clickElement(this.largeModalButton);
    this.shouldBeVisible(this.modalContent);
    return this;
  }

  closeSmallModal() {
    this.clickElement(this.closeSmallModalButton);
    return this;
  }

  closeLargeModal() {
    this.clickElement(this.closeLargeModalButton);
    return this;
  }
}

export default AlertsFrameWindowsPage;
