import { type Locator, type Page } from 'playwright';

export class PulpitPage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly quickPayment: Locator;
    readonly phonePayment: Locator;
    readonly financeManager: Locator;
    readonly transferReceiverDropdown: Locator;
    readonly transferAmountInput: Locator;
    readonly titleOfTransferInput: Locator;
    readonly continueTransferButton: Locator;
    readonly confirmationAlertForQuickPayment: Locator;
    readonly closeTransferButton: Locator;
    
    constructor( page: Page) {
        this.page = page;
        this.pageHeader = page.locator('#header_placeholder');
        this.quickPayment = page.locator('#quick_btn');
        this.phonePayment = page.locator('#phone_btn');
        this.financeManager = page.locator('#manager_fin_btn');
        this.transferReceiverDropdown = page.locator('#widget_1_transfer_receiver');
        this.transferAmountInput = page.locator('#widget_1_transfer_amount');
        this.titleOfTransferInput = page.locator('#widget_1_transfer_title');
        this.continueTransferButton = page.locator('#execute_btn');
        this.closeTransferButton = page.locator('[data-testid="close-button"]')
    
    }

    async waitUntilLoaded(): Promise<void>{
        await this.pageHeader.waitFor();
    }

    async clickQuickPayment(): Promise<void> {
        await this.quickPayment.click();
    }

    async clickPhonePayment(): Promise<void> {
        await this.phonePayment.click();
    }

    async clickFinanceManager(): Promise<void> {
        await this.financeManager.click();
    }

    async selectTransferReceiver(receiverName: string): Promise<void> {
        await this.transferReceiverDropdown.click();
        await this.transferReceiverDropdown.selectOption({ value: receiverName });
    }

    async getSelectedTransferReceiver(): Promise<string> {
        const selectedOption = await this.transferReceiverDropdown.locator(`option:checked`);
        return await selectedOption.innerText();
    }

    async inputValueCashAmount(cashAmount): Promise<void> {
        await this.transferAmountInput.click();
        await this.transferAmountInput.fill(cashAmount);
    }

    async inputTitleOfTransfer(titleOfTransfer: string): Promise<void> {
        await this.titleOfTransferInput.click();
        await this.titleOfTransferInput.fill(titleOfTransfer);
    }

    async clickQuickPaymentButton(): Promise<void> {
        await this.continueTransferButton.click();
    }

    async clickCloseTransferButton(): Promise<void> {
        await this.closeTransferButton.click();
    }
    
}