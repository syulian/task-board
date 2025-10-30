import { expect } from '../fixtures';
import { BasePage } from './BasePage';

export class ListPage extends BasePage {
    async openSettings(text: string, option?: string) {
        const listContainer = this.page.locator('[data-testid="list-container"]', {
            hasText: text,
        });

        await listContainer.getByLabel('Open list settings').click();
        if (option) await this.page.click(`button:has-text("${option}")`);
    }

    async addList(name: string) {
        await this.page.getByLabel('Add list...').fill(name);
        await this.pressEnter();
        await expect(this.page.getByText(name)).toBeVisible();
    }

    async renameList(oldName: string, newName: string) {
        await this.openSettings(oldName, 'Rename');
        const group = this.page.getByLabel('Change List Name');
        await group.fill(newName);
        await group.blur();
        await expect(this.page.getByText(newName)).toBeVisible();
    }

    async deleteList(name: string) {
        await this.openSettings(name, 'Delete');
        await expect(this.page.getByText(name)).not.toBeVisible();
    }
}
