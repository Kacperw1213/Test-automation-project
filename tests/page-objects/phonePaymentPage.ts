import { type Page, type Locator } from 'playwright';

export class PhonePayment {

    readonly page: Page;
    readonly phonePaymentHeader: Locator;


    constructor(page: Page) {
        this.page = page;
        this.phonePaymentHeader = page.locator('h1.wborder', { hasText: ' doładowanie telefonu ' });
    }

    async waitUntilLoaded(): Promise<void> {
        await this.phonePaymentHeader.waitFor();
    }
}
