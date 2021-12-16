import superAgent from "superagent";

class BaseApi {
    constructor() {
        this.baseUrl = browser.config.baseUrl;
    }

    aggregateUrl(url) {
        return this.baseUrl + url;
    }

    getToken() {
        try {
            return global.regData.token;
        } catch (err) {
            return null;
        }
    }

    // needs loaded page in browser to have access to localStorage
    async storeTokenFromLocalStorage() {
        const token = await browser.execute(() => {
            const key = "token";
            return localStorage.getItem(key);
        });

        global.regData.token = token;
    }

    storeTokenFromApiResponse(response) {
        global.regData.token = response.body.authentication.token;
    }

    async GET(url) {
        url = this.aggregateUrl(url);

        console.log("Sending GET request to: ", url);
        const response = await superAgent
            .get(url)
            .set("Autorization", `Bearer ${this.getToken()}`)
            .catch((error) => {
                console.error("GET Error: ", error);
            });

        console.log("Response Status Code: ", response.statusCode);
        return response;
    }

    async POST(url, requestBody) {
        url = this.aggregateUrl(url);

        console.log("Sending POST request to: ", url);
        const response = await superAgent
            .post(url)
            .send(requestBody)
            // 'null' token does not brake token-non-dependent requests
            .set("Autorization", `Bearer ${this.getToken()}`) // sets Header values
            .catch((error) => {
                console.error("POST Error: ", error);
            });

        console.log("Response Status Code: ", response.statusCode);
        return response;
    }

    async PUT(url) {
        url = this.aggregateUrl(url);
        console.log("Sending PUT request to: ", url);
    }

    async DELETE(url) {
        url = this.aggregateUrl(url);
        console.log("Sending DELETE request to: ", url);
    }
}

export default new BaseApi();