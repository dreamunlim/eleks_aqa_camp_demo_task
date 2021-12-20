import loginPage from '../../pageObjects/loginPage.js';
import userLoggedInMenuBar from '../../pageObjects/userLoggedInMenuBar.js';

describe('User login', () => {
    it('positive login', async () => {
        await loginPage.openPage();
        await loginPage.login();

        let logoutButton = await userLoggedInMenuBar.getLogoutButton();

        await expect(logoutButton).toExist();
    });
});