# DEMOQA Testing Project

## Automated QA Technical Challenge for Insight Global

This repository contains my solution for the QA technical challenge, showcasing test automation expertise with the DEMOQA website.

## Overview

This project demonstrates comprehensive test automation of the DEMOQA website using Cypress as the primary test framework. The automation suite validates various components including forms, interactive elements, and browser functionality while following best practices in test design.

## Project Structure

- **e2e** - Test scripts organized by feature area
- **pages** - Page Object Models for improved maintainability
- **commands** - Custom Cypress commands for reusable actions
- **fixtures** - Test data files
- **/cypress/screenshots** - Automated captures of test failures

## Technologies Used

- **Primary Framework:** Cypress
- **Language:** JavaScript
- **Design Pattern:** Page Object Model
- **Testing Approach:** Behavior-Driven Development

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/demoqa-testing-challenge.git

# Navigate to project directory
cd demoqa-testing-challenge

# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:forms

# Open Cypress test runner
npm run cy:open
```

## Test Coverage

The automated test suite includes:

- Text Box form validations with special character handling
- Checkbox tree interaction and state verification
- Practice Form with various input types
- Email validation against RFC standards
- Form submission verification

## Future Enhancements

- CI/CD pipeline integration
- Expanded test coverage for additional components
- Accessibility testing implementation
- Performance measurement

## Contact

For questions regarding this technical challenge, please contact:

- Email: felipecastrofreitas@gmail.com
