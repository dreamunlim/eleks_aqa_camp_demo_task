class BasePage {
    constructor() {
        this.url = null;

        this.welcomePopupSelector = 'button.close-dialog';
        this.cookiesPopupSelector = 'a[aria-label="dismiss cookie message"]';
    }

    async openPage(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.closeWelcomePopup();
        await this.closeCookiesPopup();
    }

    async closeWelcomePopup() {
        let element = await $(this.welcomePopupSelector);
        let overlayedSpan = await element.$('span.mat-button-focus-overlay');
        await browser.execute((span) => {
            span.click();            
        }, overlayedSpan);
    }

    async closeCookiesPopup() {
        let element = await $(this.cookiesPopupSelector);
        await element.click();
    }
}

export default BasePage;