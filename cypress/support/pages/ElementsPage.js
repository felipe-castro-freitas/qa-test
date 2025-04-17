import BasePage from "./BasePage";

class ElementsPage extends BasePage {
  constructor() {
    super();
    this.path = "/elements";

    // Selectors
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

  // Text Box methods
  clickTextBoxMenu() {
    this.clickElement(this.textBoxMenu);
    return this;
  }

  fillTextBoxForm(name, email, currentAddress, permanentAddress) {
    this.typeText(this.fullNameInput, name);
    this.typeText(this.emailInput, email);
    this.typeText(this.currentAddressInput, currentAddress);
    this.typeText(this.permanentAddressInput, permanentAddress);
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
