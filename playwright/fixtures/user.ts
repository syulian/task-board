import { expect, test as base } from '@playwright/test';
import { print } from 'graphql/index';
import { DeleteUserDocument } from '@shared/types';
import { UserPage } from '../pages';

type UserFixtures = {
    userPage: UserPage;
    deleteUser: () => Promise<void>;
    login: (
        email: string,
        password: string,
    ) => Promise<
        {
            name: string;
            value: string;
        }[]
    >;
};

const GRAPHQL_URI = process.env.GRAPHQL_URI!;

export const test = base.extend<UserFixtures>({
    userPage: async ({ page }, use) => {
        await use(new UserPage(page));
    },

    deleteUser: async ({ page, request }, use) => {
        await use(async () => {
            const pageCookies = await page.context().cookies();
            const cookie = pageCookies.map(c => `${c.name}=${c.value}`).join('; ');

            const response = await request.post(GRAPHQL_URI, {
                data: { query: print(DeleteUserDocument) },
                headers: { cookie },
            });

            expect(response.ok()).toBeTruthy();
            expect(response.status()).toBe(200);

            return (await response.json()).data.deleteUser;
        });
    },
});
