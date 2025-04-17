import BasePage from "./BasePage";

class InteractionsPage extends BasePage {
  constructor() {
    super();
    this.path = "/interaction";

    // Menu selectors
    this.sortableMenu = "#item-0";
    this.selectableMenu = "#item-1";
    this.resizableMenu = "#item-2";
    this.droppableMenu = "#item-3";
    this.draggableMenu = "#item-4";
  }

  visitInteractionsPage() {
    this.visit(this.path);
    return this;
  }

  // Add interaction-specific methods as needed
}

export default InteractionsPage;
