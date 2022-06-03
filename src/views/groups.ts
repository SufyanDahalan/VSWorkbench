import { AxiosResponse } from "axios";
import * as vscode from "vscode";
import { Api } from "../api";
// import { ProjectNode } from "./projects";
import { AUTH_TOKEN_KEY, IssueViewEvents } from "../globals/";
import { IssueView } from "./issues";
import { PipelineView } from "./pipelines";
import { Node } from "./node";
import PubSub from "pubsub-js";

const api = Api.Instance;

export class GroupNode extends Node {
	visibility: string; //can prob be made into an enum, TODO

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
	createSubGroup() {
		let groupName = "";
		let groupPath = "";
		const inputSubGroupName = vscode.window.createInputBox();
		const inputSubGroupPath = vscode.window.createInputBox();

		inputSubGroupName.placeholder = "Please Enter Subgroup Name";
		inputSubGroupPath.placeholder = "Please Enter Subgroup Path";

		inputSubGroupPath.onDidChangeValue((input) => {
			groupPath = input;
		});
		inputSubGroupPath.onDidAccept(() => {
			inputSubGroupPath.hide();
			api.createSubGroup(this.node_id, groupName, groupPath);
		});

		inputSubGroupName.onDidChangeValue((input) => {
			groupName = input;
		});
		inputSubGroupName.onDidAccept(() => {
			groupName.match;
			inputSubGroupName.hide();
			inputSubGroupPath.show();
		});
		inputSubGroupName.show();
	}
	createGroup() {
		let groupName = "";
		let groupPath = "";
		const inputSubGroupName = vscode.window.createInputBox();
		const inputGroupPath = vscode.window.createInputBox();

		inputSubGroupName.placeholder = "Please Enter Subgroup Name";
		inputGroupPath.placeholder = "Please Enter Subgroup Path";

		inputGroupPath.onDidChangeValue((input) => {
			groupPath = input;
		});
		inputGroupPath.onDidAccept(() => {
			inputGroupPath.hide();
			api.createGroup(groupName, groupPath);
		});

		inputSubGroupName.onDidChangeValue((input) => {
			groupName = input;
		});
		inputSubGroupName.onDidAccept(() => {
			inputSubGroupName.hide();
			inputGroupPath.show();
		});
		inputSubGroupName.show();
	}
	cloneNameSpace() {
		/**
		 * @Implement https://code.visualstudio.com/api/references/vscode-api#3548
		 *   */
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

export class GroupTreeDataProvider implements vscode.TreeDataProvider<GroupNode>, vscode.TreeDragAndDropController<GroupNode> {
	dropMimeTypes = ["application/vnd.code.tree.groupView"];
	dragMimeTypes = ["application/vnd.code.tree.groupView"];

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
				// if (res.data.length > 0) {
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
				// } else {
				// 	return <GroupNode>{};
				// }
			}) as vscode.ProviderResult<GroupNode[]>;
		} else if (element.contextValue === "group" || element.contextValue === "user") {
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
					return api.getSubGroups(element.node_id).then((res: any) => {
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
			});
		} else {
			return Array<GroupNode>(); //<GroupNode>{}[];
		}
	}
	public async handleDrag(source: GroupNode[], treeDataTransfer: vscode.DataTransfer, _token: vscode.CancellationToken): Promise<void> {
		if (source[0].contextValue !== "user") {
			treeDataTransfer.set("application/vnd.code.tree.groupView", new vscode.DataTransferItem(source));
		}
	}
	public async handleDrop(target: GroupNode | undefined, sources: vscode.DataTransfer, _token: vscode.CancellationToken): Promise<void> {
		const transferItem = sources.get("application/vnd.code.tree.groupView");
		if (!transferItem) {
			return;
		}
		if (target === undefined && transferItem.value[0].contextValue === "group") {
			(await api.transferGroup(transferItem.value[0].node_id)).status.toString()[0] === "2"
				? this.refresh()
				: vscode.window.showErrorMessage("TODO");
		} else if (target !== undefined && target.node_id === transferItem.value[0].parent_id) {
			vscode.window.showErrorMessage("-_- \n Cannot transfer a project to a project."); // fr. show it to user
		} else if (
			target !== undefined &&
			target.node_id !== transferItem.value[0].parent_id &&
			transferItem.value[0].contextValue === "project" &&
			target.contextValue !== "project"
		) {
			(await api.transferProjectToGroup(target.node_id, transferItem.value[0].node_id)).status.toString()[0] === "2"
				? this.refresh()
				: vscode.window.showErrorMessage("TODO"); //.then((res: AxiosResponse) => {
		} else if (
			target !== undefined &&
			target.node_id !== transferItem.value[0].parent_id &&
			transferItem.value[0].contextValue === "group" &&
			target.contextValue !== "project"
		) {
			(await api.transferGroup(transferItem.value[0].node_id, target.node_id)).status.toString()[0] === "2"
				? this.refresh()
				: vscode.window.showErrorMessage("TODO"); //.then((res: AxiosResponse) => {
		}
	}
}
/**
 * class GroupView
 */
export class GroupView {
	public groupTreeViewer: vscode.TreeView<GroupNode>;
	constructor(context: vscode.ExtensionContext) {
		const groupModel = new GroupModel();
		const treeDataProvider = new GroupTreeDataProvider(groupModel);
		this.groupTreeViewer = vscode.window.createTreeView("groupView", {
			treeDataProvider,
			canSelectMany: false,
			/**
			 * @TODO :- implement {@link vscode.TreeDragAndDropController} +
			 * {@link https://github.com/microsoft/vscode-extension-samples/blob/main/tree-view-sample/src/testViewDragAndDrop.ts}
			 * will be used to move groups/subgroups/projects around from one group/namespace to another
			 */
			dragAndDropController: treeDataProvider,
		});
		context.subscriptions.push(this.groupTreeViewer);
		this.groupTreeViewer.onDidChangeSelection((selection: vscode.TreeViewSelectionChangeEvent<GroupNode>) => {
			// TODO: highlight the item selected using TreeItemLabel.highlight
			// remote-explorer-get-started, extensions-star-empty, extensions-star-full, extensions-star-half, triangle-left, arrow-left, arrow-small-left, chevron-left
			// treeDataProvider.refresh()
			if (selection["selection"][0].contextValue == "project") {
				new PipelineView(context, selection["selection"][0].node_id);
				PubSub.publish(IssueViewEvents[IssueViewEvents.PROJECT_SELECTED], { id: selection["selection"][0].node_id });
			} else if (selection["selection"][0].contextValue == "group") {
				PubSub.publish(IssueViewEvents[IssueViewEvents.GROUP_SELECTED], { id: selection["selection"][0].node_id });
			}
			if (selection["selection"][0].contextValue == "group" || selection["selection"][0].contextValue == "project") {
				new IssueView(context, selection["selection"][0].contextValue == "group", selection["selection"][0].node_id);
				// FIXME: for some reason this if block gets reached once and then never gets updated again.
				// just look for a better way of initializing and creating and disposing TreeViews
			} //FIXME: fix the annoying `ee.filter is not a function` error that pops up semi randomly
		});
		vscode.commands.registerCommand("VSWorkbench.refreshGroupView", () => treeDataProvider.refresh()); // FEATURE: hook up to button with refresh icon?
	}
}
