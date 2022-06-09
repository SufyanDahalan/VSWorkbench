import { Api } from "../../api";
import { ViewEvents, CreateHtmlNode } from "../../globals/constants";
// import { CreateHtmlNode, } from "../../globals/functions";
import { issueQuery } from "../../api/Queries";

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
		case ViewEvents.API_TOKEN: {
			selection.value = Routes.PENDING;
			// Api.updateAuthToken(event.data.Token);
            Api.updateAuthToken(event.data.Token);
            Api.updateBaseURL(event.data.baseURL);
			Route(Routes.PENDING);
			break;
		}
		case ViewEvents.GROUP_SELECTED: {
			selection.value = Routes.GROUP_ISSUES_ROUTE;
			selection.id = event.data.id;
			Route(Routes.GROUP_ISSUES_ROUTE);
			break;
		}
		case ViewEvents.PROJECT_SELECTED: {
			selection.value = Routes.PROJECT_ISSUES_ROUTE;
			selection.id = event.data.id;
			Route(Routes.PROJECT_ISSUES_ROUTE);
			break;
		}
        case ViewEvents.PENDING: {
            Route(Routes.PENDING)
            break;
        }
	}
});

async function Route(route: Routes, args?: /* object | */ RouteArguments): Promise<void> {
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
			api.graphql(issueQuery(args!.issue_iid.toString())).then((result) => {
				let res = result.data.data.issue;
				if (res.assignees.nodes.length) {
					res.assignee = res.assignees.nodes[0];
				}
				res.project_id = res.projectId;
				res.user_notes_count = res.userNotesCount;

				let issue: IIssue = res;

				for (const comment of res.notes.nodes) {
					comment.author = {
						username: comment.author.username,
						name: comment.author.name,
						id: comment.author.id,
					};
					comment.id = comment.id.split("/")[comment.id.split("/").length - 1];
					comment.project_id = res.projectId;
					comment.issue_id = args!.issue_iid;
					comment.issue_iid = res.iid;
				}
				let comments: IComment[] = res.notes.nodes;
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
			break;
		}
	}
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
						Route(Routes.ISSUE_ROUTE, { project_id: issue.project_id, issue_iid: issue.id });
					},
				},
			],
			issue.title
		)
	);
	let date = new Date(issue.created_at);
	let meta = CreateHtmlNode("div", [{ key: "class", value: "meta" }], "");
	let metaBottom = CreateHtmlNode("div", [{ key: "class", value: "meta-bottom" }], "");
	metaBottom.appendChild(
		CreateHtmlNode("span", [{ key: "class", value: "authored" }], issue.references.short + " · created on " + date.toLocaleDateString() + " by ")
	);
	metaBottom.appendChild(CreateHtmlNode("span", [{ key: "class", value: "author" }], issue.author.name));
	let labels = CreateHtmlNode("div", [{ key: "class", value: "labels" }], "");
	issue.labels!.forEach((label) => {
		labels.appendChild(
			CreateHtmlNode(
				"div",
				[
					{ key: "class", value: "label" },
					{ key: "style", value: `background-color: ${label.color}` },
				],
				label.title
			)
		);
	});
	metaBottom.appendChild(labels);
	meta.appendChild(metaBottom);
	meta.appendChild(CreateHtmlNode("div", [{ key: "class", value: "meta-right" }], String(issue.user_notes_count) + " &#x1f5ea;"));
	issueNode.appendChild(meta);
	return issueNode;
}
interface RouteArguments {
	project_id: number;
	issue_iid: number;
}
