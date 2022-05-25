/**
 * @module commands
 * @commands
 */
import * as vscode from "vscode";
// import { api } from "../api";
import { Api } from "../api";
const api = Api.Instance;

export function createPersonalProjectCommand() {
	let projectName = "";
	const inputProjectName = vscode.window.createInputBox();
	inputProjectName.placeholder = "Please Enter Project Name";
	inputProjectName.onDidChangeValue((input) => {
		projectName = input;
	});
	inputProjectName.onDidAccept(() => {
		inputProjectName.hide();
		api.createPersonalProject(projectName);
	});
	inputProjectName.show();
} // MVP

export function createGroupProjectCommand(groupID: number) {
	let projectName = "";
	const inputProjectName = vscode.window.createInputBox();
	inputProjectName.placeholder = "Please Enter Project Name";
	inputProjectName.onDidChangeValue((input) => {
		projectName = input;
	});
	inputProjectName.onDidAccept(() => {
		inputProjectName.hide();
		api.createGroupProject(projectName, groupID);
	});
	inputProjectName.show();
} // MVP


/**
 *
 */
export async function createGroupCommand() {
	let groupName = "";
	let groupPath = "";
	const inputSubGroupName = vscode.window.createInputBox();
	const inputSubGroupPath = vscode.window.createInputBox();

	inputSubGroupName.placeholder = "Please Enter Subgroup Name";
	inputSubGroupPath.placeholder = "Please Enter Subgroup Path";

	inputSubGroupPath.onDidChangeValue((input) => {
		groupPath = input;
	});
	inputSubGroupPath.onDidAccept(() => {
		inputSubGroupPath.hide();
		api.createGroup(groupName, groupPath);
	});

	inputSubGroupName.onDidChangeValue((input) => {
		groupName = input;
	});
	inputSubGroupName.onDidAccept(() => {
		inputSubGroupName.hide();
		inputSubGroupPath.show();
	});
	inputSubGroupName.show();

	// api.
	// api.getUserProjects(api.getUserIDAsync())
} // MVP
export function deleteProject(projectID: number) {
	api.deleteProject(projectID);
}
/**
 * @module commands
 * @function createIssueCommand
 * @name createIssueCommand
 * @typedef function
 * @memberof commands
 */
export function createIssueCommand() {
	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
} // MVP
export function createMergeRequestCommand() {
	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
} // MVP
// export function viewPipelinesCommand() {
// 	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
// } // MVP
export function viewIssue() {
	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
} // MVP

export function cloneProject() {
	// Project region
}
export function cloneNamespaceProjects() {
	// Namespace/group region
}
// #region project
export function createProjectSnippet(projectID: number, snippet: SnippetObject) {
	api.createProjectSnippet(
		projectID,
		// {title: "TODO", files: [{file_path: "TODO", content: "Todo"}]}
		snippet
	);

	// project region
	// user region
}
//#endregion
export function createPersonalSnippet() {
	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
}

export function modifySnippetComment() {
	// https://docs.gitlab.com/ee/api/notes.html#modify-existing-snippet-note
}
export function deleteSnippetComment() {
	// https://docs.gitlab.com/ee/api/notes.html#delete-a-snippet-note
}
export function openProjectSettingsInGitLab() {
	// https://docs.gitlab.com/ee/api/notes.html#delete-a-snippet-note
}

export function openPersonalSettingsInGitLab() {
	// https://docs.gitlab.com/ee/api/notes.html#delete-a-snippet-note
	/**
	 * @implement
	 *
	 */
}

export function addMemberToProject() {
	/**
	 * @implement
	 * https://docs.gitlab.com/ee/api/members.html#add-a-member-to-a-group-or-project
	 *
	 */
}

export function addMemberToGroup() {
	/**
	 * https://docs.gitlab.com/ee/api/members.html#add-a-member-to-a-group-or-project
	 * @implement
	 *
	 */
}
export function openGroupSettingsInGitLab() {
	// https://docs.gitlab.com/ee/api/notes.html#delete-a-snippet-note
}
/**
 * navigates to project in gitlab in default browser
 */
export function openProjectInGitLab() {}
/**
 * simply navigates to group in gitlab website in the default browser
 */
export function openGroupInGitLab() {}

export function addSSHKey() {
	// https://docs.gitlab.com/ee/api/users.html#add-ssh-key
}
export function deleteSSHKey() {
	// https://docs.gitlab.com/ee/api/users.html#delete-ssh-key-for-current-user
}

export function addGPGKey() {
	// https://docs.gitlab.com/ee/api/users.html#add-a-gpg-key
}
export function deleteGPGKey() {
	// https://docs.gitlab.com/ee/api/users.html#delete-a-gpg-key
}
export function addEmail() {
	// https://docs.gitlab.com/ee/api/users.html#add-email
}

export function createImpersonationToken() {
	// https://docs.gitlab.com/ee/api/users.html#create-an-impersonation-token
}
export function revokeImpersonationToken() {
	// https://docs.gitlab.com/ee/api/users.html#revoke-an-impersonation-token
}

export function createPersonalAccessToken() {
	// https://docs.gitlab.com/ee/api/users.html#create-a-personal-access-token
}
export function listSSHKeys() {
	// https://docs.gitlab.com/ee/api/users.html#list-ssh-keys-for-user
}
/**
 * opens namespaces, projects, issues, pipelines in gitlab
 */
// export function openInGitlab(){

// }

// https://docs.gitlab.com/ee/api/runners.html

export * from "./pipeline";
import pipelinesCommands from "./pipeline";
export * from "./issue";
import issueCommands from "./issue";

/**
 * @module commands
 * @exports commands
 */
export default {
	...pipelinesCommands,
	...issueCommands,
	createGroupProjectCommand,
	deleteProject,
	createPersonalProjectCommand,
	createGroupCommand,
	createIssueCommand,
	createMergeRequestCommand,
	// viewPipelinesCommand,
	viewIssue,
	createPersonalSnippet,
	cloneNamespaceProjects,
	createProjectSnippet,

	modifySnippetComment,
	deleteSnippetComment,
	addMemberToProject,
	addMemberToGroup,
};
