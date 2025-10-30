import { test as base } from '@playwright/test';
import { ListPage } from '../pages';

type ListFixtures = {
    listPage: ListPage;
};

export const test = base.extend<ListFixtures>({
    listPage: async ({ page }, use) => {
        await use(new ListPage(page));
    },
});
