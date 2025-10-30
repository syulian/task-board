import { test } from '../fixtures';
import { BOARD_PAGE } from '../utils/const';

test.describe('List flows', () => {
    test('list lifecycle', async ({ page, listPage }) => {
        await page.goto(BOARD_PAGE);
        await listPage.addList('My test list');
        await listPage.renameList('My test list', 'New test list');
        await listPage.deleteList('New test list');
    });
});
