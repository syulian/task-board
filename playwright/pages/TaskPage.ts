import { z } from 'zod';
import { TaskSchema } from '@entities/Task';
import { expect } from '../fixtures';
import { BasePage } from './BasePage';

type TaskValues = z.infer<typeof TaskSchema>;

export class TaskPage extends BasePage {
    async fillTask(task: TaskValues) {
        await this.page.getByPlaceholder('Enter task name...').fill(task.title);
        if (task.body) {
            await this.page.getByLabel('Change the contents of the text area').click();
            await this.page.getByPlaceholder('Add description...').fill(task.body);
        }
        await this.submit();
        await this.pressEsc();
    }

    async addTask(listName: string, task: TaskValues) {
        const listContainer = this.page.locator('[data-testid="list-container"]', {
            hasText: listName,
        });
        await listContainer.getByLabel('Add Task').first().click();
        await this.fillTask(task);
        await expect(this.page.getByText(task.title)).toBeVisible();
    }

    async editTask(taskName: string, task: TaskValues) {
        await this.page.getByText(taskName).click();
        await this.fillTask(task);
        await expect(this.page.getByText(task.title)).toBeVisible();
    }

    async deleteTask(name: string) {
        await this.openContextMenu(name, 'p', 'Delete');
        await expect(this.page.getByText(name)).not.toBeVisible();
    }

    async searchTask(filter: string) {
        const searchBar = this.page.getByLabel('Search for tasks');
        await searchBar.click();
        await searchBar.fill(filter);
        expect(
            await this.page.getByTestId('search-result').locator('li').count(),
        ).toBeGreaterThanOrEqual(2);
    }
}
