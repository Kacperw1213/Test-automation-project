import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage';
import { PulpitPage } from '../page-objects/pulpitPage';
import { loginData, transferReceivers } from '../test-data/login.data';

let loginPage: LoginPage;
let pulpitPage: PulpitPage;

const cashAmount = (Math.random() * 999 + 1).toFixed(2);
const paymentTile = "Test";

test.describe('Quick payment and verification of saldo', () => {
    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        pulpitPage = new PulpitPage(page);

        await page.goto('/');
        await loginPage.fillLoginAndPasswordAndClickContinueButton(loginData.userId, loginData.userPassword);
    });

    test('Quick payment and verification of saldo', async ({ page }) => {

        await pulpitPage.selectTransferReceiver(transferReceivers.receiver1);

        const selectedLabel = await pulpitPage.getSelectedTransferReceiver();
        await expect(selectedLabel).toBe('Jan Demobankowy');

        await pulpitPage.inputValueCashAmount(cashAmount);
        await expect(pulpitPage.transferAmountInput).toHaveValue(cashAmount);

        await pulpitPage.inputTitleOfTransfer(paymentTile);
        await expect(pulpitPage.titleOfTransferInput).toHaveValue(paymentTile);

        // If we need to debug, we can user console.log to check what is "stored" in the logs
        console.log('Title of payment:', paymentTile);

        await pulpitPage.clickQuickPaymentButton();
        await pulpitPage.clickCloseTransferButton();
        
    });
});