const url = '/login';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.maximizeWindow();
        await browser.url(url);

        await $('#username').setValue('tomsmith');
        await $('#password').setValue('SuperSecretPassword!');
        await $('button[type="submit"]').click();

        await expect($('#flash')).toBeExisting();
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!');
    });
});

