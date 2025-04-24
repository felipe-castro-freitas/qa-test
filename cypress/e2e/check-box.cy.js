import { ElementsPage } from "../support/pages";

describe("Check Box Tests", { testArea: "Elements" }, () => {
  const checkboxPage = new ElementsPage();

  beforeEach(() => {
    // Visit the checkbox page directly
    checkboxPage.visitCheckBoxPage();
  });

  it(
    "should select a single file and verify result text",
    { testId: "CBT-001" },
    () => {
      // Expand Home folder to see contents
      checkboxPage.expandFolder("Home");

      // Expand Documents folder
      checkboxPage.expandFolder("Downloads");

      // Select a single file - Downloads
      checkboxPage.selectCheckbox("Word File.doc");

      // Verify the result shows only the selected file
      checkboxPage.verifyResultContains("wordFile");
    }
  );

  it(
    "should select a folder and verify all contents are selected",
    { testId: "CBT-002" },
    () => {
      // Expand Home folder to see contents
      checkboxPage.expandFolder("Home");

      // Select the Documents folder
      checkboxPage.selectCheckbox("Downloads");

      // Verify the result shows all documents subfolder contents
      checkboxPage.verifyResultContains("downloads", "wordFile", "excelFile");
    }
  );

  it("should unselect a file after selecting it", { testId: "CBT-003" }, () => {
    // Expand Home folder to see contents
    checkboxPage.expandFolder("Home");

    // Expand Documents folder
    checkboxPage.expandFolder("Downloads");

    // Select a single file
    checkboxPage.selectCheckbox("Word File.doc");
    // Verify the file is selected
    checkboxPage.verifyResultContains("wordFile");

    // Unselect the file
    checkboxPage.selectCheckbox("Word File.doc");
    // Verify the result is cleared
    cy.get("#result").should("not.exist");
  });

  it(
    "should unselect a folder after selecting it",
    { testId: "CBT-004" },
    () => {
      // Expand Home folder to see contents
      checkboxPage.expandFolder("Home");

      // Select the downloads folder
      checkboxPage.selectCheckbox("Downloads");
      // Verify folder is selected with all contents
      checkboxPage.verifyResultContains("downloads");

      // Unselect the downloads folder
      checkboxPage.selectCheckbox("Downloads");
      // Verify the result is cleared
      cy.get("#result").should("not.exist");
    }
  );

  it(
    "should select all checkboxes using expand all and home checkbox",
    { testId: "CBT-005" },
    () => {
      // Click expand all button
      checkboxPage.expandAllFolders();

      // Select the Home folder (root)
      checkboxPage.selectCheckbox("Home");

      // Verify all items are selected
      checkboxPage.verifyResultContains(
        "home",
        "desktop",
        "notes",
        "commands",
        "documents",
        "workspace",
        "office",
        "downloads",
        "wordFile",
        "excelFile"
      );
    }
  );

  it("should unselect all after selecting all", { testId: "CBT-006" }, () => {
    // Click expand all button
    checkboxPage.expandAllFolders();
    // Select the Home folder (root)
    checkboxPage.selectCheckbox("Home");
    // Verify all items are selected
    checkboxPage.verifyResultContains("home");
    // Unselect the Home folder (root)
    checkboxPage.selectCheckbox("Home");
    // Verify the result is cleared
    cy.get("#result").should("not.exist");
  });

  it(
    "should expand and collapse all folders using buttons",
    { testId: "CBT-007" },
    () => {
      // Initially only Home is visible
      checkboxPage.verifyFolderVisible("Home");
      checkboxPage.verifyFolderNotVisible("Downloads");

      // Click expand all button
      checkboxPage.expandAllFolders();

      // Verify all folders are expanded
      checkboxPage.verifyFolderVisible(
        "Home",
        "Desktop",
        "Documents",
        "Downloads",
        "WorkSpace"
      );

      // Click collapse all button
      checkboxPage.collapseAllFolders();

      // Verify only Home is visible again
      checkboxPage.verifyFolderVisible("Home");
      checkboxPage.verifyFolderNotVisible(
        "Desktop",
        "Documents",
        "Downloads",
        "WorkSpace"
      );
    }
  );

  it(
    "should handle partial selection of folders",
    { testId: "CBT-008" },
    () => {
      // Expand Home folder to see contents
      checkboxPage.expandFolder("Home");

      // Expand Downloads folder
      checkboxPage.expandFolder("Downloads");

      // Select one file in Downloads folder
      checkboxPage.selectCheckbox("Word File.doc");
      // Verify Documents folder shows half-check state

      checkboxPage.verifyCheckboxState("Downloads", "half-checked");

      // Verify Home folder also shows half-check state
      checkboxPage.verifyCheckboxState("Home", "half-checked");

      checkboxPage.verifyResultContains("wordFile");
    }
  );
});
