import path from 'path';
import { test as setup } from '../fixtures';
import { EMAIL, HOME_PAGE, PASSWORD } from '../utils/const';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page, userPage }) => {
    await page.goto(HOME_PAGE);
    await userPage.signIn(EMAIL, PASSWORD);
    await userPage.assertSignedIn();
    await page.context().storageState({ path: authFile });
});
