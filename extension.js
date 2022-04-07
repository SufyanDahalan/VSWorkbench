import vscode from "vscode";
const api = require("./src/api");
const AUTH_TOKEN_KEY = require("./src/globals/constants").AUTH_TOKEN_KEY;
const GITLAB_INSTANCE_KEY = require("./src/globals/constants").GITLAB_INSTANCE_KEY;
const Commands = require("./src/commands")

// import {GroupTree} from "./src/views"

// const api = Object.create(Api);
const GlobalFunctions = require("./src/globals/functions")
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	api.updateAuthToken(context.globalState.get(AUTH_TOKEN_KEY));
	// api.updateI(context.globalState.get(GITLAB_INSTANCE_KEY));
    context.globalState.setKeysForSync([AUTH_TOKEN_KEY]);
    context.globalState.setKeysForSync([GITLAB_INSTANCE_KEY]);

	GlobalFunctions.checkGitlabInstanceAndAuthToken(context.globalState);

	let helloWorldCommand = vscode.commands.registerCommand("GitLabCode.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from GitLabCode!"); // Display a message box to the user
	});
	let addPersonalAccessTokenCommand = vscode.commands.registerCommand("GitLabCode.addPersonalAccessToken", () => {
		// MVP
		GlobalFunctions.settings(context.globalState);
	}); // MVP
	let updatePersonalAccessTokenCommand = vscode.commands.registerCommand("GitLabCode.updatePersonalAccessToken", () => {
		GlobalFunctions.settings(context.globalState);
	});



    // new GroupTree(context)


	// let getUserGroupsCommand = vscode.commands.registerCommand("GitLabCode.getUserGroups", async () => {
	// 	vscode.window.showInformationMessage("Hello World from GitLabCode!");
	// 	console.log(await api.getUserGroups());
	// }); // MVP



	context.subscriptions.push(
		addPersonalAccessTokenCommand,
		updatePersonalAccessTokenCommand,
		helloWorldCommand,
        vscode.commands.registerCommand("GitLabCode.createIssue",Commands.createIssueCommand ),
        vscode.commands.registerCommand("GitLabCode.createPersonalProject",Commands.createPersonalProjectCommand ),
        vscode.commands.registerCommand("GitLabCode.createGroupProject",Commands.createGroupProjectCommand ),
        vscode.commands.registerCommand("GitLabCode.createGroup",Commands.createGroupCommand ),
        vscode.commands.registerCommand("GitLabCode.createMergeRequest",Commands.createMergeRequestCommand ),
        vscode.commands.registerCommand("GitLabCode.viewPipelines",Commands.viewPipelinesCommand ),
        vscode.commands.registerCommand("GitLabCode.viewIssues",Commands.viewIssuesCommand ),
        vscode.commands.registerCommand("GitLabCode.viewGitTree",Commands.viewGitTreeCommand ),
        vscode.commands.registerCommand("GitLabCode.getUserGroups",Commands.getUserGroupsCommand )
        	);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
