const axios = require("axios").default;
// const userApi = require("./user.js");
// const groupApi = require("./group.js");
// const projectApi = require("./project.js");

// import  userApi from "./user.js";
// import  groupApi from "./group.js";
// import  projectApi from "./project.js";
const deepmerge = require('deepmerge')

const api = axios.create({
                    baseURL: 'https://gitlab.com/api/v4/',
                    timeout: 5000,
                });
// api.interceptors.request.use(function (config:any) {
//     console.log(config)
//     return config;
//     }, function (error:any) {
//     return Promise.reject(error);
//     });


const Api = {
    api,
    updateBaseURL(newBaseURL:string) {
        console.log("updateBaseURL")
		this.api.defaults.baseURL = newBaseURL;
	},
	updateAuthToken(newAuthToken:string) {
        console.log("updateAuthToken")
		this.api.defaults.headers.common["PRIVATE-TOKEN"] = newAuthToken;
	},
    getProjectIssueBoards(projectID:string):any{
        return this.api.get(`projects/${projectID}/boards`)
    },
    getProjectIssues(projectID:string):any{
        return this.api.get(`projects/${projectID}/issues`)
    },
    getProjectPipelines(projectID:string):any{
        return this.api.get(`projects/${projectID}/pipelines`)
    },
    getPipeline(projectID:string, pipelineID:string):any{
        return this.api.get(`projects/${projectID}/pipelines/${pipelineID}`)
    },
    createNewProjectIssue(projectID:string):any{
        return this.api.post(`projects/${projectID}/issues`)
    },
    reorderProjectIssue(projectID:string, issueIID:string):any{ // https://docs.gitlab.com/ee/#api/issues.html#reorder-an-issue
        return this.api.post(`projects/${projectID}/issues/${issueIID}/reorder`) 
    },
    getUserInfo() {
        return this.api.get(`user/`);
    },
	getStarredProjects(userID:string) {
		return this.api.get(`users/${userID}/starred_projects`); //
	},
	createPersonalProject(projectName:string) {
		// TODO: allow for the user to set more information, and based on that add that informtion to the request.
		console.log("createPersonalProject");
		// should be done in the tree view instead of a simple input
		return this.api.post(`projects?name=${projectName}`)
	},
	deletePersonalProject(projectID:string) {
		return this.api.delete(`projects/${projectID}`);
	},
	getUserProjects(userID:string) {
		return this.api.get(`users/${userID}/projects`);
	},
	async getUserGroups() {
        console.log("getUserGroups")
		return await this.api.get(`groups?all_available&pagination=keyset&per_page=50&order_by=name&sort=asc`);
	},
    getGroupIssues(){
        return this.api.get('issues')
    },
    createGroupProject(projectName:string, groupID:string){
        return this.api.post(`projects?name=${projectName}&namespace_id=${groupID}`)
        // well, its basically a createPersonalProject but with the namespace_id specified
    },

    async getGroupById(id:string){
        console.log("getGroupById")
        return await this.api.get(`groups/${id}`)
    },
    async getSubGroups(parentID:string){
        console.log("getSubGroups")
        return await this.api.get(`groups/${parentID}/subgroups`)
    },
}
/* module.exports = */export default Object.create(Api)//Object.create( deepmerge.all([Api, userApi, projectApi, groupApi]))