import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage';
import { PulpitPage } from '../page-objects/pulpitPage';
import { loginData, transferReceivers } from '../test-data/login.data';

let loginPage: LoginPage;
let pulpitPage: PulpitPage;

const cashAmount = parseFloat((Math.random() * 999 + 1).toFixed(2));
const paymentTile = "Test";

test.describe('Quick payment and verification of saldo', () => {
    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        pulpitPage = new PulpitPage(page);

        await page.goto('/');
        await loginPage.fillLoginAndPasswordAndClickContinueButton(loginData.userId, loginData.userPassword);
    });

    test('Quick payment and verification of saldo', async () => {

        const bankSaldo = await pulpitPage.getSaldo();
        const bankSaldoRounded = parseFloat(bankSaldo.toFixed(2));
        const expectedBankSaldoAfterPayment = parseFloat((bankSaldoRounded - cashAmount).toFixed(2));
        console.log('Initial bank account: ', bankSaldoRounded);

        await pulpitPage.selectTransferReceiver(transferReceivers.receiver1.id);

        const selectedLabel = await pulpitPage.getSelectedTransferReceiver();
        await expect(selectedLabel).toBe(transferReceivers.receiver1.name);

        const cashAmountString = cashAmount.toFixed(2);
        await pulpitPage.inputValueCashAmount(cashAmountString);
        await expect(pulpitPage.transferAmountInput).toHaveValue(cashAmountString);
        console.log('User Transfer ', cashAmountString);

        await pulpitPage.inputTitleOfTransfer(paymentTile);
        await expect(pulpitPage.titleOfTransferInput).toHaveValue(paymentTile);


        console.log('Title of payment:', paymentTile);

        await pulpitPage.clickQuickPaymentButton();
        await pulpitPage.clickCloseTransferButton();

        const updatedSaldo = await pulpitPage.getSaldo();
        const updatedSaldoRounded = parseFloat(updatedSaldo.toFixed(2));
        console.log('Updated Saldo: ', updatedSaldoRounded);

        expect(updatedSaldoRounded).toBe(expectedBankSaldoAfterPayment);

    });
});