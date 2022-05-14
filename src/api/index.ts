import axios, { Axios, AxiosResponse } from "axios";
// import * as vscode from "vscode";
// const userApi = require("./user.js");
// import userApi from './user'
// const groupApi = require("./group.js");
// const projectApi = require("./project.js");

// import  userApi from "./user.js";
// import  groupApi from "./group.js";
// import  projectApi from "./project.js";

// const api = axios.create({
// 	baseURL: "https://gitlab.com/api/v4/",
// 	timeout: 5000,
// });
// api.interceptors.request.use(function (config:any) {
//     console.log(config)
//     return config;
//     }, function (error:any) {
//     return Promise.reject(error);
//     });
// export const api = (PRIVATE_TOKEN : string) => {return new Api(PRIVATE_TOKEN)}

export class Api {
	api: Axios;
	private static instance: Api;
	timeout: number;
	static baseURL: string;
	static PRIVATE_TOKEN: string;
	private constructor(PRIVATE_TOKEN: string = "", baseURL: string = "https://gitlab.com/api/v4/", timeout: number = 50000) {
		(Api.PRIVATE_TOKEN = PRIVATE_TOKEN), (Api.baseURL = baseURL);
		this.timeout = timeout;
		this.api = axios.create({
			baseURL: Api.baseURL,
			timeout: this.timeout,
			// headers: {
                /**
                 *  @ToFix
                 *  */
			// 	'PRIVATE-TOKEN': Api.PRIVATE_TOKEN, 
			// },
		});
	}
	public static get Instance() {
		if (!this.instance) {
			this.instance = new Api();
		}
		return Api.instance;
	}
	// export const Api = {
	// api,
	public static updateBaseURL(newBaseURL: string) {
		Api.baseURL = newBaseURL;
		Api.instance.api.defaults.baseURL = newBaseURL;
		//   Api.instance.
	}
	public static updateAuthToken(newAuthToken: string) {
		Api.PRIVATE_TOKEN = newAuthToken;
		Api.instance.api.defaults.headers.common["PRIVATE-TOKEN"] = newAuthToken;
	}
	// #region projectApi
	getProjectIssueBoards(projectID: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${projectID}/boards`);
	}
	getProjectIssues(projectID: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${projectID}/issues`);
	}
	getGroupIssues(groupID: number): any {
		return Api.instance.api.get(`groups/${groupID}/issues`);
	}
    getProjectIssue(projectID: number, issueID: number){
        return Api.instance.api.get(`projects/${projectID}/issues/${issueID}`)
    }



    getProjectIssueComments(projectID: number, issueID: number){
        return Api.instance.api.get(`projects/${projectID}/issues/${issueID}/notes`)
    }
    createNewProjectIssueComment(projectID: number, issueIID: number, body: string){
        Api.instance.api.post(`projects/${projectID}/issues/${issueIID}/notes?body=${body}`)
    }
    editProjectIssueComment(projectID: number, issueID: number, note_id: number){
        return Api.instance.api.put(`projects/${projectID}/issues/${issueID}/notes/${note_id}`)
    }



	getProjectPipelines(projectID: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${projectID}/pipelines`);
	}
	getPipelineJobs(projectID: number, pipeline_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${projectID}/pipelines/${pipeline_id}/jobs`);
	}
	getPipeline(projectID: string, pipelineID: string): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${projectID}/pipelines/${pipelineID}`);
	}
	createNewProjectIssue(projectID: string): Promise<AxiosResponse> {
		return Api.instance.api.post(`projects/${projectID}/issues`);
	}
	reorderProjectIssue(projectID: string, issueIID: string): Promise<AxiosResponse> {
		// https://docs.gitlab.com/ee/#api/issues.html#reorder-an-issue
		return Api.instance.api.post(`projects/${projectID}/issues/${issueIID}/reorder`);
	}
	// #endregion
	getUserInfo(): Promise<AxiosResponse> {
		return Api.instance.api.get(`user/`);
	}
	getStarredProjects(userID: string): Promise<AxiosResponse> {
		return Api.instance.api.get(`users/${userID}/starred_projects`);
	}
	createPersonalProject(projectName: string): Promise<AxiosResponse> {
		// TODO: allow for the user to set more information, and based on that add that informtion to the request.
		// should be done in the tree view instead of a simple input
		return Api.instance.api.post(`projects?name=${projectName}`);
	}
	createSubGroup(parentID: number, name: string, path: string = name) {
		if (path) {
			return Api.instance.api.post(`groups?parent_id=${parentID}`, { name, path });
		} else {
			return Api.instance.api.post(`groups?parent_id=${parentID}`, { name, path: name });
		}
	}
	/**
	 *
	 * cannot be used on GitLab SaaS!
	 * @param name name of the group to be created
	 * @param path path of the group to be created
	 * @returns nothing
	 */
	createGroup(name: string, path: string = name) {
		if (Api.baseURL == "https://gitlab.com/api/v4/") {
			// vscode.window.showErrorMessage("Cannot create top level group for GitLab SaaS users!. see [GitLab API docs](https://docs.gitlab.com/ee/api/groups.html#new-group). Additionally view our [workaround](https://add.link.to.dragndrop.workaround).");
            return null;
		} 
        return Api.instance.api.post(`groups`, { name, path: path? path : name });
		
	}
	// deletePersonalProject(projectID: string): AxiosResponse {
	// 	return Api.instance.api.delete(`projects/${projectID}`);
	// }
	deleteProject(projectID: number): Promise<AxiosResponse> {
		return Api.instance.api.delete(`projects/${projectID}`);
	}
	deleteGroup(groupID: number) {
		return Api.instance.api.delete(`groups/${groupID}`);
	}
	/**
	 *
	 * @param group boolean, true means its a group namespace, false means its a user namespace
	 * @param namespace_id id of the namespace from which the projects are to be loaded
	 * @returns no return
	 */
	getProjects(group: boolean, namespace_id: number): Promise<AxiosResponse> {
		if (group) {
			return Api.instance.api.get(`groups/${namespace_id}/projects`);
		} else {
			return this.getUserID().then((res: AxiosResponse) => {
				return Api.instance.api.get(`users/${res.data.id}/projects`);
			});
		}
	}
	// getUserProjects(userID: string): AxiosResponse {
	// 	return Api.instance.api.get(`users/${userID}/projects`);
	// }
	// getGroupProjects(groupID: string): AxiosResponse {
	// 	return Api.instance.api.get(`groups/${groupID}/projects`);
	// }
	async getUserGroups(): Promise<AxiosResponse> {
		return await Api.instance.api.get(`groups?all_available&pagination=keyset&per_page=50&order_by=name&sort=asc`);
	}
	getUserNamespaces(): Promise<AxiosResponse> {
		return Api.instance.api.get(`namespaces`);
	}
	createGroupProject(projectName: string, groupID: number): Promise<AxiosResponse> {
		return Api.instance.api.post(`projects?name=${projectName}&namespace_id=${groupID}`);
		// well, its basically a createPersonalProject but with the namespace_id specified
	}
	async getUserIDAsync(): Promise<AxiosResponse> {
		let res = await Api.instance.api.get("user");
		return res.data.id;
	}
	getUserID(): Promise<AxiosResponse> {
		return Api.instance.api.get("user");
	}
	async getGroupById(id: string): Promise<AxiosResponse> {
		return await Api.instance.api.get(`groups/${id}`);
	}
	async getSubGroups(parentID: number): Promise<AxiosResponse> {
		return await Api.instance.api.get(`groups/${parentID}/subgroups`);
	}
	// };
	// export default Object.create(Api); //Object.create( deepmerge.all([Api, userApi, projectApi, groupApi]))

    // getBranches(){
    //     return Api.instance.api.get()
    // }

    getBranches(projectID: number){
        return Api.instance.api.get(`projects/${projectID}/repository/branches`)
    }

    getCommits(projectID: number){
        return Api.instance.api.get(`projects/${projectID}/repository/commits`)
    }
}
export default Api;
