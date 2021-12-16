import apiUserRegistration from '../../apiObjects/apiUserRegistration.js';
import { expect } from "chai";

describe('API', () => {
    it('positive registration', async () => {
        await apiUserRegistration.register();
        expect(apiUserRegistration.response.statusCode).to.equal(apiUserRegistration.successStatusCode);
    });
});