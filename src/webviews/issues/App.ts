import { Api } from "../../api";
import { IssueViewEvents } from "../../globals/constants";
import "./App.css";

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
			selection.value = Routes.PENDING;
			Route(Routes.PENDING);
			Api.updateAuthToken(event.data.Token);
			break;
		}
		case IssueViewEvents.GROUP_SELECTED: {
			selection.value = Routes.GROUP_ISSUES_ROUTE;
			selection.id = event.data.id;
			Route(Routes.GROUP_ISSUES_ROUTE);
			break;
		}
		case IssueViewEvents.PROJECT_SELECTED: {
			selection.value = Routes.PROJECT_ISSUES_ROUTE;
			selection.id = event.data.id;
			Route(Routes.PROJECT_ISSUES_ROUTE);
			break;
		}
	}
});

async function Route(route: Routes, args?: /* object | */ x): Promise<void> {
	app!.innerHTML = "";
	switch (route) {
		case Routes.PENDING: {
			break;
		}
		case Routes.GROUP_ISSUES_ROUTE: {
			api.getGroupIssues(selection.id).then((res: any) => {
				for (const issue of res.data) {
					issue.reference = issue.references.full;
				}
				let issues: IIssue[] = res.data;
				app!.appendChild(CreateIssuesUL(issues));
			});
			break;
		}
		case Routes.PROJECT_ISSUES_ROUTE: {
			api.getProjectIssues(selection.id).then((res: any) => {
				for (const issue of res.data) {
					issue.reference = issue.references.full;
				}
				let issues: IIssue[] = res.data;
				app!.appendChild(CreateIssuesUL(issues));
			});
			break;
		}
		case Routes.ISSUE_ROUTE: {
			api.getProjectIssue(args!.project_id, args!.issue_iid).then((IssueResultObject) => {
				let issue: IIssue = IssueResultObject.data;
				api.getProjectIssueComments(args!.project_id, args!.issue_iid).then((CommentsResultObject) => {
					for (const comment of CommentsResultObject.data) {
						comment.author = {
							username: comment.author.username,
							name: comment.author.name,
							id: comment.author.id,
						};
						comment.project_id = issue.project_id;
						comment.issue_id = comment.noteable_id;
						comment.issue_iid = comment.noteable_iid;
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
					app!.appendChild(CreateHtmlNode("h1", [{ key: "class", value: "title" }], issue.title));
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
	let commentNode = CreateHtmlNode("div", null, "");
	commentNode.appendChild(CreateHtmlNode("div", null, comment.body));
	commentNode.appendChild(
		CreateHtmlNode(
			"div",
			[
				{
					key: "onclick",
					value: () => {
						api.deleteIssueNote(comment.project_id, comment.issue_iid, comment.id);
					},
				},
			],
			"&#x1f5d1;"
		)
	);
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
function CreateIssuesUL(issues: IIssue[]): Node {
	let list = CreateHtmlNode("ul", [{ key: "class", value: "issues-list" }], "");
	issues.forEach((issue: IIssue) => {
		list.appendChild(CreateIssueNode(issue));
	});
	list.appendChild;
	return list;
}
function CreateIssueNode(issue: IIssue): Node {
	let issueNode = CreateHtmlNode("li", null, "");
	issueNode.appendChild(
		CreateHtmlNode(
			"a",
			[
				{ key: "class", value: "issue-title" },
				{
					key: "onclick",
					value: () => {
						Route(Routes.ISSUE_ROUTE, { project_id: issue.project_id, issue_iid: issue.iid });
					},
				},
			],
			issue.title
		)
	);
    let date = new Date(issue.created_at);
    let meta  = CreateHtmlNode("div", [{ key: "class", value: "meta" }],'')
    let metaBottom = CreateHtmlNode("div", [{ key: "class", value: "meta-bottom" }],'')
    metaBottom.appendChild(CreateHtmlNode('span', [{key: 'class', value: 'authored'}], issue.references.short + ' · created on ' + date.toLocaleDateString() + ' by '))
    metaBottom.appendChild(CreateHtmlNode('span', [{key: 'class', value: 'author'}], issue.author.name))
    let labels = CreateHtmlNode('div', [{key: 'class', value: 'labels'}], '')
    issue.labels.forEach(label => {
        labels.appendChild(CreateHtmlNode("div", [{ key: "class", value: "label" }], label))
    });
	metaBottom.appendChild(labels);
    meta.appendChild(metaBottom);
	meta.appendChild(CreateHtmlNode("div", [{ key: "class", value: "meta-right" }], String(issue.user_notes_count) + ' &#x1f5ea;'));
	issueNode.appendChild(meta)
	return issueNode;
}
interface x {
	project_id: number;
	issue_iid: number;
}
