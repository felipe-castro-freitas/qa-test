import BasePage from "./BasePage";

class ElementsPage extends BasePage {
  constructor() {
    super();
    this.path = "/elements";

    // Direct paths for each section
    this.textBoxPath = "/text-box";
    this.checkBoxPath = "/checkbox";
    this.radioButtonPath = "/radio-button";
    this.webTablesPath = "/webtables";
    this.buttonsPath = "/buttons";
    this.linksPath = "/links";
    this.brokenLinksPath = "/broken";
    this.uploadDownloadPath = "/upload-download";
    this.dynamicPropertiesPath = "/dynamic-properties";

    // Menu selectors for navigation tests
    this.textBoxMenu = "#item-0";
    this.checkBoxMenu = "#item-1";
    this.radioButtonMenu = "#item-2";
    this.webTablesMenu = "#item-3";
    this.buttonsMenu = "#item-4";
    this.linksMenu = "#item-5";
    this.brokenLinksMenu = "#item-6";
    this.uploadMenu = "#item-7";
    this.dynamicPropertiesMenu = "#item-8";

    // Text Box selectors
    this.fullNameInput = "#userName";
    this.emailInput = "#userEmail";
    this.currentAddressInput = "#currentAddress";
    this.permanentAddressInput = "#permanentAddress";
    this.submitButton = "#submit";
    this.outputBox = "#output";

    // Checkbox selectors
    this.expandAllButton = 'button[title="Expand all"]';
    this.checkboxItems = ".rct-checkbox";
    this.checkboxResult = "#result";

    // Radio Button selectors
    this.yesRadio = 'label[for="yesRadio"]';
    this.impressiveRadio = 'label[for="impressiveRadio"]';
    this.noRadio = 'label[for="noRadio"]';
    this.radioResult = ".text-success";
  }

  visitElementsPage() {
    this.visit(this.path);
    return this;
  }

  visitTextBoxPage() {
    this.visit(this.textBoxPath);
    return this;
  }

  visitCheckBoxPage() {
    this.visit(this.checkBoxPath);
    return this;
  }

  visitRadioButtonPage() {
    this.visit(this.radioButtonPath);
    return this;
  }

  visitWebTablesPage() {
    this.visit(this.webTablesPath);
    return this;
  }

  visitButtonsPage() {
    this.visit(this.buttonsPath);
    return this;
  }

  visitLinksPage() {
    this.visit(this.linksPath);
    return this;
  }

  visitBrokenLinksPage() {
    this.visit(this.brokenLinksPath);
    return this;
  }

  visitUploadDownloadPage() {
    this.visit(this.uploadDownloadPath);
    return this;
  }

  visitDynamicPropertiesPage() {
    this.visit(this.dynamicPropertiesPath);
    return this;
  }

  // Menu navigation methods for navigation tests
  clickTextBoxMenu() {
    this.clickElement(this.textBoxMenu);
    return this;
  }

  fillTextBoxForm(
    name,
    email,
    currentAddress,
    permanentAddress,
    parseSpecialChars = true
  ) {
    this.typeText(this.fullNameInput, name, parseSpecialChars);
    this.typeText(this.emailInput, email, parseSpecialChars);
    this.typeText(this.currentAddressInput, currentAddress, parseSpecialChars);
    this.typeText(
      this.permanentAddressInput,
      permanentAddress,
      parseSpecialChars
    );
    return this;
  }

  submitTextBoxForm() {
    this.clickElement(this.submitButton);
    return this;
  }

  // Checkbox methods
  clickCheckBoxMenu() {
    this.clickElement(this.checkBoxMenu);
    return this;
  }

  expandAllCheckboxes() {
    this.clickElement(this.expandAllButton);
    return this;
  }

  checkCheckbox(index = 0) {
    this.getElement(this.checkboxItems).eq(index).click();
    return this;
  }

  expandFolder(folderName) {
    cy.contains("span", folderName)
      .parent()
      .parent()
      .find(".rct-collapse-btn")
      .click();
    return this;
  }

  collapseFolder(folderName) {
    cy.contains("span", folderName)
      .parent()
      .parent()
      .find(".rct-collapse-btn")
      .click();
    return this;
  }

  expandAllFolders() {
    cy.get('button[title="Expand all"]').click();
    return this;
  }

  collapseAllFolders() {
    cy.get('button[title="Collapse all"]').click();
    return this;
  }

  selectCheckbox(label) {
    cy.contains("span", label).parent().find(".rct-checkbox").click();
    return this;
  }

  verifyResultContains(...texts) {
    cy.get("#result").should("be.visible");
    texts.forEach((text) => {
      cy.get("#result").should("contain", text);
    });
    return this;
  }

  verifyFolderVisible(...folderNames) {
    folderNames.forEach((folderName) => {
      cy.contains("span", folderName).should("be.visible");
    });
    return this;
  }

  verifyFolderNotVisible(...folderNames) {
    folderNames.forEach((folderName) => {
      cy.contains("span", folderName).should("not.exist");
    });
    return this;
  }

  verifyResultNotContains(...texts) {
    cy.get("#result").should("exist");
    texts.forEach((text) => {
      cy.get("#result").should("not.contain", text);
    });
    return this;
  }

  verifyCheckboxState(label, state) {
    const stateClass =
      state === "checked"
        ? "rct-icon-check"
        : state === "half-checked"
        ? "rct-icon-half-check"
        : "rct-icon-uncheck";

    cy.contains("span", label)
      .parent()
      .find(".rct-icon")
      .should("have.class", stateClass);

    return this;
  }

  // Radio Button methods
  clickRadioButtonMenu() {
    this.clickElement(this.radioButtonMenu);
    return this;
  }

  selectYesRadio() {
    this.clickElement(this.yesRadio);
    return this;
  }

  selectImpressiveRadio() {
    this.clickElement(this.impressiveRadio);
    return this;
  }

  attemptSelectNoRadio() {
    this.clickElement(this.noRadio);
    return this;
  }
}

export default ElementsPage;
