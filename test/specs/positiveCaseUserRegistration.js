import registrationPage from '../../pageObjects/registrationPage.js';
import loginPage from '../../pageObjects/loginPage.js';
import userLoggedInMenuBar from '../../pageObjects/userLoggedInMenuBar.js';

describe('User registration', () => {
    it('positive case registration', async () => {
        await registrationPage.openPage();
        await registrationPage.getEmailField().setValue(registrationPage.email);
        await registrationPage.getPasswordField().setValue(registrationPage.password);
        await registrationPage.getRepeatPasswordField().setValue(registrationPage.password);
        await registrationPage.selectDropdownAnswer(registrationPage.dropdownAnswerSelector);
        await registrationPage.getAnswerField().setValue(registrationPage.securityQuestionAnswer);
        await registrationPage.getRegisterButton().click();

        await loginPage.waitForPageAvailable();
        await loginPage.login(registrationPage.email, registrationPage.password);
        
        const logoutButton = await userLoggedInMenuBar.getLogoutButton();
        await expect(logoutButton).toExist();
    });
});