import registrationPage from '../../pageObjects/registrationPage.js';

describe('User registration', () => {
    it('positive case registration', async () => {
        await registrationPage.openPage();
        await registrationPage.register();
        
        await expect(browser).toHaveUrl(registrationPage.postRegistrationUrl);
    });
});