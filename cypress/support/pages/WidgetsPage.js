import BasePage from "./BasePage";

class WidgetsPage extends BasePage {
  constructor() {
    super();
    this.path = "/widgets";

    // Menu selectors
    this.accordianMenu = "#item-0"; // Note: there's a typo in the original site
    this.autoCompleteMenu = "#item-1";
    this.datePickerMenu = "#item-2";
    this.sliderMenu = "#item-3";
    this.progressBarMenu = "#item-4";
    this.tabsMenu = "#item-5";
    this.toolTipsMenu = "#item-6";
    this.menuMenu = "#item-7";
    this.selectMenuMenu = "#item-8";
  }

  visitWidgetsPage() {
    this.visit(this.path);
    return this;
  }

  // Add specific methods for each widget as needed
  // For example:

  clickAccordianMenu() {
    this.clickElement(this.accordianMenu);
    return this;
  }

  clickDatePickerMenu() {
    this.clickElement(this.datePickerMenu);
    return this;
  }
}

export default WidgetsPage;
