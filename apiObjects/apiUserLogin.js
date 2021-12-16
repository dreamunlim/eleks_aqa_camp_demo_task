import baseApi from './baseApi.js';

class ApiUserLogin {
    constructor() {
        this.url = '/rest/user/login';
        this.successStatusCode = 200;
        this.response = null;

        this.requestBody = {
            email: null,
            password: null
        }
    }

    async login() {
        this.getRegData();

        await allure.addStep(`Logging in with: '${this.requestBody.email}' / '${this.requestBody.password}'`);
        this.response = await baseApi.POST(this.url, this.requestBody);

        await allure.addStep(`Saving authorization token`);
        baseApi.storeTokenFromApiResponse(this.response);
    }

    async getRegData() {
        try {
            this.requestBody.email = global.regData.email;
            this.requestBody.password = global.regData.password;
        } catch (err) {
            throw "Registration data unavailable";
        }
    }
}

export default new ApiUserLogin();