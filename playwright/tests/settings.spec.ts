import { Locales } from '@shared/config';
import { Theme } from '@shared/lib';
import { test } from '../fixtures';
import { HOME_PAGE } from '../utils/const';

test.describe('Settings flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOME_PAGE);
    });

    test('change theme', async ({ settingsPage }) => {
        await settingsPage.openSettings('View');

        await settingsPage.changeTheme(Theme.LIGHT);
        await settingsPage.assertDataTheme(Theme.LIGHT);

        await settingsPage.changeTheme(Theme.DARK);
        await settingsPage.assertDataTheme(Theme.DARK);
    });

    test('change language', async ({ settingsPage }) => {
        await settingsPage.openSettings('Language');

        await settingsPage.changeLanguage('Ukrainian', Locales.UKRAINIAN);
        await settingsPage.changeLanguage('Англійська', Locales.ENGLISH);
    });
});
