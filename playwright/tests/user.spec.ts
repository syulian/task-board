import { test } from '../fixtures';
import { HOME_PAGE } from '../utils/const';

test.describe('Authenticated flow', () => {
    const email = 'authtest@gmail.com';
    const name = 'Auth Test';
    const password = '88888888';

    test('user operations such as sign up using email, name and password, sign out and sign', async ({
        page,
        userPage,
        deleteUser,
    }) => {
        await page.goto(HOME_PAGE);

        await userPage.signOut();
        await userPage.assertSignedOut();

        await userPage.signUp(email, name, password);
        await userPage.assertSignedIn();

        await userPage.signOut();
        await userPage.assertSignedOut();

        await userPage.signIn(email, password);
        await userPage.assertSignedIn();
        await deleteUser();
    });
});
