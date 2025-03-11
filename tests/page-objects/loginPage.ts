import { type Locator, type Page } from 'playwright';

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput:Locator;
    readonly loginErrorMessage: Locator
    readonly passwordErrorMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.locator('[data-testid="login-input"]'); // By data-testid - specific HTML element
        this.passwordInput = page.locator('#login_password') // By id
        this.loginErrorMessage = page.locator('#error_login_id');
        this.passwordErrorMessage = page.locator('#error_login_password');
        this.continueButton = page.locator("#login-btn");
    }

    async fillLoginAndPassword(userLogin, userPassword): Promise<void> {
        await this.loginInput.fill(userLogin);
        await this.passwordInput.fill(userPassword);
    }

    async fillIncorrectLoginId(userIncorrectLogin): Promise<void> {
        await this.loginInput.fill(userIncorrectLogin);
    }

    async fillIncorrectPassword(userIncorrectPassword): Promise<void> {
        await this.passwordInput.fill(userIncorrectPassword);
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async fillLoginAndPasswordAndClickContinueButton(userLogin, userPassword): Promise<void> {
        await this.fillLoginAndPassword(userLogin, userPassword);
        await this.clickContinueButton();
    }

}