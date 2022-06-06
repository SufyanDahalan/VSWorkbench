import axios, { Axios, AxiosResponse } from "axios";

const GitLab_SaaS_Base_URL = "https://gitlab.com/api/v4/";
export class Api {
	api: Axios;
	private static instance: Api;
	timeout: number;
	static baseURL: string;
	static PRIVATE_TOKEN: string;

	private constructor(PRIVATE_TOKEN: string = "", baseURL: string = GitLab_SaaS_Base_URL, timeout: number = 50000) {
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
	public static updateBaseURL(newBaseURL: string) {
		Api.baseURL = newBaseURL;
		Api.instance.api.defaults.baseURL = newBaseURL;
	}
	public static updateAuthToken(newAuthToken: string) {
		Api.PRIVATE_TOKEN = newAuthToken;
		Api.instance.api.defaults.headers.common["PRIVATE-TOKEN"] = newAuthToken;
	}
	//#region projects
    archiveProject(project_id: number): Promise<AxiosResponse>{
        return Api.Instance.api.post(`projects/${project_id}/archive`)
    }
    unArchiveProject(project_id: number): Promise<AxiosResponse>{
        return Api.Instance.api.post(`projects/${project_id}/unarchive`)
    }
	getProjectIssueBoards(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/boards`);
	}
	getProjectIssues(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/issues`);
	}
	getGroupIssues(group_id: number): any {
		return Api.instance.api.get(`groups/${group_id}/issues`);
	}
	getProjectIssue(project_id: number, issue_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/issues/${issue_id}`);
	}
	createProjectSnippet(project_id: number, snippet: SnippetObject): Promise<AxiosResponse> {
		return Api.instance.api.post(`projects/${project_id}/snippets`, { snippet });
	}
	getProjectIssueComments(project_id: number, issue_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/issues/${issue_id}/notes`);
	}
	createNewProjectIssueComment(project_id: number, issueIID: number, body: string): Promise<AxiosResponse> {
		return Api.instance.api.post(`projects/${project_id}/issues/${issueIID}/notes?body=${body}`);
	}
	editProjectIssueComment(project_id: number, issue_id: number, note_id: number): Promise<AxiosResponse> {
		return Api.instance.api.put(`projects/${project_id}/issues/${issue_id}/notes/${note_id}`);
	}
	getProjectPipelines(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/pipelines`);
	}
	getPipelineJobs(project_id: number, pipeline_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/pipelines/${pipeline_id}/jobs`);
	}
	getPipeline(project_id: string, pipelineID: string): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/pipelines/${pipelineID}`);
	}
	createNewProjectIssue(project_id: string): Promise<AxiosResponse> {
		return Api.instance.api.post(`projects/${project_id}/issues`);
	}
	reorderProjectIssue(project_id: string, issueIID: string): Promise<AxiosResponse> {
		// https://docs.gitlab.com/ee/#api/issues.html#reorder-an-issue
		return Api.instance.api.post(`projects/${project_id}/issues/${issueIID}/reorder`);
	}
	// #endregion
	// #region user
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
		// if (path) : Promise<AxiosResponse>{
		return Api.instance.api.post(`groups?parent_id=${parentID}`, { name, path });
		// } else {
		// 	return Api.instance.api.post(`groups?parent_id=${parentID}`, { name, path: name });
		// }
	}
	// #endregion

	/**
	 *
	 * cannot be used on GitLab SaaS!
	 * @param name name of the group to be created
	 * @param path path of the group to be created
	 * @returns nothing
	 */
	createGroup(name: string, path: string = name) {
		if (Api.baseURL == GitLab_SaaS_Base_URL) {
			// vscode.window.showErrorMessage("Cannot create top level group for GitLab SaaS users!. see [GitLab API docs](https://docs.gitlab.com/ee/api/groups.html#new-group). Additionally view our [workaround](https://add.link.to.dragndrop.workaround).");
			return null;
		}
		return Api.instance.api.post(`groups`, { name, path: path ? path : name });
	}

	transferProjectToGroup(group_id: number, project_id: number): Promise<AxiosResponse> {
		// return Api.instance.api.post(`groups/${group_id}/projects/${project_id}`); // only available for instance admins =(
		return Api.instance.api.put(`projects/${project_id}/transfer?namespace=${group_id}`);
	}
	transferGroup(id: number, group_id?: number): Promise<AxiosResponse> {
		return group_id ? Api.instance.api.post(`groups/${id}/transfer`, { group_id }) : Api.instance.api.post(`groups/${id}/transfer`) ;
	}
	deleteProject(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.delete(`projects/${project_id}`);
	}
	deleteGroup(group_id: number): Promise<AxiosResponse> {
		return Api.instance.api.delete(`groups/${group_id}`);
	}
	deleteIssueNote(project_id: number, issue_iid: number, note_id: number): Promise<AxiosResponse> {
		return Api.instance.api.delete(`projects/${project_id}/issues/${issue_iid}/notes/${note_id}`);
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
	// getGroupProjects(group_id: string): AxiosResponse {
	// 	return Api.instance.api.get(`groups/${group_id}/projects`);
	// }
	getUserGroups(): Promise<AxiosResponse> {
		return Api.instance.api.get(`groups?all_available&pagination=keyset&per_page=50&order_by=name&sort=asc`);
	}
	getUserNamespaces(): Promise<AxiosResponse> {
		return Api.instance.api.get(`namespaces`);
	}
	createGroupProject(projectName: string, group_id: number): Promise<AxiosResponse> {
		return Api.instance.api.post(`projects?name=${projectName}&namespace_id=${group_id}`);
		// well, its basically a createPersonalProject but with the namespace_id specified
	}
	async getUserIDAsync(): Promise<AxiosResponse> {
		let res = await Api.instance.api.get("user");
		return res.data.id;
	}
	getUserID(): Promise<AxiosResponse> {
		return Api.instance.api.get("user");
	}
	getGroupById(id: string): Promise<AxiosResponse> {
		return Api.instance.api.get(`groups/${id}`);
	}
	getSubGroups(parentID: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`groups/${parentID}/subgroups`);
	}

	getBranches(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/repository/branches`);
	}

	getCommits(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`projects/${project_id}/repository/commits`);
	}
}
export default Api;
export const api = Api.Instance