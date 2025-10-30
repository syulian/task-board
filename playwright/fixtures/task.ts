import { test as base } from '@playwright/test';
import { TaskPage } from '../pages';

type TaskFixtures = {
    taskPage: TaskPage;
};

export const test = base.extend<TaskFixtures>({
    taskPage: async ({ page }, use) => {
        await use(new TaskPage(page));
    },
});
