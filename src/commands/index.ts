/**
 * @module commands
 * @commands
 */
import * as vscode from "vscode";
import { Api } from "../api";
const api = Api.Instance;

export async function cloneFromGitLab(url: string, path: string): Promise<any> {
    return await vscode.commands.executeCommand('git.clone', url, path) 
}

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
} 

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
} 


export async function createGroupCommand() {
	let groupName = "";
	let groupPath = "";
	const inputSubGroupName = vscode.window.createInputBox();
	const inputSubGroupPath = vscode.window.createInputBox();

	inputSubGroupName.placeholder = "Please Enter Group Name";
	inputSubGroupPath.placeholder = "Please Enter Group Path";

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

} 
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
} 
export function createMergeRequestCommand() {
	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
}
// export function viewPipelinesCommand() {
// 	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
// } 

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
export function getWikis(){
    throw new Error("Not yet implemented");
    // https://docs.gitlab.com/ee/api/wikis.html
    // https://docs.gitlab.com/ee/api/group_wikis.html
    
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

// export function addMemberToProject() {
// 	/**
// 	 * @implement
// 	 * https://docs.gitlab.com/ee/api/members.html#add-a-member-to-a-group-or-project
// 	 *
// 	 */
// }

// export function addMemberToGroup() {
// 	/**
// 	 * https://docs.gitlab.com/ee/api/members.html#add-a-member-to-a-group-or-project
// 	 * @implement
// 	 *
// 	 */
// }
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
export * from "./project";
import projectCommands from "./project";

/**
 * @module commands
 * @exports commands
 */
export default {
	...pipelinesCommands,
	...issueCommands,
	...projectCommands,
    cloneFromGitLab,
	createGroupProjectCommand,
	deleteProject,
	createPersonalProjectCommand,
	createGroupCommand,
	createIssueCommand,
	createMergeRequestCommand,
	createPersonalSnippet,
	createProjectSnippet,
    getWikis,
	modifySnippetComment,
	deleteSnippetComment,
};
