import baseApi from './baseApi.js';

class ApiCustomerFeedback {
    constructor() {
        this.url = '/api/Feedbacks/';
        this.captchaUrl = '/rest/captcha/';
        this.successStatusCode = 201;
        this.captchaSuccessStatusCode = 200;
        this.response = null;
        this.captcha = null;
        this.regData = null;
        this.comment = "THIS SITE IS BROKEN!!!!";

        this.requestBody = {
            UserId: null,
            captchaId: null,
            captcha: "",
            comment: "",
            rating: 3
        }
    }

    async getRegData() {
        try {
            this.regData = global.regData;
        } catch (err) {
            throw "Registration data unavailable";
        }
    }

    async apiGetCaptcha() {
        await allure.addStep(`Retrieving captcha response`);
        this.captcha = await baseApi.GET(this.captchaUrl);
    }

    async setRequestBody() {
        this.requestBody.UserId = this.regData.userID;
        this.requestBody.captchaId = this.captcha.body.captchaId;
        this.requestBody.captcha = this.captcha.body.answer;
        this.requestBody.comment = `${this.comment} (${this.regData.email})`;
    }

    async leaveFeedback() {
        await this.getRegData();
        await this.apiGetCaptcha();
        await this.setRequestBody();
        await allure.addStep(`Leaving user '${global.regData.email}' feedback`);
        this.response = await baseApi.POST(this.url, this.requestBody);
    }
}

export default new ApiCustomerFeedback();