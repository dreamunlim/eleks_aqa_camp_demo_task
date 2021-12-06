import BasePage from "./basePage.js";

class LoginPage extends BasePage {
    constructor() {
        super();
        
        this.url = '/#/login';

        this.email = 'test@mail.com';
        this.password = 'testPassword';
        this.fakeMail = 'fake@mail.com';
        this.fakePassword = 'fakePassword';

        this.userNameSelector = 'div input[name="email"]';
        this.passwordSelector = 'div input[name="password"]';
        this.submitBtnSelector = 'button#loginButton';
        this.errorMsgSelector = 'div.error';

        this.loginErrorText = 'Invalid email or password.';
    }

    async openPage() {
        await super.openPage(this.url);
    }

    getEmailField() {
        return $(this.userNameSelector);
    }

    getPasswordField() {
        return $(this.passwordSelector);
    }

    getSubmitButton() {
        return $(this.submitBtnSelector);
    }

    getErrorMsg() {
        return $(this.errorMsgSelector);
    }

    async login(email = this.email, password = this.password) {
        await this.getEmailField().setValue(email);
        await this.getPasswordField().setValue(password);
        await this.getSubmitButton().click();
    }
}

export default new LoginPage();