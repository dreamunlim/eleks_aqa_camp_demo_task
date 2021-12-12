import BasePage from "./basePage.js";

class AboutUsPage extends BasePage {
    constructor() {
        super();

        this.url = '/#/about';

        this.socialLinksDiv = 'div.social';
        this.socialLinksSelector = 'div.social button';

        this.socialPagesValidationSelectors = {
            "https://twitter.com/owasp_juiceshop":      '//div//span[contains(text(),"OWASP Juice Shop")]',
            "https://www.facebook.com/owasp.juiceshop": '//h1/a/span[contains(text(),"OWASP Juice Shop")]',
            "https://owasp.org/slack/invite":           '//a/img[@alt="OWASP logo"]',
            "https://www.reddit.com/r/owasp_juiceshop": '//div/h1[text()="owasp_juiceshop"]',
            "https://github.com/OWASP/owasp-swag/tree/master/projects/juice-shop": '//strong/a[@href="/OWASP/owasp-swag"]'
        }
    }

    getBaseElement() {
        return $(this.socialLinksDiv);
    }

    async getAllSocialLinks() {
        let links = await $$(this.socialLinksSelector);
        return links;
    }

    async openSocialLinks(links) {
        await allure.addStep(`Opening social media links`);
        await browser.execute((receivedlinks) => {
            for (let i = 0; i < receivedlinks.length; ++i) {
                receivedlinks[i].click();
            }
        }, links);
    }
}

export default new AboutUsPage();