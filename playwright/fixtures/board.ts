import { test as base } from '@playwright/test';
import { BoardPage } from '../pages';

type BoardFixtures = {
    boardPage: BoardPage;
};

export const test = base.extend<BoardFixtures>({
    boardPage: async ({ page }, use) => {
        await use(new BoardPage(page));
    },
});
