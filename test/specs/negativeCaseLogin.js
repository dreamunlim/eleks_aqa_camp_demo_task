import loginPage from '../../pageObjects/loginPage.js';

describe('LoginPage login', () => {
    it('negative login', async () => {
        await loginPage.openPage();
        await loginPage.login(loginPage.fakeMail, loginPage.fakePassword);

        let errorText = await loginPage.getErrorMsg();

        await expect(errorText).toHaveText(loginPage.loginErrorText);
    });
});