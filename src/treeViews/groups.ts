import { AxiosResponse } from "axios";
import * as vscode from "vscode";
import api from "../api";
import { ProjectNode } from "./projects";
import { GROUP_VIEW_FOCUS } from "../globals";
import {IssueView} from './issues'
import {PipelineView} from './pipelines'



export class GroupNode extends vscode.TreeItem {
	node_id: number;
	parent_id: number;
	visibility: string; //can prob be made into an enum, TODO
	resource: URL;
	/**
	 * vscode.TreeItem.contextValue
	 * possible values: "group", "user"
	 * value depends on kind of gitlab namespace
	 * TODO: maybe turn into enum to keep em clear? idk
	 */
	contextValue: string;
	constructor(
		node_id: number,
		parent_id: number,
		visibility: string,
		resource: URL,
		contextValue: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly label: vscode.TreeItemLabel
	){
		super(label, collapsibleState);
		this.parent_id = parent_id;
		this.node_id = node_id;
		this.visibility = visibility;
		this.resource = resource;
		this.contextValue = contextValue;
	}
    iconPath:vscode.ThemeIcon | undefined;
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
					return groups;
				} else {
					return <GroupNode>{};
				}
			});
		} else {
			if (element.contextValue === "group") {
				return api.getGroupProjects(element.node_id).then((res: any) => {
					if (res.data.length > 0) {
						let groups = new Array<ProjectNode>();
						for (let i = 0; i < res.data.length; i++) {
							groups.push(
								new ProjectNode(
									res.data[i].id,
									res.data[i].namespace.parent_id,
									res.data[i].visibility,
									res.data[i].web_url,
									res.data[i].name
								)
							);
						}
						return groups;
					} else {
						return <ProjectNode>{};
					}
				});
			} else {
				return api.getUserID().then((res: AxiosResponse) => {
					return api.getUserProjects(res.data.id).then((res: AxiosResponse) => {
						if (res.data.length > 0) {
							let groups = new Array<ProjectNode>();
							for (let i = 0; i < res.data.length; i++) {
								groups.push(
									new ProjectNode(
										res.data[i].id,
										res.data[i].namespace.parent_id,
										res.data[i].visibility,
										res.data[i].web_url,
										res.data[i].name
									)
								);
							}
							return groups;
						} else {
							return <ProjectNode>{};
						}
					});
				});
			}
		}
	}
}

export class GroupView {
	public groupTreeViewer: vscode.TreeView<GroupNode>;

	constructor(context: vscode.ExtensionContext) {
		const groupModel = new GroupModel();
		const treeDataProvider = new GroupTreeDataProvider(groupModel);
		this.groupTreeViewer = vscode.window.createTreeView("groupView", { treeDataProvider });

		this.groupTreeViewer.onDidChangeSelection((selection: vscode.TreeViewSelectionChangeEvent<GroupNode>) => {
            // TODO: highlight the item selected using TreeItemLabel.highlight
            // remote-explorer-get-started, extensions-star-empty, extensions-star-full, extensions-star-half, triangle-left, arrow-left, arrow-small-left, chevron-left
            // this.groupTreeViewer.selection[0].iconPath = new vscode.ThemeIcon('extensions-star-full') // TOFIX: it simply aint working
            // treeDataProvider.refresh()
            if(selection["selection"][0].contextValue == "project"){
                new PipelineView(context, selection['selection'][0].node_id)
            }
            if(selection["selection"][0].contextValue == "group" || selection["selection"][0].contextValue == "project"){
                new IssueView(context, selection["selection"][0].contextValue == "group", selection["selection"][0].node_id);
                // FIXME: for some reason this if block gets reached once and then never gets updated again.
                // just look for a better way of initializing and creating and disposing TreeViews
            }//FIXME: fix the annoying `ee.filter is not a function` error that pops up semi randomly
            context.workspaceState.update(GROUP_VIEW_FOCUS, selection["selection"][0].node_id);
        });
		vscode.commands.registerCommand("GitLabCode.refreshGroupView", () => treeDataProvider.refresh()); // FEATURE: hook up to button with refresh icon?
	}
}
