## Prerequisites

Install node
- node -v -> Check node version. If we don't have results, we need to install node
- download and install node js LTS version ->  https://nodejs.org/en
- restart IDE
- node -v -> Validate, it should contains node version

Install node package manager
- npm init playwright@latest -> Creating new project with latest version of playwright

## Run whole suite of tests
- npx playwright test

## Run separate test
- npx playwright test ./tests/"Location of your test"
    For instance npx playwright test ./tests/tests/pulpit.spec.ts
