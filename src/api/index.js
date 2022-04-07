const axios = require("axios").default;
const userApi = require("./user.js");
const groupApi = require("./group.js");
const projectApi = require("./project.js");
const deepmerge = require('deepmerge')

const api = axios.create({
                    baseURL: 'https://gitlab.com/api/v4/',
                    timeout: 5000,
                });
api.interceptors.request.use(function (config) {
    return config;
    }, function (error) {
    return Promise.reject(error);
    });


const Api = {
    api,
    updateBaseURL(newBaseURL) {
        console.log("updateBaseURL")
		this.api.defaults.baseURL = newBaseURL;
	},
	updateAuthToken(newAuthToken) {
        console.log("updateAuthToken")
		this.api.defaults.headers.common["PRIVATE-TOKEN"] = newAuthToken;
	}

}
module.exports = Object.create( deepmerge.all([Api, userApi, projectApi, groupApi]))