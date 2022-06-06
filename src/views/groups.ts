import * as vscode from "vscode";
import { Api } from "../api";
import { AUTH_TOKEN_KEY, ViewEvents } from "../globals/";
import { IssueView } from "./issues";
import { PipelineView } from "./pipelines";
import { Node } from "./node";
// import PubSub from "pubsub-js";
import { cloneFromGitLab } from "../commands";
import { EditorView } from "../webviews/editor/editor";
import { changeValidEmitter } from "../event";
const editorView = new EditorView() 

const api = Api.Instance;

export class GroupNode extends Node {
	visibility: string; //can prob be made into an enum, TODO
	archived?: string;
	constructor(options: GroupNodeOptions) {
		super(options.node_id, options.parent_id, options.url, options.contextValue, options.collapsible, options.label);
		this.visibility = options.visibility;
		if (options.archived) {
			this.archived = options.archived;
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
		if (this.contextValue === "project") {
			api.deleteProject(this.node_id);
		} else if (this.contextValue === "group") {
			api.deleteGroup(this.node_id);
		} else if (this.contextValue === "user") {
			vscode.window.showErrorMessage("Can't delete personal namespace!");
		}
	}
	archiveProject() {
		if (this.contextValue === "project" && !this.archived) {
			return api.archiveProject(this.node_id);
		} else if (this.contextValue === "project" && this.archived) {
			return api.unArchiveProject(this.node_id);
		}
		return null;
	}
	unArchiveProject() {
		return null;
	}
	openSettingsInGitlab() {
		if (this.contextValue === "project") {
			vscode.env.openExternal(vscode.Uri.parse(this.url.toString() + "/edit"));
		} else if (this.contextValue === "group") {
			vscode.env.openExternal(vscode.Uri.parse(this.url.toString() + "/-/edit"));
		} else if (this.contextValue === "user") {
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
            if(!project.archived){
                await cloneFromGitLab(project.http_url_to_repo, path![0].path);
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
		return await cloneFromGitLab(this.url.toString(), path[0].path);
	}
    openWiki(){
        editorView.open(ViewEvents.WIKI, this.contextValue === 'group', this.node_id)
        
    }
    openSnippets()
    {
        editorView.open(ViewEvents.SNIPPET, this.contextValue === 'group', this.node_id)
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
    // editorView: EditorView
	constructor(context: vscode.ExtensionContext) {
		const groupModel = new GroupModel();
		const view = vscode.window.createTreeView("groupView", {
			treeDataProvider: this,
			canSelectMany: false,
			dragAndDropController: this,
			showCollapseAll: true,
		});
		context.subscriptions.push(view);
        editorView.add(context, context.globalState.get(AUTH_TOKEN_KEY) as string) 

		view.onDidChangeSelection((selection: vscode.TreeViewSelectionChangeEvent<GroupNode>) => {
			if (selection["selection"][0].contextValue === "project") {
				new PipelineView(context, selection["selection"][0].node_id);
				// PubSub.publish(ViewEvents[ViewEvents.PROJECT_SELECTED], { id: selection["selection"][0].node_id });
                changeValidEmitter.fire({event: ViewEvents[ViewEvents.PROJECT_SELECTED], id: selection["selection"][0].node_id })

			} else if (selection["selection"][0].contextValue === "group") {
                changeValidEmitter.fire({event: ViewEvents[ViewEvents.GROUP_SELECTED], id: selection["selection"][0].node_id })
				// PubSub.publish(ViewEvents[ViewEvents.GROUP_SELECTED], { id: selection["selection"][0].node_id });
			}
			if (selection["selection"][0].contextValue === "group" || selection["selection"][0].contextValue === "project") {
				new IssueView(context, selection["selection"][0].contextValue === "group", selection["selection"][0].node_id);
			} //FIXME: fix the annoying `ee.filter is not a function` error that pops up semi randomly
		});
		vscode.commands.registerCommand("VSWorkbench.refreshGroupView", () => this.refresh()); // FEATURE: hook up to button with refresh icon?
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
			(await api.transferGroup(source.node_id)).status.toString()[0] === "2" ? this.refresh() : vscode.window.showErrorMessage("TODO");
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
