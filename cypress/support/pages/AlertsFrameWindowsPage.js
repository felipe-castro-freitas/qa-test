import BasePage from "./BasePage";

class AlertsFrameWindowsPage extends BasePage {
  constructor() {
    super();
    // Page paths
    this.path = "/alertsWindows";
    this.browserWindowsPath = "/browser-windows";
    this.alertsPath = "/alerts";
    this.framesPath = "/frames";
    this.nestedFramesPath = "/nestedframes";
    this.modalDialogsPath = "/modal-dialogs";

    // Browser windows selectors
    this.newTabButton = "#tabButton";
    this.newWindowButton = "#windowButton";
    this.newWindowMessageButton = "#messageWindowButton";

    // Alerts selectors
    this.alertButton = "#alertButton";
    this.timerAlertButton = "#timerAlertButton";
    this.confirmButton = "#confirmButton";
    this.promptButton = "#promtButton";

    // Modal selectors
    this.smallModalButton = "#showSmallModal";
    this.largeModalButton = "#showLargeModal";
    this.modalCloseButton = "button.close";
    this.modalText = ".modal-body";
    this.modalTitle = ".modal-title";
  }

  // Navigation methods
  visitBrowserWindowsPage() {
    this.visit(this.browserWindowsPath);
    return this;
  }

  visitAlertsPage() {
    this.visit(this.alertsPath);
    return this;
  }

  visitFramesPage() {
    this.visit(this.framesPath);
    return this;
  }

  visitNestedFramesPage() {
    this.visit(this.nestedFramesPath);
    return this;
  }

  visitModalDialogsPage() {
    this.visit(this.modalDialogsPath);
    return this;
  }

  // Browser Windows methods
  clickBrowserWindowsMenu() {
    this.clickElement(this.browserWindowsMenu);
    return this;
  }

  clickNewTabButton() {
    cy.get(this.newTabButton).click();
    return this;
  }

  clickNewWindowButton() {
    cy.get(this.newWindowButton).click();
    return this;
  }

  clickNewWindowMessageButton() {
    cy.get(this.newWindowMessageButton).click();
    return this;
  }

  // Handle windows by stubbing
  stubWindowOpen() {
    cy.window().then((win) => {
      cy.stub(win, "open")
        .as("windowOpen")
        .callsFake((url) => {
          win.location.href = url;
          return { closed: false, close: cy.stub().as("windowClose") };
        });
    });
    return this;
  }

  verifyWindowOpened() {
    cy.get("@windowOpen").should("be.called");
    return this;
  }

  verifySamplePageContent() {
    cy.get("h1#sampleHeading")
      .should("be.visible")
      .and("have.text", "This is a sample page");
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
    this.clickElement(this.promptButton);
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
