import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async submit() {
        await this.page.click('button[type="submit"]');
    }

    async pressEsc() {
        await this.page.keyboard.press('Escape');
    }

    async pressEnter() {
        await this.page.keyboard.press('Enter');
    }

    async dragTo(item: string, to: string) {
        const draggable = this.page.getByText(item);
        const droppable = this.page.getByText(to);
        await draggable.dragTo(droppable);
    }

    async openContextMenu(text: string, element: string, option?: string) {
        await this.page.click(`${element}:has-text("${text}")`, { button: 'right' });
        if (option) await this.page.click(`button:has-text("${option}")`);
    }
}
