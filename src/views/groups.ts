import * as vscode from "vscode";
import { Api } from "../api";
import { AUTH_TOKEN_KEY, ViewEvents } from "../globals/";
import { IssueView } from "./issues";
import { PipelineView } from "./pipelines";
import { Node } from "./node";
import { cloneFromGitLab } from "../commands";
import { EditorView } from "../webviews/editor";
import { changeValidEmitter, newAuthentication } from "../globals/event";
import { AxiosResponse } from "axios";

const editorView = new EditorView();

const api = Api.Instance;

export class GroupNode extends Node {
	visibility: string; //can prob be made into an enum, TODO
	archived?: string;
	path_with_namespace?: string;
	constructor(options: GroupNodeOptions) {
		super(
			options.node_id,
			options.parent_id,
			options.url,
			options.contextValue,
			options.collapsible,
			options.archived ? options.label + " (archived)" : options.label
		);
		this.visibility = options.visibility;
		if (options.archived) {
			this.archived = options.archived;
		}
		if (options.path_with_namespace) {
			this.path_with_namespace = options.path_with_namespace;
		}
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
		vscode.window.showInformationMessage("Are you sure you want to delete this node?", "Yes", "No").then((answer) => {
			if (answer === "Yes") {
				// Run function
				if (this.contextValue === "project") {
					api.deleteProject(this.node_id).then((res) => {
						if (res.status.toString().startsWith("2")) {
							vscode.commands.executeCommand("VSWorkbench.refreshGroupView");
						}
					});
				} else if (this.contextValue === "group") {
					api.deleteGroup(this.node_id).then((res) => {
						if (res.status.toString().startsWith("2")) {
							vscode.commands.executeCommand("VSWorkbench.refreshGroupView");
						}
					});
				} else if (this.contextValue === "user") {
					vscode.window.showErrorMessage("Can't delete personal namespace!");
				}
			}
		});
	}
	archiveProject() {
		if (this.contextValue === "project" && !this.archived) {
			vscode.commands.executeCommand("VSWorkbench.refreshGroupView");
			return api.archiveProject(this.node_id);
		} else if (this.contextValue === "project" && this.archived) {
			vscode.commands.executeCommand("VSWorkbench.refreshGroupView");
			return api.unArchiveProject(this.node_id);
		}
		return null;
	}
	openSettingsInGitlab() {
		if (this.contextValue === "project") {
			vscode.env.openExternal(vscode.Uri.parse(this.url.toString() + "/edit"));
		} else if (this.contextValue === "group") {
			vscode.env.openExternal(vscode.Uri.parse(this.url.toString() + "/-/edit"));
		} else if (this.contextValue === "user") {
			let url = this.url.toString();
			vscode.env.openExternal(
				vscode.Uri.parse(
					url
						.split("/")
						.slice(0, url.split("/").length - 1)
						.toString()
						.replaceAll(",", "/") + "/-/profile"
				)
			);
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
			api.createSubGroup(this.node_id, groupName, groupPath).then((res: AxiosResponse) => {
				if (JSON.stringify(res.status)[0] == "2") {
					vscode.commands.executeCommand("VSWorkbench.refreshGroupView");
				} else 
                vscode.window.showErrorMessage("Operation did not succeed. Name is taken.")
			});
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
			api.createGroup(groupName, groupPath)?.then((res) => {
				if (JSON.stringify(res.status)[0] == "2") {
					vscode.commands.executeCommand("VSWorkbench.refreshGroupView");
				}
			});
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
	async cloneNameSpace(): Promise<any> {
		if (this.contextValue === "project") {
			return vscode.window.showErrorMessage("Entity Chosen is not a Namespace!");
		}

		let res = await api.getProjects(this.contextValue === "group", this.node_id);
		let path: vscode.Uri[] | undefined = await vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
		});
		if (path === undefined || path[0] === undefined) {
			return vscode.window.showErrorMessage("Please choose a folder to clone into");
		}
		res.data.forEach(async (project: any) => {
			if (!project.archived) {
				await cloneFromGitLab(project.http_url_to_repo, path![0].fsPath);
			}
		});
		return true;
	}
	async cloneProject(): Promise<any> {
		if (this.contextValue !== "project") {
			return vscode.window.showErrorMessage("Entity Chosen is not a project!");
		}
		let path: vscode.Uri[] | undefined = await vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
		});
		if (path === undefined || path[0] === undefined) {
			return vscode.window.showErrorMessage("Please choose a folder to clone into");
		}
		return await cloneFromGitLab(this.url.toString(), path[0].fsPath);
	}
	openWiki() {
		editorView.open(ViewEvents.Wiki, this.contextValue === "group", this.node_id, this.label);
	}
	openSnippets() {
		editorView.open(ViewEvents.Snippets, this.contextValue === "group", this.node_id, this.label);
	}
}

export class GroupModel {
	constructor() {}

