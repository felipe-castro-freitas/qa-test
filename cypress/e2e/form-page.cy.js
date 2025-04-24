import { FormsPage } from "../support/pages";

describe(
  "Practice Form Tests - Student Registration",
  { testArea: "Form" },
  () => {
    const formsPage = new FormsPage();

    beforeEach(() => {
      // Visit the practice form page directly

      formsPage.visitPracticeFormPage();
    });
    it(
      "should submit form with all required fields and verify submission",
      { testId: "TFP-001" },
      () => {
        // Fill only required fields (first name, last name, gender, mobile)
        formsPage.fillStudentName("John", "Doe");
        formsPage.selectGender("Male");
        formsPage.fillMobileNumber("1234567890");

        // Submit the form
        formsPage.submitForm();

        // Verify the submission modal appears with correct data
        formsPage
          .verifySubmissionModalVisible()
          .verifySubmissionValue("Student Name", "John Doe")
          .verifySubmissionValue("Gender", "Male")
          .verifySubmissionValue("Mobile", "1234567890");
      }
    );

    it(
      "should submit form with all fields filled and verify submission",
      { testId: "TFP-002" },
      () => {
        // Fill all form fields
        formsPage
          .fillStudentName("Jane", "Smith")
          .fillEmail("jane.smith@example.com")
          .selectGender("Female")
          .fillMobileNumber("9876543210")
          .selectBirthDate("10", "May", "1995")
          .addSubject("Math")
          .addSubject("English")
          .selectHobby("Sports")
          .selectHobby("Reading")
          .uploadPicture("student-pic.jpg")
          .fillCurrentAddress("123 Student Lane, Academic City")
          .selectState("NCR")
          .selectCity("Delhi");

        // Submit the form
        formsPage.submitForm();

        // Verify all submitted information in the modal
        formsPage
          .verifySubmissionModalVisible()
          .verifySubmissionValue("Student Name", "Jane Smith")
          .verifySubmissionValue("Student Email", "jane.smith@example.com")
          .verifySubmissionValue("Gender", "Female")
          .verifySubmissionValue("Mobile", "9876543210")
          .verifySubmissionValue("Date of Birth", "10 May,1995")
          .verifySubmissionValue("Subjects", "Maths, English")
          .verifySubmissionValue("Hobbies", "Sports, Reading")
          .verifySubmissionValue("Picture", "student-pic.jpg")
          .verifySubmissionValue("Address", "123 Student Lane, Academic City")
          .verifySubmissionValue("State and City", "NCR Delhi");
      }
    );

    it(
      "should validate required fields and show errors",
      { testId: "TFP-003" },
      () => {
        // Submit without filling any fields
        formsPage.submitForm();

        // Verify required field errors
        formsPage
          .verifyRequiredFieldError("firstName")
          .verifyRequiredFieldError("lastName")
          .verifyRequiredFieldError("userNumber")
          .verifyRequiredRadioError("gender");

        // No modal should appear
        formsPage.verifySubmissionModalNotVisible();
      }
    );

    it(
      "should handle different gender selections",
      { testId: "TFP-004" },
      () => {
        // Test each gender option
        const genders = ["Male", "Female", "Other"];

        genders.forEach((gender) => {
          // Fill required fields
          formsPage.fillStudentName("Test", "Student");
          formsPage.selectGender(gender);
          formsPage.fillMobileNumber("1234567890");

          // Submit form
          formsPage.submitForm();

          // Verify gender in modal
          formsPage
            .verifySubmissionModalVisible()
            .verifySubmissionValue("Gender", gender);

          // Close modal and reset for next test
          formsPage.closeSubmissionModal();
          cy.reload();
          cy.waitForPageToLoad();
        });
      }
    );

    it("should handle date picker selection", { testId: "TFP-005" }, () => {
      // Fill required fields
      formsPage.fillStudentName("Test", "Student");
      formsPage.selectGender("Male");
      formsPage.fillMobileNumber("1234567890");

      // Test date picker
      formsPage.selectBirthDate("15", "March", "2000");

      // Submit form
      formsPage.submitForm();

      // Verify date in modal
      formsPage
        .verifySubmissionModalVisible()
        .verifySubmissionValue("Date of Birth", "15 March,2000");
    });

    it("should handle manual date entry", { testId: "TFP-006" }, () => {
      // Fill required fields
      formsPage.fillStudentName("Test", "Student");
      formsPage.selectGender("Male");
      formsPage.fillMobileNumber("1234567890");

      // Enter date manually
      formsPage.enterDateManually("22 Jun 1988");

      // Submit form
      formsPage.submitForm();

      // Verify date in modal
      formsPage
        .verifySubmissionModalVisible()
        .verifySubmissionValue("Date of Birth", "22 Jun,1988");
    });

    it(
      "should handle multiple subject selection",
      { testId: "TFP-007" },
      () => {
        // Fill required fields
        formsPage.fillStudentName("Test", "Student");
        formsPage.selectGender("Male");
        formsPage.fillMobileNumber("1234567890");

        // Add multiple subjects
        formsPage
          .addSubject("Math")
          .addSubject("Physics")
          .addSubject("Chemistry")
          .addSubject("Computer Science");

        // Submit form
        formsPage.submitForm();

        // Verify subjects in modal
        formsPage
          .verifySubmissionModalVisible()
          .verifySubmissionValue(
            "Subjects",
            "Maths, Physics, Chemistry, Computer Science"
          );
      }
    );

    it(
      "should handle city selection based on state",
      { testId: "TFP-008" },
      () => {
        // Fill required fields
        formsPage.fillStudentName("Test", "Student");
        formsPage.selectGender("Male");
        formsPage.fillMobileNumber("1234567890");

        // Verify city is disabled before state selection
        cy.get("#city").find("input").should("be.disabled");

        // Select state
        formsPage.selectState("Rajasthan");

        // Verify city is enabled after state selection
        cy.get("#city").should("not.be.disabled");

        // Select city
        formsPage.selectCity("Jaipur");

        // Submit form
        formsPage.submitForm();

        // Verify state and city in modal
        formsPage
          .verifySubmissionModalVisible()
          .verifySubmissionValue("State and City", "Rajasthan Jaipur");
      }
    );

    it(
      "should handle invalid mobile number format",
      { testId: "TFP-009" },
      () => {
        // Fill required fields with invalid mobile number
        formsPage.fillStudentName("Test", "Student");
        formsPage.selectGender("Male");
        formsPage.fillMobileNumber("123abc"); // Non-numeric characters

        // Submit form
        formsPage.submitForm();

        // Verify form wasn't submitted and error is shown
        formsPage.verifySubmissionModalNotVisible();
        formsPage.verifyRequiredFieldError("userNumber");
      }
    );
  }
);
