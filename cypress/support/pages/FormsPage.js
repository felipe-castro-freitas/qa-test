import BasePage from "./BasePage";

class FormsPage extends BasePage {
  constructor() {
    super();
    this.path = "/forms";

    // Selectors
    this.practiceFormMenu = "#item-0";

    // Form selectors
    this.firstNameInput = "#firstName";
    this.lastNameInput = "#lastName";
    this.emailInput = "#userEmail";
    this.genderRadioMale = 'label[for="gender-radio-1"]';
    this.genderRadioFemale = 'label[for="gender-radio-2"]';
    this.genderRadioOther = 'label[for="gender-radio-3"]';
    this.mobileNumberInput = "#userNumber";
    this.dateOfBirthInput = "#dateOfBirthInput";
    this.subjectsInput = "#subjectsInput";
    this.hobbiesSports = 'label[for="hobbies-checkbox-1"]';
    this.hobbiesReading = 'label[for="hobbies-checkbox-2"]';
    this.hobbiesMusic = 'label[for="hobbies-checkbox-3"]';
    this.uploadPicture = "#uploadPicture";
    this.currentAddressInput = "#currentAddress";
    this.stateDropdown = "#state";
    this.cityDropdown = "#city";
    this.submitButton = "#submit";
    this.formSubmissionModal = ".modal-content";
  }

  visitFormsPage() {
    this.visit(this.path);
    return this;
  }

  clickPracticeFormMenu() {
    this.clickElement(this.practiceFormMenu);
    return this;
  }

  fillStudentForm({
    firstName,
    lastName,
    email,
    gender,
    mobileNumber,
    dateOfBirth,
    subjects,
    hobbies,
    picture,
    currentAddress,
    state,
    city,
  }) {
    // Fill basic information
    this.typeText(this.firstNameInput, firstName);
    this.typeText(this.lastNameInput, lastName);
    this.typeText(this.emailInput, email);

    // Select gender
    if (gender === "Male") {
      this.clickElement(this.genderRadioMale);
    } else if (gender === "Female") {
      this.clickElement(this.genderRadioFemale);
    } else if (gender === "Other") {
      this.clickElement(this.genderRadioOther);
    }

    // Fill mobile number
    this.typeText(this.mobileNumberInput, mobileNumber);

    // Fill date of birth (simplified - in real tests we'd need a more robust date picker)
    if (dateOfBirth) {
      this.clickElement(this.dateOfBirthInput);
      // Would add date picker logic here
    }

    // Add subjects
    if (subjects && subjects.length) {
      subjects.forEach((subject) => {
        this.typeText(this.subjectsInput, subject);
        cy.get(".subjects-auto-complete__menu").contains(subject).click();
      });
    }

    // Select hobbies
    if (hobbies && hobbies.includes("Sports")) {
      this.clickElement(this.hobbiesSports);
    }
    if (hobbies && hobbies.includes("Reading")) {
      this.clickElement(this.hobbiesReading);
    }
    if (hobbies && hobbies.includes("Music")) {
      this.clickElement(this.hobbiesMusic);
    }

    // Upload picture
    if (picture) {
      this.getElement(this.uploadPicture).attachFile(picture);
    }

    // Current address
    if (currentAddress) {
      this.typeText(this.currentAddressInput, currentAddress);
    }

    // State and city selection
    if (state) {
      this.clickElement(this.stateDropdown);
      cy.contains(state).click();
    }

    if (city) {
      this.clickElement(this.cityDropdown);
      cy.contains(city).click();
    }

    return this;
  }

  submitForm() {
    this.clickElement(this.submitButton);
    return this;
  }

  verifyFormSubmission() {
    this.shouldBeVisible(this.formSubmissionModal);
    return this;
  }
}

export default FormsPage;
