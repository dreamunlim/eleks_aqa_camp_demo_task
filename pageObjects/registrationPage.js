import Input from "../elementObjects/input.js";
import Button from "../elementObjects/button.js";
import Dropdown from "../elementObjects/dropdown.js";
import BasePage from "./basePage.js";
import randomstring from "randomstring";

class RegistrationPage extends BasePage {
    constructor() {
        super();

        this.url = '#/register';

        this.strLength = 5;
        this.email = randomstring.generate({ length: this.strLength, charset: 'alphabetic' }) + "@mail.com";
        this.password = randomstring.generate({ length: this.strLength, charset: 'alphabetic' });

        this.registrationFormSelector = 'div.registration-form';
        this.emailFieldSelector = 'input#emailControl';
        this.passwordFieldSelector = 'input#passwordControl';
        this.repeatPasswordFieldSelector = 'input#repeatPasswordControl';
        this.answerFieldSelector = 'input#securityAnswerControl';
        this.registerBtnSelector = 'button#registerButton';

        this.securityQuestionDropdownSelector = '//mat-select[@name="securityQuestion"]/parent::*/parent::*';
        this.dropdownAnswerSelector = '//mat-option/span[contains(text(),"Name of your favorite pet?")]';

        this.securityQuestionAnswer = "Potato";
    }

    getBaseElement() {
        return $(this.registrationFormSelector);
    }

    async openPage() {
        await super.openPage(this.url);
    }

    getEmailField() {
        return new Input($(this.emailFieldSelector), "Email field");
    }

    getPasswordField() {
        return new Input($(this.passwordFieldSelector), "Password field");
    }

    getRepeatPasswordField() {
        return new Input($(this.repeatPasswordFieldSelector), "Repeat Password field");
    }

    getAnswerField() {
        return new Input($(this.answerFieldSelector), "Answer field");
    }

    getRegisterButton() {
        return new Button($(this.registerBtnSelector), "Register button");
    }

    getDropdownField() {
        return new Dropdown($(this.securityQuestionDropdownSelector), "Dropdown field");
    }

    async openDropdown() {
        await this.getDropdownField().open();
    }

    async selectDropdownAnswer(dropdownAnswerSelector) {
        let dropdownAnswer = await $(dropdownAnswerSelector);
        await this.openDropdown();
        await this.getDropdownField().select(dropdownAnswer);
    }
}

export default new RegistrationPage();