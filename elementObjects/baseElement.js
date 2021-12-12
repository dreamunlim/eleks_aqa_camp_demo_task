class BaseElement {
    constructor(wdioElement = null, elementName = null) {
        this.wdioElement = wdioElement;
        this.elementName = elementName;
    }

    itself() {
        return this.wdioElement;
    }

    async click() {
        console.log(`Clicked onto '${this.elementName}'`);
        await this.wdioElement.click();
    }

    async setValue(value) {
        console.log(`Entering '${value}' into '${this.elementName}'`);
        await this.wdioElement.setValue(value);
    }

    async isExisting() {
        return await this.wdioElement.isExisting();
    }

    async isDisplayed() {
        return await this.wdioElement.isDisplayed();
    }
}

export default BaseElement;