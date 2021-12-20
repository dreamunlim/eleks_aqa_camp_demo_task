import apiUserRegistration from '../../apiObjects/apiUserRegistration.js';
import apiUserLogin from "../../apiObjects/apiUserLogin.js";
import apiCustomerFeedback from "../../apiObjects/apiCustomerFeedback.js";
import { expect } from "chai";

describe('API', () => {
    before(async () => {
        await apiUserRegistration.register();
        await apiUserLogin.login();
    });

    it('leave customer feedback', async () => {
        await apiCustomerFeedback.leaveFeedback();
        expect(apiCustomerFeedback.captcha.statusCode).to.equal(apiCustomerFeedback.captchaSuccessStatusCode);
        expect(apiCustomerFeedback.response.statusCode).to.equal(apiCustomerFeedback.successStatusCode);
    });
});