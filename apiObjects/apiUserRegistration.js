import baseApi from './baseApi.js';
import registrationPage from '../pageObjects/registrationPage.js';

class ApiUserRegistration {
    constructor() {
        this.url = '/api/Users/';
        this.date = new Date().toISOString();
        this.successStatusCode = 201;
        this.response = null;

        this.requestBody = {
            email: registrationPage.email,
            password: registrationPage.password,
            passwordRepeat: this.password,
            securityQuestion: {
                id: 7,
                question: "Name of your favorite pet?",
                createdAt: this.date,
                updatedAt: this.date
            },
            securityAnswer: registrationPage.securityQuestionAnswer
        }
    }

    async register() {
        await allure.addStep(`Registering with: '${this.requestBody.email}' / '${this.requestBody.password}'`);
        this.response = await baseApi.POST(this.url, this.requestBody);

        this.storeRegData();
    }

    async storeRegData() {
        const regData = {
            email: this.requestBody.email,
            password: this.requestBody.password,
            userID: this.response.body.data.id,
            token: null
        }
        global.regData = regData;
    }
}

export default new ApiUserRegistration();