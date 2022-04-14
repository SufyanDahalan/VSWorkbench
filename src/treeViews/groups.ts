import { AxiosResponse } from "axios";
import * as vscode from "vscode";
import api from "../api";
// import { ProjectNode } from "./projects";
import { GROUP_VIEW_FOCUS } from "../globals";
import { IssueView } from "./issues";
import { PipelineView } from "./pipelines";
import { Node } from "./node";
export class GroupNode extends Node {
	visibility: string; //can prob be made into an enum, TODO
	/**
	 * vscode.TreeItem.contextValue
	 * possible values: "group", "user"
	 * value depends on kind of gitlab namespace
	 * TODO: maybe turn into enum to keep em clear? idk
	 */
	constructor(
		node_id: number,
		parent_id: number,
		visibility: string,
		url: URL,
		contextValue: string,
		collapsible: vscode.TreeItemCollapsibleState,
		label: string /* vscode.TreeItemLabel */
	) {
		super(node_id, parent_id, url, contextValue, collapsible, label);
		this.visibility = visibility;
	}
	iconPath: vscode.ThemeIcon | undefined;
	createGroupProject() {
		let projectName = "";
		const inputProjectName = vscode.window.createInputBox();
		inputProjectName.placeholder = "Please Enter Project Name";
		inputProjectName.onDidChangeValue((input) => {
			projectName = input;
		});
		inputProjectName.onDidAccept(() => {
			inputProjectName.hide();
			api.createGroupProject(projectName, this.node_id);
		});
		inputProjectName.show();
	}

	delete() {
		if (this.contextValue == "project") {
			api.deleteProject(this.node_id);
		} else if (this.contextValue == "group") {
			api.deleteGroup(this.node_id);
		} else if (this.contextValue == "user") {
			vscode.window.showErrorMessage("Can't delete personal namespace!");
		}
	}
	openSettingsInGitlab() {
		if (this.contextValue == "project") {
			vscode.env.openExternal(vscode.Uri.parse(this.url.toString() + "/edit"));
		} else if (this.contextValue == "group") {
			vscode.env.openExternal(vscode.Uri.parse(this.url.toString() + "/-/edit"));
		} else if (this.contextValue == "user") {
			vscode.env.openExternal(vscode.Uri.parse("https://gitlab.com/-/profile"));
		}
	}
}

export class GroupModel {
	constructor() {}

	public async getGroups(): Promise<any> {
		let res = await api.getUserGroups();

		if (res.data.length == 0) {
			return {} as GroupNode;
		} else if (res.data.length > 0) {
			let groups = new Array<GroupNode>();
			for (let i = 0; i < res.data.length; i++) {
				groups.push(
					new GroupNode(
						res.data[i].id,
						res.data[i].parent_id,
						res.data[i].visibility,
						res.data[i].web_url,
						res.data[i].kind,
						vscode.TreeItemCollapsibleState.Collapsed,
						res.data[i].name
					)
				);
			}
		}
	}
}

