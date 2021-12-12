import Button from "../elementObjects/button.js";

class BasePage {
    constructor() {
        this.url = null;

        this.welcomePopupButtonSelector = 'button.close-dialog';
        this.cookiesPopupButtonSelector = 'a[aria-label="dismiss cookie message"]';
    }

    async openPage(url = this.url) {
        await allure.addStep(`Opening URL: ${browser.config.baseUrl + url}`);
        await browser.maximizeWindow();
        await browser.url(url);
        await this.waitForPageAvailable();

        const welcomePopupButton = new Button($(this.welcomePopupButtonSelector), "Welcome Popup close button");
        const cookiesPopupButton = new Button($(this.cookiesPopupButtonSelector), "Cookies Popup close button");

        if(await welcomePopupButton.isDisplayed()) {
            await this.closeWelcomePopup(welcomePopupButton);
        }

        if(await cookiesPopupButton.isDisplayed()) {
            await this.closeCookiesPopup(cookiesPopupButton);
        }
    }

    // assume from the element presence that the page has loaded
    async waitForPageAvailable() {
        const timeout = 5000;
        const timeoutMsg = `The page element has not loaded in ${timeout / 1000} sec`;
        const interval = 1000;

        await browser.waitUntil(
            async () => { return !!this.getBaseElement().length }, // cast length to boolean
            {
                timeout: timeout,
                timeoutMsg: timeoutMsg,
                interval: interval
            }
        );
    }

    async closeWelcomePopup(welcomePopupButton) {
        await allure.addStep(`Closing Welcome Popup`);
        let overlayedSpanSelector = 'span.mat-button-focus-overlay';
        let overlayedSpan = await welcomePopupButton.itself().$(overlayedSpanSelector);
        await browser.execute((span) => {
            span.click();            
        }, overlayedSpan);
    }

    async closeCookiesPopup(cookiesPopupButton) {
        await allure.addStep(`Closing Cookies Popup`);
        await cookiesPopupButton.click();
    }
}

export default BasePage;