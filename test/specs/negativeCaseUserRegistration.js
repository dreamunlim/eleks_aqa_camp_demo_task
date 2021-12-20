import registrationPage from '../../pageObjects/registrationPage.js';

describe('User registration', () => {
    it('negative case registration', async () => {
        await registrationPage.openPage();
        await registrationPage.negativeRegister();

        await expect(await registrationPage.getErrorMsgField("email"))
            .toHaveText(registrationPage.errorMessages.emailField);
        await expect(await registrationPage.getErrorMsgField("password"))
            .toHaveText(registrationPage.errorMessages.passwordField);
        await expect(await registrationPage.getErrorMsgField("repeatPassword"))
            .toHaveText(registrationPage.errorMessages.repeatPasswordField);
        await expect(await registrationPage.getErrorMsgField("answer"))
            .toHaveText(registrationPage.errorMessages.answerField);
        await expect(browser)
            .toHaveUrlContaining(registrationPage.url); // no redirect expected
    });
});