import { type Locator, type Page } from 'playwright';

export class QuickPayment {
    readonly page: Page;
    readonly quickPaymentHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quickPaymentHeader = page.locator('h1.wborder', { hasText: 'szybki przelew' });
    }

    async waitUntilLoaded(): Promise<void> {
        await this.quickPaymentHeader.waitFor();
    }
}