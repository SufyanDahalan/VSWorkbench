import { AxiosResponse } from "axios";
import * as vscode from "vscode";
import api from "../api";
import { ProjectNode } from "./projects";
// export interface GroupNode1 {
// 	id: number;
// 	name: string;
// 	parent_id: number;
// 	visibility: string; //can prob be made into an enum, TODO
// 	resource: URL;
// 	// subGroups: GroupNode[];
// 	projects: ProjectNode[];
// 	// issues: IssuesNode[]; // for group issues, not issues of projects etc.
//     // getTreeItem(): Promise<vscode.TreeItem> | vscode.TreeItem;

//     // getChildren(): Promise<GroupNode[]> | GroupNode[];

// }

export class GroupNode extends vscode.TreeItem {
	group_id: number;
	// name: string;
	parent_id: number;
	visibility: string; //can prob be made into an enum, TODO
	resource: URL;
	isGroup: boolean;
	// subGroups: GroupNode[];
	// public projects: ProjectNode[];
	constructor(
		group_id: number,
		parent_id: number,
		visibility: string,
		resource: URL,
		// isGroup: boolean,
        contextValue: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly label: string,
		public readonly command?: vscode.Command // projects?: ProjectNode[],
	) {
		super(label, collapsibleState);
		this.parent_id = parent_id;
		this.group_id = group_id;
		this.visibility = visibility;
		this.resource = resource;
	    this.contextValue = contextValue;
		// this.isGroup = isGroup;
	    // contextValue = 'Group';
    // this.projects = projects;
	}
	// issues: IssuesNode[]; // for group issues, not issues of projects etc.
	// getTreeItem(): Promise<vscode.TreeItem> | vscode.TreeItem;
	// getChildren(): Promise<GroupNode[]> | GroupNode[];
}

export class GroupModel {
	constructor() {}

	public async getGroups(): Promise<any> /* Promise<GroupNode[]> */ {
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

	// public async getGroups(): Promise<any> /* Promise<GroupNode[]> */ {
	// 	let res = await api.getUserGroups();

	// 	if (res.data.length == 0) {
	// 		return {} as GroupNode; //should return an empty GroupNode[]
	// 	} /* else if (res.data.length == 1) {
	// 		return <GroupNode>{
	// 			id: res.data[0].id,
	// 			name: res.data[0].name,
	// 			parent_id: res.data[0].parent_id,
	// 			visibility: res.data[0].visibility,
	// 			resource: res.data[0].web_url,
	// 		};
	// 	}  */else if (res.data.length > 0) {
	// 		let groups = new Array<GroupNode>();
	// 		for (let i = 0; i < res.data.length; i++) {
	// 			groups.push(<GroupNode>{
	// 				id: res.data[i].id,
	// 				name: res.data[i].name,
	// 				parent_id: res.data[i].parent_id,
	// 				visibility: res.data[i].visibility,
	// 				resource: res.data[i].web_url,
	// 			});
	// 		}
	// 		// return "";
	// 	}

	// 	// return "";
	// 	// return GroupNode{
	// 	//     resource: 'https'
	// 	// }
	// }
}

export class GroupTreeDataProvider implements vscode.TreeDataProvider<GroupNode> /* , vscode.TextDocumentContentProvider  */ {
	// onDidChangeTreeData?: vscode.Event<void | GroupNode | GroupNode[]>;
	onDidChange?: vscode.Event<vscode.Uri>;
	private _onDidChangeTreeData: vscode.EventEmitter<GroupNode> = new vscode.EventEmitter<GroupNode>();
	readonly onDidChangeTreeData: vscode.Event<GroupNode> = this._onDidChangeTreeData.event;
	constructor(private readonly model: GroupModel) {}

	public async refresh(): Promise<void> {
		await this.model.getGroups();
	}

	getTreeItem(element: GroupNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		// return element.getTreeItem()
		return element;
		// return {
		//     label: element.name,
		//     // children: element.projects
		//     // give back the icon of the group maybe? would be cool
		// }
	}

