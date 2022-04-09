import * as vscode from "vscode";
import api from "./api";

import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY, GlobalFunctions, GROUP_VIEW_FOCUS } from "./globals";

import Commands from "./commands";
import { createGroupProjectCommand } from "./commands";
// import {GroupView, GroupTreeDataProvider, GroupModel} from "./treeViews/groups"
import { GroupView /* , ProjectView */ } from "./treeViews";

function initStorage(context: vscode.ExtensionContext) {
	context.globalState.setKeysForSync([AUTH_TOKEN_KEY]);
	context.globalState.setKeysForSync([GITLAB_INSTANCE_KEY]);
	context.workspaceState.update(GROUP_VIEW_FOCUS, undefined);
}

export function activate(context: vscode.ExtensionContext) {
	api.updateAuthToken(context.globalState.get(AUTH_TOKEN_KEY));
	// api.updateI(context.globalState.get(GITLAB_INSTANCE_KEY));
	initStorage(context);
	GlobalFunctions.checkGitlabInstanceAndAuthToken(context.globalState);

	let helloWorldCommand = vscode.commands.registerCommand("GitLabCode.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from GitLabCode!", "good"); // Display a message box to the user
	});
	let addPersonalAccessTokenCommand = vscode.commands.registerCommand("GitLabCode.addPersonalAccessToken", () => {
		// MVP
		GlobalFunctions.settings(context.globalState);
	}); // MVP
	let updatePersonalAccessTokenCommand = vscode.commands.registerCommand("GitLabCode.updatePersonalAccessToken", () => {
		GlobalFunctions.settings(context.globalState);
	});

	let groupView = new GroupView(context);
	// new ProjectView(context)

	// const groupModel = new GroupModel();
	// vscode.window.registerTreeDataProvider("groupView", new GroupTreeDataProvider(groupModel) );

	context.subscriptions.push(
		addPersonalAccessTokenCommand,
		updatePersonalAccessTokenCommand,
		helloWorldCommand,
	// vscode.commands.registerCommand('GitLabCode.GroupView.refreshEntry', () => groupView.treeDataProvider.refresh()),
		vscode.commands.registerCommand("GitLabCode.createIssue", Commands.createIssueCommand),
		vscode.commands.registerCommand("GitLabCode.createPersonalProject", Commands.createPersonalProjectCommand),
		vscode.commands.registerCommand("GitLabCode.createGroupProject", () => {
			createGroupProjectCommand(context.workspaceState.get(GROUP_VIEW_FOCUS) as string);
		}),
		vscode.commands.registerCommand("GitLabCode.createGroup", Commands.createGroupCommand),
		vscode.commands.registerCommand("GitLabCode.createMergeRequest", Commands.createMergeRequestCommand),
		vscode.commands.registerCommand("GitLabCode.viewPipelines", Commands.viewPipelinesCommand),
		vscode.commands.registerCommand("GitLabCode.viewIssues", Commands.viewIssuesCommand),
		vscode.commands.registerCommand("GitLabCode.viewGitTree", Commands.viewGitTreeCommand),
		vscode.commands.registerCommand("GitLabCode.getUserGroups", Commands.getUserGroupsCommand),
		vscode.commands.registerCommand("GitLabCode.deleteProject", () => {
			Commands.deleteProject(context.workspaceState.get(GROUP_VIEW_FOCUS) as string);
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
/**
 * @feature view/titel level action for GroupView to create a group. It will ask for name, then get all custom options for groups throw QuickPicks or 
 * InputBoxes (e.g. add user to group or smth). It will then create it, refresh groupView, show some kind of a success message.
 * 
 * @feature view/titel level action for namespace nodes in GroupView to create a group. It will ask for name, then get
 * all custom options for groups throw QuickPicks or InputBoxes (e.g. add user to group or smth). It will then create it,
 * refresh groupView, show some kind of a success message.
 * 
 * @todo ask for confirmation before deleting anything, e.g. deleteGroupProject or deleteUserProject
 * 
 * @todo add submenu action to go to project/namespace in default browser
 */