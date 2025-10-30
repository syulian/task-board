import { test } from '../fixtures';
import { BOARD_PAGE, TASK } from '../utils/const';

test.describe('Task flows', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BOARD_PAGE);
    });

    test('task lifecycle', async ({ taskPage }) => {
        await taskPage.addTask('Test list', TASK);
        await taskPage.editTask(TASK.title, {
            ...TASK,
            title: 'New task',
        });
        await taskPage.deleteTask('New task');
    });

    test('task search', async ({ taskPage }) => {
        await taskPage.searchTask('test');
    });
});
