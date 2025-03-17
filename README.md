## Description
Project Name: Demobank UI Test Automation
The Demobank UI Test Automation project uses Playwright with TypeScript to validate key features of the Demobank web application, including:

Login Functionality: Positive and negative test cases for login with valid and invalid credentials.
Navigation: Verifies successful navigation on the main page.
Payment Transfer: Test the payment transfer process, including the Saldo check before and after the transfer, to ensure a correct Saldo update.

## Prerequisite

Install node
- node -v -> Check node version. If we don't have results, we need to install the node
- download and install node js LTS version ->  https://nodejs.org/en
- restart IDE
- node -v -> Validate, it should contains the node version

Install node package manager
- npm init playwright@latest -> Creating a new project with the latest version of playwright

## Run the whole suite of tests
- npx playwright test

## Run separate test
- npx playwright test ./tests/"Location of your test"
    For instance npx playwright test ./tests/tests/pulpit.spec.ts
