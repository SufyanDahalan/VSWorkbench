import * as vscode from "vscode";
import  { Api }/* , * as API */ from "./api";

import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY, GlobalFunctions, GROUP_VIEW_FOCUS } from "./globals";
/**
 * alias commands
 */
// import {default as Commands} from "./commands";
import * as Commands from "./commands";
import {createIssueCommand} from "./commands";
// import {GroupView, GroupTreeDataProvider, GroupModel} from "./treeViews/groups"
import { GroupView, GroupNode, ProjectNode, Node } from "./views";
import { notDeepStrictEqual } from "assert";
// import api from "./api";

function initStorage(context: vscode.ExtensionContext) {
	context.globalState.setKeysForSync([AUTH_TOKEN_KEY]);
	context.globalState.setKeysForSync([GITLAB_INSTANCE_KEY]);
	// context.workspaceState.update(GROUP_VIEW_FOCUS, undefined);
}
export function activate(context: vscode.ExtensionContext) {
	Api.updateAuthToken(context.globalState.get(AUTH_TOKEN_KEY) as string);
    // const api = Api.Instance
    
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
		vscode.commands.registerCommand("GitLabCode.createIssue", createIssueCommand),
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
 * 
 * 1. @TODO refactor and clean {@link Views.groups}
 * 2. @TODO getting starred projects
 * 2. @TODO add `create Group` view/item/context action for group nodes with a + c
 * 3. @FEATURE view/titel level action for GroupView to create a group. It will ask for name, then get all custom options for groups throw QuickPicks or 
 * InputBoxes (e.g. add user to group or smth). It will then create it, refresh groupView, show some kind of a success message.
 * 4. @FEATURE view/titel level action for namespace nodes in GroupView to create a group. It will ask for name, then get
 * all custom options for groups throw QuickPicks or InputBoxes (e.g. add user to group or smth). It will then create it,
 * refresh groupView, show some kind of a success message.
 * 5. @FEATURE ask for confirmation before deleting anything, e.g. project or group
 * 6. @FEATURE archive w $(archive) icon in the view/item/context for projects
 * 7. @FEATURE clone a repo, or a whole group w an $(arrow-small-down) icon in the view/item/context
 * 8. @FEATURE showing branches as children of projects?
 * 8. @FEATURE add types.d.ts for each file, refactor all exports and imports to be jsdoc compatible, and document project completely and iteratively
 * ================================================================================================================================
 * ================================================================================================================================
 * @IMPLEMENT :-
 * 1. {@link Commands.createGroupCommand}
 * 2. {@link Commands.getUserGroupsCommand}
 * 3. {@link API.Api.getStarredProjects} and in treeViews
 * 4. {@link Commands.archiveProject} and in view/item/context
 * 5. {@link Commands.createIssueCommand}, and in view/item/context. First issue you should make should be about documenting this very project
 * 6. {@link ./treeViews/projects.ts } refactor. prob delete
 * 7. integrate @Telemetry {@link https://code.visualstudio.com/docs/getstarted/telemetry}
 * ================================================================================================================================
 * ================================================================================================================================
 * On JSDoc...
 * 
 * @see {@link https://stackoverflow.com/a/48455477/16419931}
 * @see {@link https://stackoverflow.com/questions/52511753/jsdoc-broken-on-exports-default-in-vscode}
 * @see {@link https://jsdoc.app}
 */
