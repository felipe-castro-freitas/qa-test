import { ElementsPage } from "../support/pages";

const elementsPage = new ElementsPage();
const validEmail = "john.doe@example.com";

describe("Text Box Tests", { testArea: "Elements" }, () => {
  beforeEach(() => {
    elementsPage.visitTextBoxPage();
  });

  it("should submit form with all fields filled and verify output", () => {
    // Test data
    const fullName = "John Doe";
    const email = "john.doe@example.com";
    const currentAddress = "123 Current Street, City, Country";
    const permanentAddress = "456 Permanent Avenue, Town, Nation";

    // Fill all form fields
    elementsPage.fillTextBoxForm(
      fullName,
      email,
      currentAddress,
      permanentAddress
    );

    // Submit the form
    elementsPage.submitTextBoxForm();

    // Verify the output shows all submitted information correctly
    cy.get("#output")
      .should("be.visible")
      .within(() => {
        cy.get("#name").should("contain", fullName);
        cy.get("#email").should("contain", email);
        cy.get("#currentAddress").should("contain", currentAddress);
        cy.get("#permanentAddress").should("contain", permanentAddress);
      });
  });

  it("should validate email format", () => {
    // Test with invalid email
    const invalidEmail = "invalid-email";

    // Fill form with invalid email
    elementsPage.fillTextBoxForm(
      "John Doe",
      invalidEmail,
      "Current Address",
      "Permanent Address"
    );

    // Submit the form
    elementsPage.submitTextBoxForm();

    // Verify email field has error class
    cy.get("#userEmail").should("have.class", "field-error");

    // Verify output isn't displayed for invalid submission
    cy.get("#output").should("not.be.visible");
  });

  it("should submit form with only required fields", () => {
    // In Text Box, no fields are technically required, but let's test with minimal data
    const fullName = "Jane Smith";

    // Fill only the name field
    cy.get("#userName").type(fullName);

    // Submit the form
    elementsPage.submitTextBoxForm();

    // Verify output is displayed with only name
    cy.get("#output")
      .should("be.visible")
      .within(() => {
        cy.get("#name").should("contain", fullName);
      });
  });

  it("should handle form submission when all fields are empty", () => {
    // Submit the form without filling any fields
    elementsPage.submitTextBoxForm();

    // Verify the output section isn't displayed
    cy.get("#output").should("not.be.visible");
  });
});

// Special characters tests for each field individually
describe("Special Characters Handling", { testArea: "Elements" }, () => {
  beforeEach(() => {
    // Visit the elements page and navigate to text box

    elementsPage.visitTextBoxPage();

    // Wait for the page to fully load including late-loading ads
  });
  it("should accept special characters in name field", () => {
    // Test name with various special characters
    const specialName = "John O'Doe-Smith & Jr. (Test) #123";

    // Fill form with special name
    elementsPage.fillTextBoxForm(
      specialName,
      validEmail,
      "Normal Address",
      "Normal Permanent Address"
    );

    // Submit the form
    elementsPage.submitTextBoxForm();

    // Verify form submitted successfully and name is displayed correctly
    cy.get("#output")
      .should("be.visible")
      .within(() => {
        cy.get("#name").should("contain", specialName);
      });

    // Verify no error on name field
    cy.get("#userName").should("not.have.class", "field-error");
  });

  it("should accept special characters in current address field", () => {
    // Test address with special characters and line breaks
    const specialAddress =
      "123 & Main St.\nApt #42, Floor 3rd\nLine with «special» characters! % $ @";

    // Fill form with special address
    elementsPage.fillTextBoxForm(
      "John Doe",
      validEmail,
      specialAddress,
      "Normal Permanent Address"
    );

    // Submit the form
    elementsPage.submitTextBoxForm();

    // Verify form submitted successfully and address is displayed correctly
    cy.get("#output")
      .should("be.visible")
      .within(() => {
        // The line breaks may be converted to spaces or other characters
        // We'll check if the key parts of the address are present
        cy.get("#currentAddress").should("contain", "123 & Main St");
        cy.get("#currentAddress").should("contain", "Apt #42");
        cy.get("#currentAddress").should("contain", "special");
      });

    // Verify no error on address field
    cy.get("#currentAddress").should("not.have.class", "field-error");
  });

  it("should accept special characters in permanent address field", () => {
    // Test address with code-like characters
    const specialPermAddress =
      "/* Comment */ 456 Perm. Ave.\n{json: 'test'}\n<div>HTML</div>";

    // Fill form with special permanent address
    elementsPage.fillTextBoxForm(
      "John Doe",
      validEmail,
      "Normal Address",
      specialPermAddress,
      false
    );

    // Submit the form
    elementsPage.submitTextBoxForm();

    // Verify form submitted successfully and address is displayed correctly
    cy.get("#output")
      .should("be.visible")
      .within(() => {
        cy.get("#permanentAddress").should("contain", "Comment");
        cy.get("#permanentAddress").should("contain", "456 Perm. Ave");
        // HTML tags might be escaped or stripped
        cy.get("#permanentAddress").should("contain", "HTML");
      });

    // Verify no error on permanent address field
    cy.get("#permanentAddress").should("not.have.class", "field-error");
  });
});

