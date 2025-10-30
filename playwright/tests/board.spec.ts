import { test, expect } from '../fixtures';
import { HOME_PAGE } from '../utils/const';

test.describe('Boards and groups flows', () => {
    test('full board and group lifecycle', async ({ page, boardPage }) => {
        await page.goto(HOME_PAGE);

        await boardPage.addGroup('My test group');
        await boardPage.renameGroup('My test group', 'New test group');

        await boardPage.addBoard('New test group', 'My test board');
        await boardPage.renameBoard('My test board', 'New test board');

        await boardPage.addGroup('My test group 2');
        await boardPage.addBoard('My test group 2', 'My test board 2');

        await boardPage.dragTo('New test board', 'My test board 2');

        await boardPage.deleteItem('New test board', 'a');
        await expect(page.getByText(/new test board/i)).not.toBeVisible();

        await boardPage.deleteItem('New test group', 'button');
        await expect(page.getByText(/new test group/i)).not.toBeVisible();
        await boardPage.deleteItem('My test group 2', 'button');
        await expect(page.getByText(/my test group 2/i)).not.toBeVisible();
    });
});
