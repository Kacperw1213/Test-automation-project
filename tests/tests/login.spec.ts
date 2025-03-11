import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { incorrectLoginData, loginData } from '../test-data/login.data';
import { PulpitPage } from '../page-objects/pulpitPage';

let loginPage: LoginPage;
let pulpitPage: PulpitPage;

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await page.goto('/');

  });

  test('login with correct credentials', async () => {
    await loginPage.fillLoginAndPassword(loginData.userId, loginData.userPassword);
    await loginPage.clickContinueButton();
    await pulpitPage.waitUntilLoaded();
  });

  test('login with incorrect credentials', async ({ page }) => {
    const title = await page.title();
    await loginPage.fillIncorrectLoginId(incorrectLoginData.userId);
    await loginPage.fillIncorrectPassword(incorrectLoginData.userPassword);
    await expect(title).toBe('Demobank - Bankowość Internetowa - Logowanie');
  });

  test('Validation of login error messages', async () => {
    await loginPage.fillIncorrectLoginId(incorrectLoginData.userId);
    await loginPage.passwordInput.click();
    await expect(loginPage.loginErrorMessage).toBeVisible();

    await loginPage.fillIncorrectPassword(incorrectLoginData.userPassword);
    await loginPage.loginInput.click();
    await expect(loginPage.passwordErrorMessage).toBeVisible();
  });

});
