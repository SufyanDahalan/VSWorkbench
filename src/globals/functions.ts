// https://devblogs.microsoft.com/typescript/announcing-typescript-2-2/
// https://stackoverflow.com/a/45493827/16419931
import * as vscode from "vscode";
import { AUTH_TOKEN_KEY, GITLAB_INSTANCE_KEY, GitLab_SaaS_Base_URL, VALIDATION_RULES } from "./constants";
import { Api } from "../api";
import { newAuthentication } from "./event";
const api = Api.Instance;

export async function settings(globalState: vscode.ExtensionContext["globalState"]) {
	// get personal auth token and gitlab instance
	let gitlabInstance = "",
		gitlabAuthToken = "";
	const inputPersonalAuthToken = vscode.window.createInputBox();
	inputPersonalAuthToken.placeholder = "Please Enter Your Personal Authentication Token";
	inputPersonalAuthToken.onDidChangeValue((tokenInput) => {
		gitlabAuthToken = tokenInput;
	});
	inputPersonalAuthToken.onDidAccept(async () => {
		inputPersonalAuthToken.hide();
		if (gitlabInstance.endsWith("/") && !gitlabInstance.endsWith("/api/") && gitlabInstance !== GitLab_SaaS_Base_URL) {
			gitlabInstance += "api/";
		} else if (gitlabInstance !== GitLab_SaaS_Base_URL) {
			gitlabInstance += "/api/";
		}
		let res = await checkGitlabInstanceAndAuthToken(gitlabAuthToken, gitlabInstance);

		if (res) {
			globalState.update(GITLAB_INSTANCE_KEY, gitlabInstance);
			globalState.update(AUTH_TOKEN_KEY, gitlabAuthToken);
			newAuthentication.fire();
		} else if (!res) {
			Api.updateAuthToken(globalState.get(AUTH_TOKEN_KEY) as string);
			Api.updateBaseURL(globalState.get(GITLAB_INSTANCE_KEY) as string);
			// optionally show some error message depending on whats wrong
			inputGitlabInstance.show();
		}
	});

	const inputGitlabInstance = vscode.window.createInputBox();
	inputGitlabInstance.placeholder = "Please Enter Your Gitlab Instance [e.g. https://gitlab.com]";
	inputGitlabInstance.onDidChangeValue((tokenInput) => {
		gitlabInstance = tokenInput;
	});
	inputGitlabInstance.onDidAccept(() => {
		gitlabInstance = gitlabInstance.length ? gitlabInstance : GitLab_SaaS_Base_URL;
		inputGitlabInstance.hide();
		inputPersonalAuthToken.show();
	});
	inputGitlabInstance.show();
}

export async function checkGitlabInstanceAndAuthToken(
	token: string,
	baseurl: string,
	startup?: boolean /* globalState: vscode.ExtensionContext["globalState"] */
) {
	// console.log(`auth token from chechAuthToken: |${globalState.get(AUTH_TOKEN_KEY)}|`);
	Api.updateAuthToken(token);
	Api.updateBaseURL(baseurl);
	try {
		let res = await api.getUserInfo(); //.then((res) => {
		if (res.status.toString()[0] === "2") {
			if (startup) {
				vscode.commands.executeCommand("setContext", "VSWorkbench.authenticated", true);
			}
			return true;
		} else {
			if (startup) {
				vscode.commands.executeCommand("setContext", "VSWorkbench.authenticated", false);
			}
			return false;
		}
	} catch {
		if (startup) {
			vscode.commands.executeCommand("setContext", "VSWorkbench.authenticated", false);
		}
		return false;
	}
	// });
}
/**
 *
 * @param value string value to be validated
 * @param rule Rule to be used
 * @returns true if value is valid according to the rule specified, false otherwise
 */
export function ValidateUserInput(value: string, rule: VALIDATION_RULES): Boolean {
	let valid: Boolean = false;
	switch (rule) {
		case VALIDATION_RULES.GitlabGroupName:
			valid = value !== null;
			break;
		case VALIDATION_RULES.GitlabGroupPath:
			valid = value !== null;
			break;
		case VALIDATION_RULES.NotEmptyOrNull:
			valid = !!value && value !== "";
			break;
		default:
			break;
	}
	return valid;
}
