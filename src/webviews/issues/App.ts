import { Api } from "../../api";
import { IssueViewEvents } from "../../globals/constants";
import './App.css' 

let api = Api.Instance;
let app = document.getElementById("app");
let selection = { value: 0, id: 0 };

enum Routes {
    PENDING = 0,
	GROUP_ISSUES_ROUTE,
	PROJECT_ISSUES_ROUTE,
	ISSUE_ROUTE,
}

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case IssueViewEvents.API_TOKEN: {
            Route(Routes.PENDING)
			Api.updateAuthToken(event.data.Token);
			break;
		}
		case IssueViewEvents.GROUP_SELECTED: {
			selection.value = IssueViewEvents.GROUP_SELECTED;
			selection.id = event.data.id;

			Route(Routes.GROUP_ISSUES_ROUTE);
			break;
		}
		case IssueViewEvents.PROJECT_SELECTED: {
			selection.value = IssueViewEvents.PROJECT_SELECTED;
			selection.id = event.data.id;
			Route(Routes.PROJECT_ISSUES_ROUTE);
			break;
		}
	}
});

function CreateHtmlNode(type: string, attributes: { key: string; value: string | Function | boolean }[] | null, innerHTML: string): Node {
	const el = document.createElement(type);
	el.innerHTML = innerHTML;
	if (attributes) {
		for (const attribute of attributes) {
			const key = attribute.key as string;
			const value = attribute.value;
			if (key.startsWith("on") && typeof value === "function") {
				el.addEventListener(key.substring(2) as keyof HTMLElementEventMap, value as EventListenerOrEventListenerObject);
			} else if (typeof value === "boolean") {
				el.setAttribute(key, "");
			} else if (typeof value !== "function") {
				el.setAttribute(key, value);
			} else {
				console.log("Error! Element attribute cannot be set");
			}
		}
	}
	return el;
}
function CreateCommentNode(comment: IComment): Node {
	let commentNode = CreateHtmlNode("div", null, comment.body);
	return commentNode;
}
function CreateNewCommentInput(issue: IIssue): Node {
	let div = CreateHtmlNode("div", null, "");
	div.appendChild(CreateHtmlNode("input", [{ key: "id", value: "NewCommentInputBox" }], ""));
	div.appendChild(
		CreateHtmlNode(
			"button",
			[
				{
					key: "onclick",
					value: () => {
						api.createNewProjectIssueComment(
							issue.project_id,
							issue.iid,
							(document.getElementById("NewCommentInputBox") as HTMLInputElement)!.value
						);
					},
				},
			],
			"post new comment"
		)
	);
	return div;
}
function CreateIssueNode(issue: IIssue): Node {
	let issueNode = CreateHtmlNode("div", null, "");
	issueNode.appendChild(
		CreateHtmlNode(
			"h1",
			[
                { key: "class", value: "issue" },
				{
					key: "onclick",
					value: () => {
						Route(Routes.ISSUE_ROUTE, {project_id: issue.project_id, issue_iid: issue.iid });
					},
				},
			],
			issue.title
		)
	);
	return issueNode;
}
interface x {
	project_id: number;
	issue_iid: number;
}

async function Route(route: Routes, args?: /* object | */ x): Promise<void> {
	app!.innerHTML = "";
	switch (route) {
        case Routes.PENDING: {
            
            break;
        }
		case Routes.GROUP_ISSUES_ROUTE: {
			api.getGroupIssues(selection.id).then((res: any) => {
				res.data;
				for (const issue of res.data) {
					issue.author = {
						username: issue.author.username,
						name: issue.author.name,
						id: issue.author.id,
					};
					issue.reference = issue.references.full;
				}
				for (const issue of res.data as IIssue[]) {
					app!.appendChild(CreateIssueNode(issue));
				}
			});
			break;
		}
		case Routes.PROJECT_ISSUES_ROUTE: {
			api.getProjectIssues(selection.id).then((res: any) => {
				res.data;
				for (const issue of res.data) {
					issue.author = {
						username: issue.author.username,
						name: issue.author.name,
						id: issue.author.id,
					};
					issue.reference = issue.references.full;
				}
				for (const issue of res.data as IIssue[]) {
					app!.appendChild(CreateIssueNode(issue));
				}
			});
			break;
		}
		case Routes.ISSUE_ROUTE: {
			api.getProjectIssue(args!.project_id, args!.issue_iid).then((IssueResultObject) => {
				let issue: IIssue = IssueResultObject.data;
				api.getProjectIssueComments(args!.project_id, args!.issue_iid).then((CommentsResultObject) => {
					for (const comment of CommentsResultObject.data) {
						comment.id = comment.noteable_iid;
						comment.author = {
							username: comment.author.username,
							name: comment.author.name,
							id: comment.author.id,
						};
					}
					let comments: IComment[] = CommentsResultObject.data;
					app!.appendChild(
						CreateHtmlNode(
							"button",
							[
								{
									key: "onclick",
									value: () => {
										Route(selection.value);
									},
								},
							],
							"&#x21A9;"
						)
					);
					app!.appendChild(CreateHtmlNode("h1", [{ key: "class", value: "header" }], issue.title));
					for (const comment of comments) {
						app!.appendChild(CreateCommentNode(comment));
					}
					app!.appendChild(CreateNewCommentInput(issue));
				});
			});
			break;
		}
	}
}
