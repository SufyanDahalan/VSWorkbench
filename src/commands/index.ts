// const vscode = require("vscode");
import * as vscode from 'vscode';

// const api = require("../api");
import api from '../api'

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
} // MVP
export function createGroupProjectCommand(groupID: string) {
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
} // MVP
export async function getUserGroupsCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
	console.log(await api.getUserGroups());
} // MVP

export async function createGroupCommand() {
	// vscode.window.showInformationMessage("Hello World from GitLabCode!");
    console.log("api.getUserIDAsync")
    // console.log(api.getUserIDAsync())
    console.log(api.getUserProjects(api.getUserIDAsync()))
} // MVP
export function deleteProject (projectID: string){
    // api.deleteProject(context.workspaceState.get('GROUP_VIEW_FOCUS'))
    api.deleteProject(projectID)
}
export function createIssueCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP
export function createMergeRequestCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP
export function viewPipelinesCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP
export function viewIssuesCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP

export function viewGitTreeCommand() {
	// vscode.window.showInformationMessage("Hello World from GitLabCode!");
	// api.getme;
} // Feature
export default {
    getUserGroupsCommand,
    createGroupProjectCommand,
    deleteProject,
    createPersonalProjectCommand,
    createGroupCommand,
    createIssueCommand,
    createMergeRequestCommand,
    viewPipelinesCommand,
    viewIssuesCommand,
    viewGitTreeCommand, 
}