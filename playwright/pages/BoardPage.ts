import { expect } from '../fixtures';
import { BasePage } from './BasePage';

export class BoardPage extends BasePage {
    async addGroup(name: string) {
        await this.page.getByRole('button', { name: 'Add Group' }).click();
        await this.page.getByPlaceholder('Enter name...').fill(name);
        await this.submit();

        await this.pressEsc();
        await expect(this.page.getByText(name)).toBeVisible();
    }

    async addBoard(group: string, name: string) {
        const groupContainer = this.page.locator('[data-testid="group-container"]', {
            hasText: group,
        });

        await groupContainer.getByRole('button', { name: 'Add Board' }).click();
        await this.page.getByPlaceholder('Enter name...').fill(name);
        await this.submit();

        await this.pressEsc();
        await expect(this.page.getByText(name)).toBeVisible();
    }

    async renameGroup(oldName: string, newName: string) {
        await this.openContextMenu(oldName, 'button', 'Rename');
        const group = this.page.getByLabel('Group Name');
        await group.fill(newName);
        await group.blur();

        await expect(this.page.getByText(newName)).toBeVisible();
    }

    async renameBoard(oldName: string, newName: string) {
        await this.openContextMenu(oldName, 'a', 'Rename');
        const board = this.page.getByLabel('Change the name of the board');
        await board.fill(newName);
        await board.blur();

        await expect(this.page.getByText(newName)).toBeVisible();
    }

    async deleteItem(name: string, element: string) {
        await this.openContextMenu(name, element, 'Delete');
    }
}