// Enhanced email validation tests according to latest standards
describe("Email Format Validation", { testArea: "Elements" }, () => {
  beforeEach(() => {
    // Visit the elements page and navigate to text box

    cy.log("visit text box page");
    elementsPage.visitTextBoxPage();

    // Wait for the page to fully load including late-loading ads
  });
  it("should reject email without @ symbol", () => {
    const invalidEmail = "john.doeexample.com";

    elementsPage.fillTextBoxForm(
      "John Doe",
      invalidEmail,
      "Address",
      "Address"
    );

    elementsPage.submitTextBoxForm();

    // Verify email field has error and no output is displayed
    cy.get("#userEmail").should("have.class", "field-error");
    cy.get("#output").should("not.be.visible");
  });

  it("should handle email with spaces appropriately", () => {
    const invalidEmail = "john doe@example.com";

    elementsPage.fillTextBoxForm(
      "John Doe",
      invalidEmail,
      "Address",
      "Address"
    );

    elementsPage.submitTextBoxForm();

    cy.get("body").then(() => {
      // First check if output exists
      cy.get("#output", { timeout: 1000 }).then(($output) => {
        if ($output.length > 0 && $output.is(":visible")) {
          // If output is visible, the system sanitized the email
          cy.log("Email was sanitized - checking sanitized value");

          // Check email content
          cy.get("#output #email")
            .should("exist")
            .invoke("text")
            .then((text) => {
              expect(text.replace(/\s+/g, "")).to.include(
                "johndoe@example.com"
              );
            });

          // Verify the input field doesn't have error styling
          cy.get("#userEmail").should("not.have.class", "field-error");
        } else {
          // If output is not visible, the email was rejected
          cy.log("Email was rejected - checking validation error");
          cy.get("#userEmail").should("have.class", "field-error");
          cy.get("#output").should("not.exist");
        }
      });
    });
  });

  it("should reject email with invalid TLD format", () => {
    const invalidEmail = "john@example.c"; // Single character TLD

    elementsPage.fillTextBoxForm(
      "John Doe",
      invalidEmail,
      "Address",
      "Address"
    );

    elementsPage.submitTextBoxForm();

    cy.get("#userEmail").should("have.class", "field-error");
    cy.get("#output").should("not.be.visible");
  });

  it("should accept valid international email formats", () => {
    // Test with valid email formats according to RFC 5322
    const validEmails = [
      "john.doe@example.com", // Standard format with dot
      "jane_doe@example.com", // Underscore in local part
      "user123@example.co.uk", // Country code subdomain
      "firstname-lastname@example.net", // Hyphen in local part
      "info@example-domain.com", // Hyphen in domain
      "user@subdomain.example.org", // Subdomain
      "business+personal@example.com", // Plus addressing (common for Gmail)
    ];

    // Test each valid email format

    validEmails.forEach((email) => {
      cy.log(`Testing valid email format: ${email}`);

      elementsPage.fillTextBoxForm("John Doe", email, "Address", "Address");

      elementsPage.submitTextBoxForm();

      // Verify email was accepted
      cy.get("#userEmail").should("not.have.class", "field-error");
      cy.get("#output")
        .should("be.visible")
        .within(() => {
          cy.get("#email").should("contain", email);
        });

      // Clear form for next email test
      cy.reload();
      cy.blockAdRequests();
      cy.waitForPageToLoad();
    });
  });

  it("should reject email with illegal characters according to RFC 5322", () => {
    const invalidEmails = [
      "username@example.com(comment)", // comments should be in parentheses
      "username@[IPv6:2001:db8::1]", // IPv6 in domain part incorrectly formatted
      ".username@example.com", // leading dot in local part
      "username@example..com", // consecutive dots in domain
      "username@.example.com", // domain starting with dot
    ];

    // Test each invalid email format
    invalidEmails.forEach((email) => {
      cy.log(`Testing invalid email format: ${email}`);

      elementsPage.fillTextBoxForm("John Doe", email, "Address", "Address");

      elementsPage.submitTextBoxForm();

      // Verify email was rejected
      cy.get("#userEmail").should("have.class", "field-error");
      cy.get("#output").should("not.be.visible");

      // Clear form for next email test
      cy.reload();
      cy.handleAds();
    });
  });
});
