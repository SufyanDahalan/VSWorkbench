import * as vscode from "vscode";

export function createTodoItem() {
	// https://docs.gitlab.com/ee/api/issues.html#create-a-to-do-item
}
// export function getGroupIssue(){// https://docs.gitlab.com/ee/api/issues.html#single-issue
// }
export function getProjectIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#single-project-issue
}
export function createProjectIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#new-issue
	vscode.window.showInformationMessage("Hello World from VSWorkbench!");
}
export function openIssueInGitLab() {}

export function editPojectIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#edit-issue
}
export function deleteProjectIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#delete-an-issue
}
export function reorderProjectIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#reorder-an-issue
}
export function moveProjectIssueToOtherProject() {
	// https://docs.gitlab.com/ee/api/issues.html#move-an-issue
}
export function cloneProjectIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#clone-an-issue
}
export function subscribeToIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#subscribe-to-an-issue
}
export function unsubscribeToIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#unsubscribe-from-an-issue
}
export function addSpentTimeToIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#add-spent-time-for-an-issue
	/**
	 * @FEATURE add an actual timer along with it?
	 */
}
export function resetSpentTimeFromIssue() {
	// https://docs.gitlab.com/ee/api/issues.html#reset-spent-time-for-an-issue
}
export function getTimeTrackingStats() {
	// https://docs.gitlab.com/ee/api/issues.html#get-time-tracking-stats
}
export function getIssueParticipants() {
	// https://docs.gitlab.com/ee/api/issues.html#participants-on-issues
}
export function getIssueComments() {
	// https://docs.gitlab.com/ee/api/notes.html#get-single-issue-note
}
export function createIssueComment() {
	// https://docs.gitlab.com/ee/api/notes.html#create-new-issue-note
}
export function modifyIssueComment() {
	// https://docs.gitlab.com/ee/api/notes.html#modify-existing-issue-note
}
export function deleteIssueComment() {
	// https://docs.gitlab.com/ee/api/notes.html#delete-an-issue-note
}
export function createIssueSnippet() {
	// https://docs.gitlab.com/ee/api/notes.html#create-new-snippet-note
}

export function viewIssueList() {
	// https://docs.gitlab.com/ee/api/notes.html#modify-existing-snippet-note
}

/**
 * opens an issue board as a webview in vscode
 */
export function viewIssueBoard() {}

/**
 * opens gitlab issue board in gitlab in the default browser
 */
export function openIssueBoardInGitLab() {}
/**
 * opens gitlab issue list in gitlab in the default browser
 */
export function openIssueListInGitLab() {}

export default {
	viewIssueList,
	viewIssueBoard,
	getProjectIssue,
	createProjectIssue,
	editPojectIssue,
	deleteProjectIssue,
	reorderProjectIssue,
	moveProjectIssueToOtherProject,
	cloneProjectIssue,
	subscribeToIssue,
	unsubscribeToIssue,
	addSpentTimeToIssue,
	resetSpentTimeFromIssue,
	getTimeTrackingStats,
	getIssueParticipants,
	getIssueComments,
	createIssueComment,
	modifyIssueComment,
	deleteIssueComment,
	createIssueSnippet,
	openIssueBoardInGitLab,
	openIssueListInGitLab,
	createTodoItem,
	openIssueInGitLab,
};
