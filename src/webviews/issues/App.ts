import { Api } from "../../api";
import { Icons, ViewEvents, CreateHtmlNode, loadingSpinner } from "../../globals/constants";
// import { CreateHtmlNode, } from "../../globals/functions";
import { issueQuery } from "../../api/Queries";

import "./App.css";

let api = Api.Instance;
let app = document.getElementById("app")!;
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
			Route(Routes.PENDING);
			break;
		}
		default: {
			Route(Routes.PENDING);
			break;
		}
	}
});

async function Route(route: Routes, args?: RouteArguments): Promise<void> {
	app.innerHTML = "";
	app.append(loadingSpinner());
	switch (route) {
		case Routes.PENDING: {
			app.innerHTML = "";
			app.appendChild(
				CreateHtmlNode({
					type: "p",
					attributes: [{ key: "class", value: "pending" }],
					innerHTML: "Please choose a group or project from the groups view in order to load the chosen entity's issues",
				})
			);

			break;
		}
		case Routes.GROUP_ISSUES_ROUTE: {
			api.getGroupIssues(selection.id).then((res: any) => {
				for (const issue of res.data) {
					issue.reference = issue.references.full;
				}
				let issues: IIssue[] = res.data;
				app.innerHTML = "";
				app.appendChild(CreateIssuesUL(issues));
			});
			break;
		}
		case Routes.PROJECT_ISSUES_ROUTE: {
			api.getProjectIssues(selection.id).then((res: any) => {
				for (const issue of res.data) {
					issue.reference = issue.references.full;
				}
				let issues: IIssue[] = res.data;
				app.innerHTML = "";
				app.appendChild(CreateIssuesUL(issues));
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
				app.innerHTML = "";
				app.appendChild(
					CreateHtmlNode({
						type: "button",
						attributes: [
							{
								key: "onclick",
								value: () => {
									Route(selection.value);
								},
							},
						],
						innerHTML: Icons.RETURN,
					})
				);
				app.appendChild(CreateHtmlNode({ type: "h1", attributes: [{ key: "class", value: "title" }], innerHTML: issue.title }));
				app.appendChild(CreateHtmlNode({ type: "p", innerHTML: issue.description }));

				for (const comment of comments) {
					app.appendChild(CreateCommentNode(comment));
				}
				app.appendChild(CreateNewCommentInput(issue));
			});
			break;
		}
	}
}

function CreateCommentNode(comment: IComment): Node {
	let commentNode = CreateHtmlNode({ type: "div" });
	commentNode.appendChild(CreateHtmlNode({ type: "div", innerHTML: comment.body }));
	commentNode.appendChild(
		CreateHtmlNode({
			type: "div",
			attributes: [
				{
					key: "onclick",
					value: () => {
						api.deleteIssueNote(comment.project_id, comment.issue_iid, comment.id);
					},
				},
			],
			innerHTML: Icons.TRASH,
		})
	);
	return commentNode;
}
function CreateNewCommentInput(issue: IIssue): Node {
	let div = CreateHtmlNode({ type: "div" });
	div.appendChild(CreateHtmlNode({ type: "input", attributes: [{ key: "id", value: "NewCommentInputBox" }] }));
	div.appendChild(
		CreateHtmlNode({
			type: "button",
			attributes: [
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
			innerHTML: "post new comment",
		})
	);
	return div;
}
function CreateIssuesUL(issues: IIssue[]): Node {
	let list = CreateHtmlNode({ type: "ul", attributes: [{ key: "class", value: "issues-list" }] });
	issues.forEach((issue: IIssue) => {
		list.appendChild(CreateIssueNode(issue));
	});
	list.appendChild;
	return list;
}
function CreateIssueNode(issue: IIssue): Node {
	let issueNode = CreateHtmlNode({ type: "li" });
	issueNode.appendChild(
		CreateHtmlNode({
			type: "a",
			attributes: [
				{ key: "class", value: "issue-title" },
				{
					key: "onclick",
					value: () => {
						Route(Routes.ISSUE_ROUTE, { project_id: issue.project_id, issue_iid: issue.id });
					},
				},
			],
			innerHTML: issue.title,
		})
	);
	let date = new Date(issue.created_at);
	let meta = CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "meta" }] });
	let metaBottom = CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "meta-bottom" }] });
	metaBottom.appendChild(
		CreateHtmlNode({
			type: "span",
			attributes: [{ key: "class", value: "authored" }],
			innerHTML: issue.references.short + " · created on " + date.toLocaleDateString() + " by ",
		})
	);
	metaBottom.appendChild(CreateHtmlNode({ type: "span", attributes: [{ key: "class", value: "author" }], innerHTML: issue.author.name }));
	let labels = CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "labels" }] });
	issue.labels!.forEach((label) => {
		labels.appendChild(
			CreateHtmlNode({
				type: "div",
				attributes: [
					{ key: "class", value: "label" },
					{ key: "style", value: `background-color: ${label.color}` },
				],
				innerHTML: label.title,
			})
		);
	});
	metaBottom.appendChild(labels);
	meta.appendChild(metaBottom);
	meta.appendChild(
		CreateHtmlNode({ type: "div", attributes: [{ key: "class", value: "meta-right" }], innerHTML: String(issue.user_notes_count) + ' ' + Icons.SPEECH_BUBBLE })
	);
	issueNode.appendChild(meta);
	return issueNode;
}
interface RouteArguments {
	project_id: number;
	issue_iid: number;
}