	public async getGroups(): Promise<any> {
		let res = await api.getUserGroups();

		if (res.data.length === 0) {
			return {} as GroupNode;
		} else if (res.data.length > 0) {
			let groups = new Array<GroupNode>();
			for (let i = 0; i < res.data.length; i++) {
				groups.push(
					new GroupNode({
						node_id: res.data[i].id,
						parent_id: res.data[i].parent_id,
						visibility: res.data[i].visibility,
						url: res.data[i].web_url,
						contextValue: res.data[i].kind,
						collapsible: vscode.TreeItemCollapsibleState.Collapsed,
						label: res.data[i].name,
						archived: res.data[i].kind === "project" ? res.data[i].archived : null,
						path_with_namespace: res.data[i].kind === "project" ? res.data[i].path_with_namespace : null,
					})
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
	constructor(context: vscode.ExtensionContext) {
		newAuthentication.event(this.refresh, this);
		const groupModel = new GroupModel();

		const view = vscode.window.createTreeView("groupView", {
			treeDataProvider: this,
			canSelectMany: false,
			dragAndDropController: this,
			showCollapseAll: true,
		});
		context.subscriptions.push(view);
		editorView.add(context, context.globalState.get(AUTH_TOKEN_KEY) as string);

		view.onDidChangeSelection((selection: vscode.TreeViewSelectionChangeEvent<GroupNode>) => {
			if (selection["selection"].length != 0) {
				let newSelection: any = selection["selection"][0];
				switch (newSelection.contextValue) {
					case "project": {
						new PipelineView(context, newSelection.node_id);
						changeValidEmitter.fire({
							event: ViewEvents[ViewEvents.PROJECT_SELECTED],
							id: newSelection.node_id,
							fullpath: newSelection.path_with_namespace,
						});
						new IssueView(context, newSelection.contextValue === "group", newSelection.node_id);
						break;
					}
					case "group": {
						new IssueView(context, newSelection.contextValue === "group", newSelection.node_id);
						changeValidEmitter.fire({ event: ViewEvents[ViewEvents.GROUP_SELECTED], id: selection["selection"][0].node_id });
						break;
					}
					case "user": {
						changeValidEmitter.fire({ event: ViewEvents[ViewEvents.PENDING], id: null });
						break;
					}
					default:
						changeValidEmitter.fire({ event: ViewEvents[ViewEvents.PENDING], id: null });
						// TODO log some information
						break;
				}
			} else {
				changeValidEmitter.fire({ event: ViewEvents[ViewEvents.PENDING], id: null });
			}
		});
		vscode.commands.registerCommand("VSWorkbench.refreshGroupView", () => this.refresh());
	}

	public refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	public getTreeItem(element: GroupNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	public getChildren(element?: GroupNode): vscode.ProviderResult<GroupNode[]> {
		if (!element) {
			return api.getUserNamespaces().then((res: any) => {
				let groups = new Array<GroupNode>();
				for (let i = 0; i < res.data.length; i++) {
					if (!res.data[i].parent_id) {
						groups.push(
							new GroupNode({
								node_id: res.data[i].id,
								parent_id: res.data[i].parent_id,
								visibility: res.data[i].visibility,
								url: res.data[i].web_url,
								contextValue: res.data[i].kind,
								collapsible: vscode.TreeItemCollapsibleState.Collapsed,
								label: res.data[i].name,
								archived: res.data[i].kind === "project" ? res.data[i].archived : null,
								path_with_namespace: res.data[i].kind === "project" ? res.data[i].path_with_namespace : null,
							})
						);
					}
				}
				return groups;
			}) as vscode.ProviderResult<GroupNode[]>;
		} else if (element.contextValue === "group" || element.contextValue === "user") {
			return api.getProjects(element.contextValue === "group", element.node_id).then((res: any) => {
				let groups = new Array<GroupNode>();
				for (let i = 0; i < res.data.length; i++) {
					groups.push(
						new GroupNode({
							node_id: res.data[i].id,
							parent_id: res.data[i].parent_id,
							visibility: res.data[i].visibility,
							url: res.data[i].web_url,
							contextValue: "project",
							collapsible: vscode.TreeItemCollapsibleState.None,
							label: res.data[i].name,
							archived: res.data[i].archived,
							path_with_namespace: res.data[i].path_with_namespace,
						})
					);
				}
				if (element.contextValue === "group") {
					return api.getSubGroups(element.node_id).then((res: any) => {
						for (let i = 0; i < res.data.length; i++) {
							groups.push(
								new GroupNode({
									node_id: res.data[i].id,
									parent_id: res.data[i].parent_id,
									visibility: res.data[i].visibility,
									url: res.data[i].web_url,
									contextValue: "group",
									collapsible: vscode.TreeItemCollapsibleState.Collapsed,
									label: res.data[i].name,
								})
							);
						}
						return groups;
					});
				}
				return groups;
			});
		} else {
			return Array<GroupNode>();
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
		let source = transferItem.value[0];
		if (target === undefined && source.contextValue === "group") {
			try {
				(await api.transferGroup(source.node_id)).status.toString()[0] === "2" ? this.refresh() : vscode.window.showErrorMessage("TODO");
				// fails in case name is taken on top level. does not show the TODO error message. Hence the try catch blocks
			} catch (error) {
				vscode.window.showErrorMessage("TODO");
			}
		} else if (
			(target === undefined && source.contextValue === "project") ||
			(target !== undefined &&
				(target.node_id === source.parent_id || (target.contextValue === "project" && source.contextValue === "project")))
		) {
			vscode.window.showErrorMessage(`-_-. Operation probably not logical. Try again.`);
		} else if (
			target !== undefined &&
			target.node_id !== source.parent_id &&
			source.contextValue === "project" &&
			target.contextValue !== "project"
		) {
			(await api.transferProjectToGroup(target.node_id, source.node_id)).status.toString()[0] === "2"
				? this.refresh()
				: vscode.window.showErrorMessage("TODO");
		} else if (
			target !== undefined &&
			target.node_id !== source.parent_id &&
			source.contextValue === "group" &&
			target.contextValue !== "project"
		) {
			(await api.transferGroup(source.node_id, target.node_id)).status.toString()[0] === "2"
				? this.refresh()
				: vscode.window.showErrorMessage("TODO");
		}
	}
}
