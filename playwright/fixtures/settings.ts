import { test as base } from '@playwright/test';
import { SettingsPage } from '../pages/SettingsPage';

type SettingFixtures = {
    settingsPage: SettingsPage;
};

export const test = base.extend<SettingFixtures>({
    settingsPage: async ({ page }, use) => {
        await use(new SettingsPage(page));
    },
});