	public getChildren(element?: GroupNode): vscode.ProviderResult<GroupNode[]> {
		console.log("get children, ");
		if (!element) {
			console.log("get item itself");
			return api
				.getUserNamespaces /* getUserGroups */ /* getSubGroups */
				(/* element?.id */)
				.then((res: any) => {
					//TODO: migrate to getNamespaces, and filter out nodes with parent_id != null, and add a hint on the personal namespace that it aint a group
					if (res.data.length > 0) {
						let groups = new Array<GroupNode>();
						for (let i = 0; i < res.data.length; i++) {
							// if(res.data[i].parent_id != null)
							// groups.push(<GroupNode>{
							// 	id: res.data[i].id,
							// 	name: res.data[i].name,
							// 	parent_id: res.data[i].parent_id,
							// 	visibility: res.data[i].visibility,
							// 	resource: res.data[i].web_url,
							// });
							groups.push(
								new GroupNode(
									res.data[i].id,
									res.data[i].parent_id,
									res.data[i].visibility,
									res.data[i].web_url,
									res.data[i].kind === "group",
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
			if (element.isGroup) {
				return api.getGroupProjects(element.group_id).then((res: any) => {
					if (res.data.length > 0) {
						let groups = new Array<ProjectNode>();
						for (let i = 0; i < res.data.length; i++) {
							groups.push(
								new ProjectNode(res.data[i].id, res.data[i].namespace.parent_id, res.data[i].visibility, res.data[i].web_url, res.data[i].name)
							);
						}
						return groups;
					} else {
						return <ProjectNode>{};
					}
				});
			} else {
                return api.getUserID().then((res:AxiosResponse)=>{
				return api.getUserProjects(res.data.id).then((res: AxiosResponse) => {
					if (res.data.length > 0) {
						let groups = new Array<ProjectNode>();
						for (let i = 0; i < res.data.length; i++) {
							groups.push(
								new ProjectNode(res.data[i].id, res.data[i].namespace.parent_id, res.data[i].visibility, res.data[i].web_url, res.data[i].name)
							);
						}
						return groups;
					} else {
						return <ProjectNode>{};
					}
                });
            })
			}
		}
	}
	// getParent?(element: GroupNode): vscode.ProviderResult<GroupNode> {
	// 	return api.getGroupById(element.parent_id).then((res: any) => {
	// 		return res.data.length === 1
	// 			? <GroupNode>{
	// 					id: res.data[0].id,
	// 					name: res.data[0].name,
	// 					parent_id: res.data[0].parent_id,
	// 					visibility: res.data[0].visibility,
	// 					resource: res.data[0].web_url,
	// 			  }
	// 			: <GroupNode>{};
	// 	});
	// }

	// resolveTreeItem?(item: vscode.TreeItem, element: GroupNode, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
	// 	throw new Error("Method not implemented.");
	// }
}
export class GroupView {
	private groupTreeViewer: vscode.TreeView<GroupNode>;

	constructor(context: vscode.ExtensionContext) {
		const groupModel = new GroupModel();
		const treeDataProvider = new GroupTreeDataProvider(groupModel);
		// context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider("GroupTree", treeDataProvider));
		this.groupTreeViewer = vscode.window.createTreeView("groupsView", { treeDataProvider });
		vscode.commands.registerCommand("GitLabCode.refreshGroupView", () => treeDataProvider.refresh()); // hook up to button?
	}

	// private reveal(): Thenable<void> {
	// 	const node = this.get();
	// 	if (node) {
	// 		return this.groupTreeViewer.reveal(node);
	// 	}
	// 	return null;
	// }

	// private getNode(): GroupNode {
	// 	if (this.groupTreeViewer.reveal) {
	// 		if (vscode.window.activeTextEditor.document.uri.scheme === 'ftp') {
	// 			return { resource: vscode.window.activeTextEditor.document.uri, isDirectory: false };
	// 		}
	// 	}
	// 	return null;
	// }
}
