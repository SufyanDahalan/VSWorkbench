import * as vscode from "vscode";
import { Api } from "./api";

import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY, GlobalFunctions } from "./globals/";

import * as Commands from "./commands";
import { createIssueCommand } from "./commands";
import { GroupTreeDataProvider, GroupNode, Node } from "./views";
import { IssuesViewProvidor } from "./webviews/issues";
import { PipelineViewProvidor } from "./webviews/pipelines";
function initStorage(context: vscode.ExtensionContext) {
	context.globalState.setKeysForSync([AUTH_TOKEN_KEY]);
	context.globalState.setKeysForSync([GITLAB_INSTANCE_KEY]);
}
export function activate(context: vscode.ExtensionContext) {
	Api.updateAuthToken(context.globalState.get(AUTH_TOKEN_KEY) as string);

	initStorage(context);
	GlobalFunctions.checkGitlabInstanceAndAuthToken(context.globalState);

	let groupView = new GroupTreeDataProvider(context);
	let issuesWebView = new IssuesViewProvidor(context, context.globalState.get(AUTH_TOKEN_KEY) as string);
	let pipelineWebView = new PipelineViewProvidor(context, context.globalState.get(AUTH_TOKEN_KEY) as string);
  

	context.subscriptions.push(
		vscode.commands.registerCommand("VSWorkbench.addPersonalAccessToken", () => {
			GlobalFunctions.settings(context.globalState);
		}),
		vscode.commands.registerCommand("VSWorkbench.updatePersonalAccessToken", () => {
			GlobalFunctions.settings(context.globalState);
		}),
		vscode.commands.registerCommand("VSWorkbench.createIssue", createIssueCommand),
		vscode.commands.registerCommand("VSWorkbench.createPersonalProject", Commands.createPersonalProjectCommand),
		vscode.commands.registerCommand("VSWorkbench.createGroupProject", (node: GroupNode) => {
			node.createGroupProject();
		}),
		vscode.commands.registerCommand("VSWorkbench.createGroup", Commands.createGroupCommand),
		vscode.commands.registerCommand("VSWorkbench.createSubGroup", (node: GroupNode) => {
			node.createSubGroup();
		}),
		vscode.commands.registerCommand("VSWorkbench.createMergeRequest", Commands.createMergeRequestCommand),
		vscode.commands.registerCommand("VSWorkbench.viewIssue", Commands.viewIssue), // TODO: deVSWorkbench.createGroupProjectlete
		vscode.commands.registerCommand("VSWorkbench.deleteNamespaceNode", (node: GroupNode) => {
			node.delete();
		}),
		vscode.commands.registerCommand("VSWorkbench.createPersonalSnippet", Commands.createPersonalSnippet),
		vscode.commands.registerCommand("VSWorkbench.createProjectSnippet", Commands.createProjectSnippet),

		vscode.commands.registerCommand("VSWorkbench.viewIssueList", Commands.viewIssueList),
		vscode.commands.registerCommand("VSWorkbench.viewIssueBoard", Commands.viewIssueBoard),

		vscode.commands.registerCommand("VSWorkbench.openInGitLab", (node: Node) => {
			node.openInGitlab();
		}),

		vscode.commands.registerCommand("VSWorkbench.openIssueBoardInGitLab", Commands.openIssueBoardInGitLab),
		vscode.commands.registerCommand("VSWorkbench.openIssueListInGitLab", Commands.openIssueListInGitLab),
		vscode.commands.registerCommand("VSWorkbench.openSettingsInGitLab", (node: GroupNode) => {
			node.openSettingsInGitlab();
		}),
		vscode.commands.registerCommand("VSWorkbench.archiveProject", (node: GroupNode) => {
			node.archiveProject();
		}),
		vscode.commands.registerCommand("VSWorkbench.addMemberToProject", Commands.addMemberToProject),
		vscode.commands.registerCommand("VSWorkbench.addMemberToGroup", Commands.addMemberToGroup),
		vscode.commands.registerCommand("VSWorkbench.openPipelinesInGitLab", Commands.openPipelinesInGitLab),
		vscode.commands.registerCommand("VSWorkbench.viewPipelines", Commands.viewPipelines),
		vscode.commands.registerCommand("VSWorkbench.viewPipeline", Commands.viewPipeline),
		vscode.commands.registerCommand("VSWorkbench.viewJob", Commands.viewJob),

		vscode.commands.registerCommand("VSWorkbench.createNewProjectIssueCommand", Commands.createNewProjectIssueCommand),
        vscode.commands.registerCommand("VSWorkbench.clone", async (node: GroupNode) => {node.contextValue === 'project' ?  await node.cloneProject() : await node.cloneNameSpace()})

	);
}

export function deactivate() {}


/**
 *
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
 * ================================================================================================================================
 * ================================================================================================================================
 * @IMPLEMENT :-
 * 1. {@link Commands.createGroupCommand}: should be shown only when its not Gitlab SaaS
 * 3. {@link Api.getStarredProjects} and in treeViews
 * 4. {@link Commands.archiveProject} and in view/item/context
 * 4. {@link Commands.cloneProjectOrNamespace} and in view/item/context
 * 5. {@link Commands.createIssueCommand}, and in view/item/context. First issue you should make should be about documenting this very project
 * 4. {@link tests}
 * 7. integrate @Telemetry {@link https://code.visualstudio.com/docs/getstarted/telemetry}
 * ================================================================================================================================
 * ================================================================================================================================
 */
