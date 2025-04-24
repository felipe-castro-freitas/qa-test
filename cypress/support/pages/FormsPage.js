import BasePage from "./BasePage";

class FormsPage extends BasePage {
  constructor() {
    super();
    // Page paths
    this.path = "/forms";
    this.practiceFormPath = "/automation-practice-form";

    // Form field selectors
    this.firstName = "#firstName";
    this.lastName = "#lastName";
    this.email = "#userEmail";
    this.genderMale = "label[for='gender-radio-1']";
    this.genderFemale = "label[for='gender-radio-2']";
    this.genderOther = "label[for='gender-radio-3']";
    this.mobileNumber = "#userNumber";
    this.dateOfBirth = "#dateOfBirthInput";
    this.subjectsInput = "#subjectsInput";
    this.hobbyCheckboxes = ".custom-checkbox";
    this.pictureUpload = "#uploadPicture";
    this.currentAddress = "#currentAddress";
    this.stateSelect = "#state";
    this.citySelect = "#city";
    this.submitButton = "#submit";

    // Results modal
    this.submissionModal = ".modal-dialog";
    this.modalCloseButton = "#closeLargeModal";
    this.submissionTable = ".table";
  }

  // Navigation methods
  visitPracticeFormPage() {
    this.visit(this.practiceFormPath);
    return this;
  }

  // Form filling methods
  fillStudentName(firstName, lastName) {
    cy.get(this.firstName).clear().type(firstName);
    cy.get(this.lastName).clear().type(lastName);
    return this;
  }

  fillEmail(email) {
    cy.get(this.email).clear().type(email);
    return this;
  }

  selectGender(gender) {
    const genderMap = {
      Male: this.genderMale,
      Female: this.genderFemale,
      Other: this.genderOther,
    };

    cy.get(genderMap[gender]).click();
    return this;
  }

  fillMobileNumber(number) {
    cy.get(this.mobileNumber).clear().type(number);
    return this;
  }

  selectBirthDate(day, month, year) {
    cy.get(this.dateOfBirth).click();

    // Select month
    cy.get(".react-datepicker__month-select").select(month);

    // Select year
    cy.get(".react-datepicker__year-select").select(year);

    // Select day
    cy.get(`.react-datepicker__day--0${day}`).first().click();

    return this;
  }

  enterDateManually(dateText) {
    cy.get(this.dateOfBirth).clear().type(dateText).type("{enter}");
    return this;
  }

  addSubject(subject) {
    cy.get(this.subjectsInput).type(subject);
    cy.get(".subjects-auto-complete__menu").contains(subject).click();
    return this;
  }

  selectHobby(hobby) {
    cy.contains("label", hobby).click();
    return this;
  }

  uploadPicture(fileName) {
    cy.get(this.pictureUpload).attachFile(fileName);
    return this;
  }

  fillCurrentAddress(address) {
    cy.get(this.currentAddress).clear().type(address);
    return this;
  }

  selectState(state) {
    cy.get(this.stateSelect).click();
    cy.contains(".css-11unzgr div", state).click();
    return this;
  }

  selectCity(city) {
    cy.get(this.citySelect).click();
    cy.contains(".css-11unzgr div", city).click();
    return this;
  }

  submitForm() {
    cy.get(this.submitButton).click();
    return this;
  }

  // Verification methods
  verifySubmissionModalVisible() {
    cy.get(this.submissionModal).should("be.visible");
    return this;
  }

  verifySubmissionModalNotVisible() {
    cy.get(this.submissionModal).should("not.exist");
    return this;
  }

  verifySubmissionValue(label, value) {
    cy.get(this.submissionTable)
      .contains("td", label)
      .siblings("td")
      .should("contain", value);
    return this;
  }

  closeSubmissionModal() {
    cy.get(this.modalCloseButton).click();
    return this;
  }

  verifyRequiredFieldError(fieldId) {
    cy.get(`#${fieldId}`).should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
    return this;
  }

  verifyRequiredRadioError(fieldId) {
    cy.get(`input[name="${fieldId}"]`).each(($radio) => {
      cy.wrap($radio).next().and("have.css", "color", "rgb(220, 53, 69)");
    });
  }

  verifyInvalidFieldError(fieldId) {
    cy.get(`#${fieldId}`).should("have.class", "is-invalid");
    return this;
  }
}

export default FormsPage;
