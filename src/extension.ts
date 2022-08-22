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
let Context: vscode.ExtensionContext;
export function activate(context: vscode.ExtensionContext) {
	Api.updateAuthToken(context.globalState.get(AUTH_TOKEN_KEY) as string);
	Api.updateBaseURL(context.globalState.get(GITLAB_INSTANCE_KEY) as string); // needed
	initStorage(context);
	GlobalFunctions.checkGitlabInstanceAndAuthToken(
		context.globalState.get(AUTH_TOKEN_KEY) as string,
		context.globalState.get(GITLAB_INSTANCE_KEY) as string,
		true
	);
    Context = new Proxy<typeof context>(context, {});

	let groupView = new GroupTreeDataProvider(context);
	let issuesWebView = new IssuesViewProvidor(context);
	let pipelineWebView = new PipelineViewProvidor(context);
	context.subscriptions.push(
		vscode.commands.registerCommand("VSWorkbench.addPersonalAccessToken", async () => {
			await GlobalFunctions.settings(context.globalState);
		}),
		vscode.commands.registerCommand("VSWorkbench.updatePersonalAccessToken", async () => {
			await GlobalFunctions.settings(context.globalState);
		}),
		vscode.commands.registerCommand("VSWorkbench.createIssue", createIssueCommand),
		vscode.commands.registerCommand("VSWorkbench.createPersonalProject", Commands.createPersonalProjectCommand),
		vscode.commands.registerCommand("VSWorkbench.createGroupProject", (node: GroupNode) => {
			node.createGroupProject();
		}),
		// vscode.commands.registerCommand("VSWorkbench.createGroup", Commands.createGroupCommand),
		vscode.commands.registerCommand("VSWorkbench.createSubGroup", (node: GroupNode) => {
			node.createSubGroup();
		}),
		vscode.commands.registerCommand("VSWorkbench.createMergeRequest", Commands.createMergeRequestCommand),
		vscode.commands.registerCommand("VSWorkbench.deleteNamespaceNode", (node: GroupNode) => {
			node.delete();
		}),
		vscode.commands.registerCommand("VSWorkbench.createPersonalSnippet", Commands.createPersonalSnippet),
		vscode.commands.registerCommand("VSWorkbench.wiki", (node: GroupNode) => {
			node.openWiki();
		}),
		vscode.commands.registerCommand("VSWorkbench.snippets", (node: GroupNode) => {
			node.openSnippets();
		}),

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
		vscode.commands.registerCommand("VSWorkbench.openPipelinesInGitLab", Commands.openPipelinesInGitLab),
		vscode.commands.registerCommand("VSWorkbench.viewPipelines", Commands.viewPipelines),
		vscode.commands.registerCommand("VSWorkbench.viewPipeline", Commands.viewPipeline),
		vscode.commands.registerCommand("VSWorkbench.viewJob", Commands.viewJob),

		vscode.commands.registerCommand("VSWorkbench.createNewProjectIssueCommand", Commands.createNewProjectIssueCommand),
		vscode.commands.registerCommand("VSWorkbench.clone", async (node: GroupNode) => {
			node.contextValue === "project" ? await node.cloneProject() : await node.cloneNameSpace();
		})
	);
}



export function registerPlugin(plugin: {TreeViews: vscode.TreeView<any>[], Commands: {description: string, callback: (...args: any[]) => any, thisArg?: any}[]}){
    for(const treeView of plugin.TreeViews)
    Context.subscriptions.push(treeView);
    for(const command of plugin.Commands)
    vscode.commands.registerCommand(command.description, command.callback);
}

export function deactivate() {}

/**
 * ================================================================================================================================
 * ================================================================================================================================
 * @IMPLEMENT :-
 * 1. integrate @Telemetry {@link https://code.visualstudio.com/docs/getstarted/telemetry}
 * ================================================================================================================================
 * ================================================================================================================================
 */
