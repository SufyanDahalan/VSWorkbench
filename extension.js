const vscode = require("vscode");
const Api = require("./src/api");
const AUTH_TOKEN_KEY = require('./src/globals/constants').AUTH_TOKEN_KEY
const GITLAB_INSTANCE_KEY = require('./src/globals/constants').GITLAB_INSTANCE_KEY
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function settings(globalState) {
	// get persoanl auth token and gitlab instance
	let gitlabInstance = "",
		gitlabAuthToken = "";
	const inputPersonalAuthToken = vscode.window.createInputBox();
	inputPersonalAuthToken.placeholder = "Please Enter Your Personal Authentication Token";
	inputPersonalAuthToken.onDidChangeValue((tokenInput) => {
		gitlabAuthToken = tokenInput;
	});
	inputPersonalAuthToken.onDidAccept(() => {
		globalState.update(AUTH_TOKEN_KEY, gitlabAuthToken);
		inputPersonalAuthToken.hide();
		if (!checkGitlabInstanceAndAuthToken(globalState)) {
			// optionally show some error message
			inputGitlabInstance.show();
		}
	});

	const inputGitlabInstance = vscode.window.createInputBox();
	inputGitlabInstance.placeholder = "Please Enter Your Gitlab Instance";
	inputGitlabInstance.onDidChangeValue((tokenInput) => {
		gitlabInstance = tokenInput;
	});
	inputGitlabInstance.onDidAccept(() => {
		inputGitlabInstance.hide();
		globalState.update(GITLAB_INSTANCE_KEY, gitlabInstance);
		inputPersonalAuthToken.show();
	});
	inputGitlabInstance.show();
}

function checkGitlabInstanceAndAuthToken(globalState) {
	console.log(`auth token from chechAuthToken: ${globalState.get(AUTH_TOKEN_KEY)}`);
	// TODO: actually test to authenticate with the token against the gitlab instance specified
	// AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY
	if (!!globalState.get(AUTH_TOKEN_KEY)) {
		vscode.commands.executeCommand("setContext", "GitLabCode.authenticated", true);
		return true;
	} else {
		vscode.commands.executeCommand("setContext", "GitLabCode.authenticated", false);
		return false;
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const api = new Api(context.globalState.get(AUTH_TOKEN_KEY));
	context.globalState.setKeysForSync([AUTH_TOKEN_KEY]);

	// context.globalState.get(AUTH_TOKEN_KEY);
	// context.globalState.update(AUTH_TOKEN_KEY);
	checkGitlabInstanceAndAuthToken(context.globalState);

	let helloWorldCommand = vscode.commands.registerCommand("GitLabCode.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from GitLabCode!"); // Display a message box to the user
	});
	let addPersonalAccessTokenCommand = vscode.commands.registerCommand("GitLabCode.addPersonalAccessToken", () => {
		// MVP
		// if check fails and (gitlabinstance, authtoken) pair are not valid, should ask for them again
		// do {

		settings(context.globalState);
		// } while (!checkGitlabInstanceAndAuthToken(context.globalState));
	}); // MVP
	let updatePersonalAccessTokenCommand = vscode.commands.registerCommand("GitLabCode.updatePersonalAccessToken", () => {
		settings(context.globalState);
		// } while (!checkGitlabInstanceAndAuthToken(context.globalState));
	});
	let createPersonalProjectCommand = vscode.commands.registerCommand("GitLabCode.createPersonalProject", () => {
		//https://cloudaffaire.com/how-to-create-a-gitlab-project-using-api/
		// from https://stackoverflow.com/a/67874263 :
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
	}); // MVP
	
    let getUserGroupsCommand = vscode.commands.registerCommand("GitLabCode.getUserGroups", async () => {
        vscode.window.showInformationMessage("Hello World from GitLabCode!");
        console.log(await api.getUserGroups())
    }); // MVP
    
    
    let createGroupProjectCommand = vscode.commands.registerCommand("GitLabCode.createGroupProject", () => {
        let projectName = "";
		const inputProjectName = vscode.window.createInputBox();
		inputProjectName.placeholder = "Please Enter Project Name";
		inputProjectName.onDidChangeValue((input) => {
			projectName = input;
		});
		inputProjectName.onDidAccept(() => {
			inputProjectName.hide();
        api.createGroupProject(projectName);
		});
        inputProjectName.show();
	}); // MVP
	let createGroupCommand = vscode.commands.registerCommand("GitLabCode.createGroup", () => {
		// vscode.window.showInformationMessage("Hello World from GitLabCode!");

	}); // MVP
	let createIssueCommand = vscode.commands.registerCommand("GitLabCode.createIssue", () => {
		vscode.window.showInformationMessage("Hello World from GitLabCode!");
	}); // MVP
	let createMergeRequestCommand = vscode.commands.registerCommand("GitLabCode.createMergeRequest", () => {
		vscode.window.showInformationMessage("Hello World from GitLabCode!");
	}); // MVP
	let viewPipelinesCommand = vscode.commands.registerCommand("GitLabCode.viewPipelines", () => {
		vscode.window.showInformationMessage("Hello World from GitLabCode!");
	}); // MVP
	let viewIssuesCommand = vscode.commands.registerCommand("GitLabCode.viewIssues", () => {
		vscode.window.showInformationMessage("Hello World from GitLabCode!");
	}); // MVP

	let viewGitTreeCommand = vscode.commands.registerCommand("GitLabCode.viewGitTree", () => {
		// vscode.window.showInformationMessage("Hello World from GitLabCode!");
        this.api.getme
	}); // Feature

	context.subscriptions.push(
		addPersonalAccessTokenCommand,
		updatePersonalAccessTokenCommand,
		helloWorldCommand,
		createPersonalProjectCommand,
		createGroupProjectCommand,
        getUserGroupsCommand,
		createGroupCommand,
		createIssueCommand,
		createMergeRequestCommand,
		viewPipelinesCommand,
		viewIssuesCommand,
		viewGitTreeCommand
	);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
