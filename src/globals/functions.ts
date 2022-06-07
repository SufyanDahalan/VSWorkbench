// https://devblogs.microsoft.com/typescript/announcing-typescript-2-2/
// https://stackoverflow.com/a/45493827/16419931
import * as vscode from 'vscode';
import { FOCUED_TREEVIEW_ITEM, VALIDATION_RULES } from './constants';
import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY } from "./constants";

export function settings(globalState:vscode.ExtensionContext["globalState"]) {
	// get personal auth token and gitlab instance
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

export function checkGitlabInstanceAndAuthToken(globalState:vscode.ExtensionContext["globalState"]) {
	// console.log(`auth token from chechAuthToken: |${globalState.get(AUTH_TOKEN_KEY)}|`);
	// TODO: actually test to authenticate with the token against the gitlab instance specified
	// AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY
	if (!!globalState.get(AUTH_TOKEN_KEY)) {
		vscode.commands.executeCommand("setContext", "VSWorkbench.authenticated", true);
		return true;
	} else {
		vscode.commands.executeCommand("setContext", "VSWorkbench.authenticated", false);
		return false;
	}   
}/**
 * 
 * @param value string value to be validated
 * @param rule Rule to be used
 * @returns true if value is valid according to the rule specified, false otherwise
 */
export function ValidateUserInput(value:string, rule: VALIDATION_RULES): Boolean{
    let valid: Boolean = false;
    switch (rule) {
        case VALIDATION_RULES.GitlabGroupName:
            valid = value !== null
            break;
        case VALIDATION_RULES.GitlabGroupPath:
            valid = value !== null
            break;
        case VALIDATION_RULES.NotEmptyOrNull:
            valid = !!value && value !== ""; 
            break;
        default:

            break;
    }
    return valid;
}

