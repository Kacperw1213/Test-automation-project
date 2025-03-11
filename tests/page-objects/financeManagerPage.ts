import { type Locator, type Page } from 'playwright';

export class FinanceManager {
    readonly page: Page;
    readonly financeManagerHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.financeManagerHeader = page.locator('h1.wborder', { hasText: ' manager finansowy ' });
    }

    async waitUntilLoaded(): Promise<void>{
        await this.financeManagerHeader.waitFor();
    }
}