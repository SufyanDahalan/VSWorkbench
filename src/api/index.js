const axios = require("axios").default;
const userApi = require("./user.js")
const BindToClass = require('../globals/functions').BindToClass


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
    createPersonalProject(projectName){
        // TODO: allow for the user to set more information, and based on that add that informtion to the request. 
        // should be done in the tree view instead of a simple input
        return this.api.post(`projects?name=${projectName}`)
    }
    deletePersonalProject(projectID){
        return this.api.delete(`projects/${projectID}`)
    }
    async getUserGroups(){
        return await this.api.get(`groups?all_available&pagination=keyset&per_page=50&order_by=name&sort=asc`)
    }
    createGroupProject(projectName, groupID){
        return this.api.post(`projects?name=${projectName}&namespace_id=${groupID}`)
        // well, its basically a createPersonalProject but with the namespace_id specified
    }
    getStarredProjects(userID){
        return this.api.get(`users/${userID}/starred_projects`)//
    }
    getUserInfo(){
        return this.api.get(`user/`)
    }

    getGroupIssues(){
        return this.api.get('issues')
    }
    getProjectIssues(){}
    getProjectPipelines(projectID){
        return this.api.get(`projects/${projectID}/pipelines`)
    }
    getPipeline(projectID, PipelineID){
        return this.api.get(`projects/${projectID}/pipelines/${PipelineID}`)
    }


    getUserProjects(userID){
        return this.api.get(`users/${userID}/projects`)
    }
}

module.exports =  Api;