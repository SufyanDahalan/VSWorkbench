import * as vscode from "vscode";
import api from "./api";

import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY, GlobalFunctions, GROUP_VIEW_FOCUS } from "./globals";

import Commands from "./commands";
import { createGroupProjectCommand } from "./commands";
// import {GroupView, GroupTreeDataProvider, GroupModel} from "./treeViews/groups"
import { GroupView, GroupNode, ProjectNode, Node } from "./treeViews";
import { notDeepStrictEqual } from "assert";

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
		vscode.commands.registerCommand("GitLabCode.createGroupProject", (node: GroupNode) => {
			node.createGroupProject();
		}),
		vscode.commands.registerCommand("GitLabCode.createGroup", Commands.createGroupCommand),
		vscode.commands.registerCommand("GitLabCode.createMergeRequest", Commands.createMergeRequestCommand),
		// vscode.commands.registerCommand("GitLabCode.viewPipelines", Commands.viewPipelinesCommand),
		vscode.commands.registerCommand("GitLabCode.viewIssue", Commands.viewIssue), // TODO: deGitLabCode.createGroupProjectlete
		vscode.commands.registerCommand("GitLabCode.viewGitTree", Commands.viewGitTreeCommand),
		vscode.commands.registerCommand("GitLabCode.getUserGroups", Commands.getUserGroupsCommand),
		vscode.commands.registerCommand("GitLabCode.deleteNamespaceNode", (node: GroupNode) => {
        node.delete();
		}),
        vscode.commands.registerCommand("GitLabCode.createPersonalSnippet", Commands.createPersonalSnippet),
        vscode.commands.registerCommand("GitLabCode.createProjectSnippet", Commands.createProjectSnippet),

        
        vscode.commands.registerCommand("GitLabCode.viewIssueList", Commands.viewIssueList),
        vscode.commands.registerCommand("GitLabCode.viewIssueBoard", Commands.viewIssueBoard),

        vscode.commands.registerCommand("GitLabCode.openInGitLab", (node: Node)=>{
            node.openInGitlab();
        }),

        vscode.commands.registerCommand("GitLabCode.openIssueBoardInGitLab", Commands.openIssueBoardInGitLab),
        vscode.commands.registerCommand("GitLabCode.openIssueListInGitLab", Commands.openIssueListInGitLab),
        vscode.commands.registerCommand("GitLabCode.openSettingsInGitLab", (node: GroupNode)=>{
            node.openSettingsInGitlab()
        }),
        
        vscode.commands.registerCommand("GitLabCode.addMemberToProject", Commands.addMemberToProject),
        vscode.commands.registerCommand("GitLabCode.addMemberToGroup", Commands.addMemberToGroup),
        vscode.commands.registerCommand("GitLabCode.openPipelinesInGitLab", Commands.openPipelinesInGitLab),
        vscode.commands.registerCommand("GitLabCode.viewPipelines", Commands.viewPipelines),
        vscode.commands.registerCommand("GitLabCode.viewPipeline", Commands.viewPipeline),
        vscode.commands.registerCommand("GitLabCode.viewJob", Commands.viewJob),
        
        
        





        

	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
/**
 * 1. @TOFIX heirarchy of groups subgroups, etc.
 * 2. @TODO getting starred projects
 * 3. @FEATURE view/titel level action for GroupView to create a group. It will ask for name, then get all custom options for groups throw QuickPicks or 
 * InputBoxes (e.g. add user to group or smth). It will then create it, refresh groupView, show some kind of a success message.
 * 4. @FEATURE view/titel level action for namespace nodes in GroupView to create a group. It will ask for name, then get
 * all custom options for groups throw QuickPicks or InputBoxes (e.g. add user to group or smth). It will then create it,
 * refresh groupView, show some kind of a success message.
 * 5. @FEATURE ask for confirmation before deleting anything, e.g. project or group
 * 6. @FEATURE archive w $(archive) icon in the view/item/context for projects
 * 7. @FEATURE clone a repo, or a whole group w an $(arrow-small-down) icon in the view/item/context
 * 8. @FEATURE refactor axios to request-light: https://www.npmjs.com/package/request-light
 */