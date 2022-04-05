const axios = require("axios").default;
const userApi = require("./user.js")
const BindToClass = require('@/globals/functions').BindToClass


class Api {
    #api;
    constructor(authToken, baseUrl = "https://gitlab.com/api/v4/"){
        BindToClass(userApi, this)
        this.api = axios.create({
            baseURL: baseUrl,
            timeout: 5000,
            headers: { "PRIVATE-TOKEN": authToken },
        })
        
    }
    updateBaseURL(newBaseURL){
        this.api.defaults.baseURL = newBaseURL; 
    }
    updateAuthToken(newAuthToken){
        this.api.defaults.headers.common["PRIVATE-TOKEN"] = newAuthToken; 
    }








}

module.exports =  Api;