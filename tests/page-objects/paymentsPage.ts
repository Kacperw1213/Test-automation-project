import { Locator, Page } from "@playwright/test";
import { title } from "process";

export class PaymentPage {
    readonly page: Page;
    readonly availableSaldo: Locator;
    readonly financeAccount: Locator;
    readonly transferReceiver: Locator;
    readonly accountNumber: Locator;
    readonly transferAmount: Locator;
    readonly transferTitle: Locator;
    readonly transferDate: Locator;
    readonly typeOfTransfer: Locator;
    readonly submitButton: Locator;
    readonly newPaymentHeader: Locator;

    constructor(page: Page){
        this.page = page;
        this.availableSaldo = page.locator("#form_account_amount");
        this.financeAccount = page.locator("#form_account_from");
        this.transferReceiver = page.locator("#widget_4_transfer_receiver");
        this.accountNumber = page.locator("#widget_2_transfer_account");
        this.transferAmount = page.locator("widget_1_topup_amount");
        this.transferTitle = page.locator("#form_title");
        this.transferDate = page.locator("#form_date");
        this.typeOfTransfer = page.locator("#form_type1");
        this.submitButton = page.locator("#execute_btn");
        this.newPaymentHeader = page.locator('xpath=//*[@id="main_content3"]/h1');
    }

    async getSaldo(): Promise<number>{
        const bankAccountSaldo = await this.availableSaldo.textContent();
        const bankAccountSaldoInNumberValue = parseInt(bankAccountSaldo?.replace(/\D/g, '') || '0', 10);
        return bankAccountSaldoInNumberValue/100; 
    }

    async pickFinanceAccount(bankAccount): Promise<void>{
        await this.financeAccount.click();
        await this.financeAccount.selectOption({ value: bankAccount });
    }
    
    async waitUntilLoaded(): Promise<void>{
        await this.newPaymentHeader.waitFor();
    }

    async fillTransferReceiver(transferReceiver): Promise<string>{
        await this.transferReceiver.fill(transferReceiver);
        return transferReceiver;
    }

    async provideAccountNumber(accountNumber): Promise<number>{
        await this.accountNumber.fill(accountNumber);
        return accountNumber;
    }

    async provideTransferAmount(transferAmount): Promise<number> {
        await this.accountNumber.fill(transferAmount);
        return transferAmount;
    }

    async provideTitleTransfer(titleOfTransfer): Promise<void> {
        await this.transferTitle.fill(titleOfTransfer);
        return titleOfTransfer;
    }

    async setDateOfTransfer(): Promise<void> {
        await this.transferDate.click();
    }


}