export class GroupTreeDataProvider implements vscode.TreeDataProvider<GroupNode> {
	onDidChange?: vscode.Event<vscode.Uri>;
	private _onDidChangeTreeData: vscode.EventEmitter<GroupNode | undefined | void> = new vscode.EventEmitter<GroupNode | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<GroupNode | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private readonly model: GroupModel) {}

	public refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	public getTreeItem(element: GroupNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	public getChildren(element?: GroupNode): vscode.ProviderResult<GroupNode[]> {
		if (!element) {
			return api.getUserNamespaces().then((res: any) => {
				// TODO: migrate to getNamespaces, and filter out nodes with parent_id != null, and add a hint on the personal namespace that it aint a group
				if (res.data.length > 0) {
					let groups = new Array<GroupNode>();
					for (let i = 0; i < res.data.length; i++) {
						if (!res.data[i].parent_id) {
							groups.push(
								new GroupNode(
									res.data[i].id,
									res.data[i].parent_id,
									res.data[i].visibility,
									res.data[i].web_url,
									res.data[i].kind,
									vscode.TreeItemCollapsibleState.Collapsed,
									res.data[i].name
								)
							);
						}
					}
					return groups;
				} else {
					return <GroupNode>{};
				}
			});
		} else if (element.contextValue === "group" || element.contextValue === "user") {
			console.log("1");
			return api.getProjects(element.contextValue === "group", element.node_id).then((res: any) => {
				// if (res.data.length > 0) {
				let groups = new Array<GroupNode>();
				for (let i = 0; i < res.data.length; i++) {
					groups.push(
						new GroupNode(
							res.data[i].id,
							res.data[i].namespace.id,
							res.data[i].visibility,
							res.data[i].web_url,
							"project",
							vscode.TreeItemCollapsibleState.None,
							res.data[i].name
						)
					);
				}
				if (element.contextValue === "group") {
					console.log("2");
					return api.getSubGroups(element.node_id).then((res: any) => {
						console.log("res.data.length");
						console.log(res.data.length);
						for (let i = 0; i < res.data.length; i++) {
							groups.push(
								new GroupNode(
									res.data[i].id,
									res.data[i].parent_id,
									res.data[i].visibility,
									res.data[i].web_url,
									"group",
									vscode.TreeItemCollapsibleState.Collapsed,
									res.data[i].name
								)
							);
						}
						return groups;
					});
				}
				return groups;
				// }
				// else {
				// 	return <GroupNode>{};
				// }
			});
		}
		// else if (element.contextValue === "project") {
		// 	return api.getUserID().then((res: AxiosResponse) => {
		// 		return api.getUserProjects(res.data.id).then((res: AxiosResponse) => {
		// 			if (res.data.length > 0) {
		// 				let groups = new Array<GroupNode>();
		// 				for (let i = 0; i < res.data.length; i++) {
		// 					groups.push(
		// 						new GroupNode(
		// 							res.data[i].id,
		// 							res.data[i].namespace.id,
		// 							res.data[i].visibility,
		// 							res.data[i].web_url,
		// 							"project",
		// 							vscode.TreeItemCollapsibleState.None,
		// 							res.data[i].name
		// 						)
		// 					);
		// 				}
		// 				return groups;
		// 			} else {
		// 				return <GroupNode>{};
		// 			}
		// 		});
		// 	});
		// }
		else {
			return Array<GroupNode>(); //<GroupNode>{}[];
		}
	}
}

export class GroupView {
	public groupTreeViewer: vscode.TreeView<GroupNode>;

	constructor(context: vscode.ExtensionContext) {
		const groupModel = new GroupModel();
		const treeDataProvider = new GroupTreeDataProvider(groupModel);
		this.groupTreeViewer = vscode.window.createTreeView("groupView", { treeDataProvider });
		context.subscriptions.push(this.groupTreeViewer);
		this.groupTreeViewer.onDidChangeSelection((selection: vscode.TreeViewSelectionChangeEvent<GroupNode>) => {
			// TODO: highlight the item selected using TreeItemLabel.highlight
			// remote-explorer-get-started, extensions-star-empty, extensions-star-full, extensions-star-half, triangle-left, arrow-left, arrow-small-left, chevron-left
			// this.groupTreeViewer.selection[0].iconPath = new vscode.ThemeIcon('extensions-star-full') // TOFIX: it simply aint working
			// treeDataProvider.refresh()
			if (selection["selection"][0].contextValue == "project") {
				new PipelineView(context, selection["selection"][0].node_id);
			}
			if (selection["selection"][0].contextValue == "group" || selection["selection"][0].contextValue == "project") {
				new IssueView(context, selection["selection"][0].contextValue == "group", selection["selection"][0].node_id);
				// FIXME: for some reason this if block gets reached once and then never gets updated again.
				// just look for a better way of initializing and creating and disposing TreeViews
			} //FIXME: fix the annoying `ee.filter is not a function` error that pops up semi randomly
			context.workspaceState.update(GROUP_VIEW_FOCUS, selection["selection"][0].node_id);
		});
		vscode.commands.registerCommand("GitLabCode.refreshGroupView", () => treeDataProvider.refresh()); // FEATURE: hook up to button with refresh icon?
	}
}
