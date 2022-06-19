import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import project from "commands/project";
import { GitLab_SaaS_Base_URL } from "../globals/constants";

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
			headers: {
				"Content-Type": "application/json",
			},
		});
		// this.api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
		//     console.log('Api Request Config: ', config)
		//     return config
		// })
		// this.api.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
		//     console.log('Api Response: ', response)
		//     return response
		// })
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
		Api.instance.api.defaults.headers.common["Authorization"] = `Bearer ${newAuthToken}`;
	}
	graphql(query: string): Promise<AxiosResponse> {
		return Api.Instance.api.post("graphql", query);
	}

	//#region projects
	archiveProject(project_id: number): Promise<AxiosResponse> {
		return Api.Instance.api.post(`v4/projects/${project_id}/archive`);
	}
	unArchiveProject(project_id: number): Promise<AxiosResponse> {
		return Api.Instance.api.post(`v4/projects/${project_id}/unarchive`);
	}
	getProjectIssueBoards(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/boards`);
	}
	getProjectIssues(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/issues`);
	}
	getGroupIssues(group_id: number): any {
		return Api.instance.api.get(`v4/groups/${group_id}/issues`);
	}
	getProjectIssue(project_id: number, issue_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/issues/${issue_id}`);
	}
	createProjectSnippet(project_id: number, snippet: SnippetObject): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/projects/${project_id}/snippets`, { snippet });
	}
	getSnippet(project_id: number | undefined, snippet_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get("v4/" + (project_id ? `projects/${project_id}` : "") + `/snippets/${snippet_id}`);
	}
    getSnippetContent(project_id: number | undefined, snippet_id: number): Promise<AxiosResponse>{
        return Api.instance.api.get('v4/' + (project_id ? `projects/${project_id}/` : '') + `snippets/${snippet_id}/raw`)
    }
	/**
	 * Get Snippets of a project or the user
	 * @param project_id Id of project. If not specified, user snippets will be fetched
	 * @returns Snippets of a project or of the user
	 */
	getSnippets(project_id?: number): Promise<AxiosResponse> {
		return Api.instance.api.get("v4/" + (project_id ? `projects/${project_id}/snippets` : "snippets"));
	}
	getProjectIssueComments(project_id: number, issue_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/issues/${issue_id}/notes`);
	}
	createNewProjectIssueComment(project_id: number, issueIID: number, body: string): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/projects/${project_id}/issues/${issueIID}/notes?body=${body}`);
	}
	editProjectIssueComment(project_id: number, issue_id: number, note_id: number): Promise<AxiosResponse> {
		return Api.instance.api.put(`v4/projects/${project_id}/issues/${issue_id}/notes/${note_id}`);
	}
	getProjectPipelines(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/pipelines`);
	}
	getPipelineJobs(project_id: number, pipeline_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/pipelines/${pipeline_id}/jobs`);
	}
	getPipeline(project_id: string, pipeline_id: string): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/pipelines/${pipeline_id}`);
	}
	getJob(project_id: number, job_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/jobs/${job_id}`);
	}
	getJobLogs(project_id: number, job_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/jobs/${job_id}/trace`);
	}

	deleteJobArtifacts(project_id: number, job_id: number): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/projects/${project_id}/jobs/${job_id}/erase`);
	}
	retryJob(project_id: number, job_id: number): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/projects/${project_id}/jobs/${job_id}/retry`);
	}

	createNewProjectIssue(project_id: string): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/projects/${project_id}/issues`);
	}
	reorderProjectIssue(project_id: string, issue_iid: string): Promise<AxiosResponse> {
		// https://docs.gitlab.com/ee/#api/issues.html#reorder-an-issue
		return Api.instance.api.post(`v4/projects/${project_id}/issues/${issue_iid}/reorder`);
	}
	// #endregion
	// #region user
	getUserInfo(): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/user/`);
	}
	getStarredProjects(userID: string): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/users/${userID}/starred_projects`);
	}
	createPersonalProject(projectName: string): Promise<AxiosResponse> {
		// TODO: allow for the user to set more information, and based on that add that informtion to the request.
		// should be done in the tree view instead of a simple input
		return Api.instance.api.post(`v4/projects?name=${projectName}`);
	}
	createSubGroup(parentID: number, name: string, path: string = name) {
		// if (path) : Promise<AxiosResponse>{
		return Api.instance.api.post(`v4/groups?parent_id=${parentID}`, { name, path });
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
		return Api.instance.api.post(`v4/groups`, { name, path: path ? path : name });
	}

	transferProjectToGroup(group_id: number, project_id: number): Promise<AxiosResponse> {
		// return Api.instance.api.post(`groups/${group_id}/projects/${project_id}`); // only available for instance admins =(
		return Api.instance.api.put(`v4/projects/${project_id}/transfer?namespace=${group_id}`);
	}
	transferGroup(id: number, group_id?: number): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/groups/${id}/transfer`, group_id ? { group_id } : null);
	}
	deleteProject(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.delete(`v4/projects/${project_id}`);
	}
	deleteGroup(group_id: number): Promise<AxiosResponse> {
		return Api.instance.api.delete(`v4/groups/${group_id}`);
	}
	deleteIssueNote(project_id: number, issue_iid: number, note_id: number): Promise<AxiosResponse> {
		return Api.instance.api.delete(`v4/projects/${project_id}/issues/${issue_iid}/notes/${note_id}`);
	}
	/**
	 *
	 * @param group boolean, true means its a group namespace, false means its a user namespace
	 * @param namespace_id id of the namespace from which the projects are to be loaded
	 * @returns no return
	 */
	getProjects(group: boolean, namespace_id: number): Promise<AxiosResponse> {
		if (group) {
			return Api.instance.api.get(`v4/groups/${namespace_id}/projects`);
		} else {
			return this.getUserID().then((res: AxiosResponse) => {
				return Api.instance.api.get(`v4/users/${res.data.id}/projects`);
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
		return Api.instance.api.get(`v4/groups?all_available&pagination=keyset&per_page=50&order_by=name&sort=asc`);
	}
	getUserNamespaces(): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/namespaces`);
	}
	createGroupProject(projectName: string, group_id: number): Promise<AxiosResponse> {
		return Api.instance.api.post(`v4/projects?name=${projectName}&namespace_id=${group_id}`);
		// well, its basically a createPersonalProject but with the namespace_id specified
	}
	async getUserIDAsync(): Promise<AxiosResponse> {
		let res = await Api.instance.api.get("v4/user");
		return res.data.id;
	}
	getUserID(): Promise<AxiosResponse> {
		return Api.instance.api.get("v4/user");
	}
	getGroupById(id: string): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/groups/${id}`);
	}
	getSubGroups(parentID: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/groups/${parentID}/subgroups`);
	}

	getBranches(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/repository/branches`);
	}

	getCommits(project_id: number): Promise<AxiosResponse> {
		return Api.instance.api.get(`v4/projects/${project_id}/repository/commits`);
	}
}
export default Api;
export const api = Api.Instance;
