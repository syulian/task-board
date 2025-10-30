import { expect } from '@playwright/test';
import { Locales } from '@shared/config';
import { Theme } from '@shared/lib';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
    async openSettings(option: string) {
        await this.page.click('button[aria-label="Settings"]');
        if (option) await this.page.click(`button:has-text("${option}")`);
    }

    async changeTheme(theme: Theme) {
        await this.page.click(`button:has-text("${theme}")`);
    }

    async changeLanguage(language: string, locale: Locales) {
        await this.page.click(`button:has-text("${language}")`);

        const cookies = await this.page.context().cookies();
        const lang = cookies.find(c => c.name === 'lang');

        expect(lang).toBeDefined();
        expect(lang?.value).toBe(locale);
    }

    async assertDataTheme(theme: Theme) {
        await expect(this.page.locator('body')).toHaveAttribute('data-theme', theme);
    }
}
