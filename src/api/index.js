const axios = require("axios").default;
let userApi = require("./user.js");
const groupApi = require("./group.js");
const projectApi = require("./project.js");
const deepmerge = require('deepmerge')



const api = axios.create({
                    baseURL: 'https://gitlab.com',
                    timeout: 5000,
                });
const Api = {
    api,
    updateBaseURL(newBaseURL) {
		this.api.defaults.baseURL = newBaseURL;
	},
	updateAuthToken(newAuthToken) {
		this.api.defaults.headers.common["PRIVATE-TOKEN"] = newAuthToken;
	}

}
module.exports = deepmerge.all([Api, userApi, projectApi, groupApi]);
