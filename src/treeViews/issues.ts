import { AxiosResponse } from "axios";
import * as vscode from "vscode";
import api from "../api";
import { GROUP_VIEW_FOCUS } from "../globals";

export interface IssuesNode {
	resource: URL;
	mainText: string;
	comments: string[];
	node_id: number;
}

export class IssueNode extends vscode.TreeItem {
	node_id: number;
	parent_id: number;
	// visibility: string; //can prob be made into an enum, TODO
	resource: URL;
	/**
	 * vscode.TreeItem.contextValue
	 * possible values: "group", "user"
	 * value depends on kind of gitlab namespace
	 * TODO: maybe turn into enum to keep em clear? idk
	 */
	contextValue: string;
	// subGroups: GroupNode[]; // TODO, implies that top level nodes are groups but not subgroups, and that children can be subgroups or projects etc...
	constructor(
		node_id: number,
		project_id: number,
		// visibility: string,
		resource: URL,
		contextValue: string,
		// public readonly collapsibleState: vscode.TreeItemCollapsibleState, // FEATURE ?
		public readonly label: string // public readonly command: vscode.Command // projects?: ProjectNode[],
	) {
		super(label /* , collapsibleState */);
		this.parent_id = project_id;
		this.node_id = node_id;
		// this.visibility = visibility;
		this.resource = resource;
		this.contextValue = contextValue;
		// this.command = command;
	}
	// iconPath = {
	// 	light: "../assets/gitlab-icon-1-color-black-rgb.svg",
	// 	dark: "../assets/gitlab-icon-1-color-black-rgb.svg",
	// };
	// iconPath = {
	// 	light: `$(extensions-star-half)`,
	// 	dark: `$(extensions-star-half)`,
	// };

	// iconPath = new vscode.ThemeIcon('extensions-star-full')
	iconPath: vscode.ThemeIcon | undefined;
}

export class IssueModel {
	constructor() {}

	public async getGroups(): Promise<any> {
		let res = await api.getUserGroups();

		if (res.data.length == 0) {
			return {} as IssueNode;
		} else if (res.data.length > 0) {
			let groups = new Array<IssueNode>();
			for (let i = 0; i < res.data.length; i++) {
				groups.push(
					new IssueNode(
						res.data[i].id,
						res.data[i].parent_id,
						// res.data[i].visibility,
						res.data[i].web_url,
						res.data[i].type,
						// vscode.TreeItemCollapsibleState.Collapsed,
						res.data[i].name
					)
				);
			}
		}
	}
}

export class IssueTreeDataProvider implements vscode.TreeDataProvider<IssueNode> {
	onDidChange?: vscode.Event<vscode.Uri>;
	private _onDidChangeTreeData: vscode.EventEmitter<IssueNode | undefined | void> = new vscode.EventEmitter<IssueNode | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<IssueNode | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private readonly model: IssueModel) {}

	public refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	public getTreeItem(element: IssueNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	public getChildren(element?: IssueNode): vscode.ProviderResult<IssueNode[]> | undefined {
		if (!element) {
			return (issueKind
				? api.getGroupIssues(parent_id)
				: api.getProjectIssues(parent_id)
                ).then((res: any) => {
						if (res.data.length > 0) {
							let groups = new Array<IssueNode>();
							for (let i = 0; i < res.data.length; i++) {
								console.log(res.data[i].id);
								groups.push(
									new IssueNode(
										res.data[i].id,
										res.data[i].project_id,
										// res.data[i].visibility,
										res.data[i].web_url,
										res.data[i].kind,
										// vscode.TreeItemCollapsibleState.Collapsed,
										res.data[i].title
									)
								);
							}
                            console.log("groups[0]")
                            console.log(groups[0])
							return groups;
						} else {
                            console.log("returning undefined")
							return undefined;
						}
				  });
		} /* else {
			if (element.contextValue === "group") {
				return api.getGroupProjects(element.node_id).then((res: any) => {
					if (res.data.length > 0) {
						let groups = new Array<IssueNode>();
						for (let i = 0; i < res.data.length; i++) {
							groups.push(
								new IssueNode(
									res.data[i].id,
									res.data[i].namespace.parent_id,
									res.data[i].visibility,
									res.data[i].web_url,
                                    res.data[i].type,
									res.data[i].name
								)
							);
						}
						return groups;
					} else {
						return <IssueNode>{};
					}
				});
			} else {
				return api.getUserID().then((res: AxiosResponse) => {
					return api.getUserProjects(res.data.id).then((res: AxiosResponse) => {
						if (res.data.length > 0) {
							let groups = new Array<IssueNode>();
							for (let i = 0; i < res.data.length; i++) {
								groups.push(
									new IssueNode(
										res.data[i].id,
										res.data[i].namespace.parent_id,
										res.data[i].visibility,
										res.data[i].web_url,
                                        res.data[i].type,
										res.data[i].name
									)
								);
							}
							return groups;
						} else {
							return <IssueNode>{};
						}
					});
				});
			}
		}
        */
	}
}
let issueKind: boolean;
let parent_id: number;
export class IssueView {
	public issueTreeViewer: vscode.TreeView<IssueNode>;

	constructor(context: vscode.ExtensionContext, GroupOrProjectSelected: boolean, node_id: number) {
		// 0 == project, 1 == group
		issueKind = GroupOrProjectSelected;
		parent_id = node_id;
		const groupModel = new IssueModel();
		const treeDataProvider = new IssueTreeDataProvider(groupModel);
		this.issueTreeViewer = vscode.window.createTreeView("issueView", { treeDataProvider });

		this.issueTreeViewer.onDidChangeSelection((selection: vscode.TreeViewSelectionChangeEvent<IssueNode>) => {});
		vscode.commands.registerCommand("GitLabCode.refreshIssueView", () => treeDataProvider.refresh()); // FEATURE: hook up to button with refresh icon?
	}
}
/**
 * @todo implement actions for issues:
 * 1. Comment
 * 2. Delete
 * 3. Close
 * 4. Create
 * 
 * @feature Some extra functionality/features:
 * 1. When clicking on an issue, open a webview where the issue can be seen along with all the comments.
 * 
 * @feature as a view/title action, implement [see issues list] action. This should take the user to a web view where the issues of the 
 * parent can be viewed in a list. 
 * @feature as a view/title action, implement [see issues list] action. This should take the user to a web view where the issues of the 
 * parent can be viewed in on a board. User can switch boards and will be able to drag and drop issues from one list to another. 
 * 
 * @feature add icon to feature. choose the icon to be based off of `labels`, `urgency`, or smth else. maybe just the color to represent the label, implies 
 * migrating to a custom webviewview tho
 * 
 * @feature add avatar of assignee to the left of the issue. might require a custom webviewview
 * 
 */