// const vscode = require("vscode");
import * as vscode from 'vscode';

// const api = require("../api");
import api from '../api'

function createPersonalProjectCommand() {
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
function createGroupProjectCommand() {
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
} // MVP
async function getUserGroupsCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
	console.log(await api.getUserGroups());
} // MVP

async function createGroupCommand() {
	// vscode.window.showInformationMessage("Hello World from GitLabCode!");
    console.log("api.getUserIDAsync")
    // console.log(api.getUserIDAsync())
    console.log(api.getUserProjects(api.getUserIDAsync()))
} // MVP
function deleteProject (){
	vscode.window.showInformationMessage("delete Project habibi!");
}
function createIssueCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP
function createMergeRequestCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP
function viewPipelinesCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP
function viewIssuesCommand() {
	vscode.window.showInformationMessage("Hello World from GitLabCode!");
} // MVP

function viewGitTreeCommand() {
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