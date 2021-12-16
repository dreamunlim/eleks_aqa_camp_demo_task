import apiUserLogin from "../../apiObjects/apiUserLogin.js";
import { expect } from "chai";

describe('API', () => {
    it('positive login', async () => {
        await apiUserLogin.login();
        expect(apiUserLogin.response.statusCode).to.equal(apiUserLogin.successStatusCode);
    });
});