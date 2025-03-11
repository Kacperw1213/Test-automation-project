import { test, expect } from '@playwright/test';
import { PulpitPage } from '../page-objects/pulpitPage';
import { QuickPayment } from '../page-objects/quickPaymentPage';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../page-objects/loginPage';
import { PhonePayment } from '../page-objects/phonePaymentPage';
import { FinanceManager } from '../page-objects/financeManagerPage';

let pulpitPage: PulpitPage;
let quickPayment: QuickPayment;
let loginPage: LoginPage;
let phonePayment: PhonePayment;
let financeManager: FinanceManager;

test.describe('Navigation to features from tasklist bar', () => {
    test.beforeEach(async ({ page }) => {

        pulpitPage = new PulpitPage(page);
        quickPayment = new QuickPayment(page);
        loginPage = new LoginPage(page);
        phonePayment = new PhonePayment(page);
        financeManager = new FinanceManager(page);

        await page.goto('/');
        await loginPage.fillLoginAndPassword(loginData.userId, loginData.userPassword);
        await loginPage.clickContinueButton();
    });

    test('Check navigation on the taskbar, pulpit Page', async ({ page }) => {
        await test.step('Navigate to quick payment', async () => {
            await pulpitPage.waitUntilLoaded();
            await pulpitPage.clickQuickPayment();
            await quickPayment.waitUntilLoaded();
            await page.goBack();
            await pulpitPage.waitUntilLoaded();
        });

        await test.step('Navigate to phone payment page ', async () => {
            await pulpitPage.clickPhonePayment();
            await phonePayment.waitUntilLoaded();
            await page.goBack();
            await pulpitPage.waitUntilLoaded();
        });

        await test.step('Navigate to finance manager page ', async () => {
            await pulpitPage.clickFinanceManager();
            await financeManager.waitUntilLoaded();
            await page.goBack();
            await pulpitPage.waitUntilLoaded();
        });
    });
});