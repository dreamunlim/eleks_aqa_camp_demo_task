import Button from "../elementObjects/button.js";

class BasePage {
    constructor() {
        this.url = null;

        this.welcomePopupSelector = 'button.close-dialog';
        this.cookiesPopupSelector = 'a[aria-label="dismiss cookie message"]';
    }

    async openPage(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.waitForPageAvailable();

        const welcomePopupElement = new Button($(this.welcomePopupSelector), "Welcome Popup close button");
        const cookiesPopupElement = new Button($(this.cookiesPopupSelector), "Cookies Popup close button");

        if(await welcomePopupElement.isExisting()) {
            await this.closeWelcomePopup(welcomePopupElement);
        }

        if(await cookiesPopupElement.isExisting()) {
            await this.closeCookiesPopup(cookiesPopupElement);
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

    async closeWelcomePopup(welcomePopupElement) {
        let overlayedSpanSelector = 'span.mat-button-focus-overlay';
        let overlayedSpan = await welcomePopupElement.itself().$(overlayedSpanSelector);
        await browser.execute((span) => {
            span.click();            
        }, overlayedSpan);
    }

    async closeCookiesPopup(cookiesPopupElement) {
        await cookiesPopupElement.click();
    }
}

export default BasePage;