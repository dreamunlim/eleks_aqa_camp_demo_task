import BaseElement from "./baseElement.js";

class Dropdown extends BaseElement {
    constructor(wdioElement, elementName) {
        super(wdioElement, elementName);
    }

    async open() {
        await super.click();
    }

    async select(dropdownAnswer) {
        let optionText = await dropdownAnswer.getText();
        console.log(`Selecting option "${optionText}" from "${this.elementName}"`);
        await dropdownAnswer.click();
    }
}

export default Dropdown;