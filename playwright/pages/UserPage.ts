import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class UserPage extends BasePage {
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.getByPlaceholder('Enter email...');
        this.nameInput = this.page.getByPlaceholder('Enter name...');
        this.passwordInput = this.page.getByPlaceholder('Enter password...');
    }

    async openSignIn() {
        await this.page.click('button[aria-label="Sign in"]');
        await this.emailInput.waitFor({ state: 'visible' });
        await this.passwordInput.waitFor({ state: 'visible' });
    }

    async fillSignInForm(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async fillSignUpForm(email: string, name: string, password: string) {
        await this.emailInput.fill(email);
        await this.nameInput.fill(name);
        await this.passwordInput.fill(password);
    }

    async signIn(email: string, password: string) {
        await this.openSignIn();
        await this.fillSignInForm(email, password);
        await this.submit();
    }

    async signUp(email: string, name: string, password: string) {
        await this.openSignIn();
        await this.page.click('button[aria-label="Sign up"]');

        await this.emailInput.waitFor({ state: 'visible' });
        await this.nameInput.waitFor({ state: 'visible' });
        await this.passwordInput.waitFor({ state: 'visible' });

        await this.fillSignUpForm(email, name, password);
        await this.submit();
    }

    async signOut() {
        await this.page.click('button[aria-label="Sign out"]');
    }

    async assertSignedIn() {
        await expect(this.page.getByText(/successfully logged in as/i)).toBeVisible();
    }

    async assertSignedOut() {
        await expect(this.page.getByText(/to use the app, you need to log in/i)).toBeVisible();
    }
}
