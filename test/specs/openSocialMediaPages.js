import aboutUsPage from '../../pageObjects/aboutUsPage.js';

describe('Open social media pages', () => {
    it('should open and validate all social media pages', async () => {
        await aboutUsPage.openPage();

        const links = await aboutUsPage.getAllSocialLinks();
        await aboutUsPage.openSocialLinks(links);

        const currentWindow = await browser.getWindowHandle();
        const openedWindows = await browser.getWindowHandles();

        for (let i = 0; i < openedWindows.length; ++i) {
            const targetWindow = openedWindows[i];

            if (targetWindow !== currentWindow) {
                await browser.switchToWindow(targetWindow);

                const targetWindowUrl = await browser.getUrl();
                // a filter to remove from URL the ending '/' symbol (that only Reddit page adds)
                const urlFilter = /(?:https?)(?::\/\/)(?:[\w-]+\.)+(?:[\w-.]+\/?)+[^/]/i;
                const filteredTargetWindowUrl = await targetWindowUrl.match(urlFilter)[0];
                const targetWindowSelector = await aboutUsPage.socialPagesValidationSelectors[filteredTargetWindowUrl];
                const targetWindowElement = await $(targetWindowSelector);

                // console.log("Filtered Url: ", filteredTargetWindowUrl);
                // console.log("Selector: ", targetWindowSelector);

                await expect(targetWindowElement).toExist();
            }
        }

        await browser.switchToWindow(currentWindow);
    });
});