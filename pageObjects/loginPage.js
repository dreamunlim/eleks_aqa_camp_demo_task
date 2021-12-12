import BasePage from "./basePage.js";
import Button from "../elementObjects/button.js";
import Input from "../elementObjects/input.js";

class LoginPage extends BasePage {
    constructor() {
        super();
        
        this.url = '/#/login';

        this.email = 'test@mail.com';
        this.password = 'testPassword';
        this.fakeMail = 'fake@mail.com';
        this.fakePassword = 'fakePassword';

        this.emailFieldSelector = 'div input[name="email"]';
        this.passwordFieldSelector = 'div input[name="password"]';
        this.submitBtnSelector = 'button#loginButton';
        this.errorMsgSelector = 'div.error';
        this.loginFormSelector = 'div.login-form';

        this.loginErrorText = 'Invalid email or password.';
    }

    getBaseElement() {
        return $(this.loginFormSelector);
    }

    async openPage() {
        await super.openPage();
        await this.loadDataFromLocalStorage();
    }

    async loadDataFromLocalStorage() {
        const cachedData = await browser.execute(async () => {
            const key = "regData";
            const data = await JSON.parse(localStorage.getItem(key));
            if (data) {
                localStorage.removeItem(key);
                return data;
            }
        });

        if (cachedData) {
            this.email = cachedData.email;
            this.password = cachedData.password;
        }
    }

    getEmailField() {
        return new Input($(this.emailFieldSelector), "Email field");
    }

    getPasswordField() {
        return new Input($(this.passwordFieldSelector), "Password field");
    }

    getSubmitButton() {
        return new Button($(this.submitBtnSelector), "Submit button");
    }

    async getErrorMsg() {
        await allure.addStep(`Retrieving Error message`);
        return $(this.errorMsgSelector);
    }

    async login(email = this.email, password = this.password) {
        await allure.addStep(`Logging in with: '${email}' / '${password}'`);
        await this.getEmailField().setValue(email);
        await this.getPasswordField().setValue(password);
        await this.getSubmitButton().click();
    }
}

export default new LoginPage();