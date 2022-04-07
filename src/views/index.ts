import { groupEnd } from "console";
import * as vscode from "vscode";
// const api = require("../api");
import api from "../api";

export interface GroupNode {
	id: number;
	name: string;
	parent_id: number;
	visibility: string; //can prob be made into an enum, TODO
	resource: URL;
	// subGroups: GroupNode[];
	// projects: ProjectNode[];
	// issues: IssuesNode[]; // for group issues, not issues of projects etc.
    // getTreeItem(): Promise<vscode.TreeItem> | vscode.TreeItem;

    // getChildren(): Promise<GroupNode[]> | GroupNode[];

}

export interface ProjectNode {
	resource: URL;
	issues: IssuesNode[];
}

export interface IssuesNode {
	resource: URL;
	mainText: string;
	comments: string[];
}

export class GroupModel {
	constructor() {}

	public async getGroups(): Promise<any> /* Promise<GroupNode[]> */ {
		let res = await api.getUserGroups();

		if (res.data.length == 0) {
			return {} as GroupNode; //should return an empty GroupNode[]
		} /* else if (res.data.length == 1) {
			return <GroupNode>{
				id: res.data[0].id,
				name: res.data[0].name,
				parent_id: res.data[0].parent_id,
				visibility: res.data[0].visibility,
				resource: res.data[0].web_url,
			};
		}  */else if (res.data.length > 0) {
			let groups = new Array<GroupNode>();
			for (let i = 0; i < res.data.length; i++) {
				groups.push(<GroupNode>{
					id: res.data[i].id,
					name: res.data[i].name,
					parent_id: res.data[i].parent_id,
					visibility: res.data[i].visibility,
					resource: res.data[i].web_url,
				});
			}
			// return "";
		}

		// return "";
		// return GroupNode{
		//     resource: 'https'
		// }
	}
}

export class GroupTreeDataProvider implements vscode.TreeDataProvider<GroupNode>/* , vscode.TextDocumentContentProvider  */{
	// onDidChangeTreeData?: vscode.Event<void | GroupNode | GroupNode[]>;
	onDidChange?: vscode.Event<vscode.Uri>;
	private _onDidChangeTreeData: vscode.EventEmitter<GroupNode> = new vscode.EventEmitter<GroupNode>();
	readonly onDidChangeTreeData: vscode.Event<GroupNode> = this._onDidChangeTreeData.event;
	constructor(private readonly model: GroupModel) {}

	public async refresh(): Promise<void> {
		await this.model.getGroups();
	}

	getTreeItem(element: GroupNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		// throw new Error("Method not implemented.");
        // return element.getTreeItem()
        return {
            label: element.name,
            // give back the icon of the group maybe? would be cool
        }

	}
	// provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
	// 	throw new Error("Method not implemented.");
	// }
	public getChildren(element?: GroupNode): vscode.ProviderResult<GroupNode[]> {
		// throw new Error("Method not implemented.");
		return api.getUserGroups/* getSubGroups */(element?.id).then((res: any) => {
			if (res.data.length > 0) {
                console.log("res.data.length: " + res.data.length)
                console.log("lotsa childrens found")
				let groups = new Array<GroupNode>();
				for (let i = 0; i < res.data.length; i++) {
					groups.push(<GroupNode>{
						id: res.data[i].id,
						name: res.data[i].name,
						parent_id: res.data[i].parent_id,
						visibility: res.data[i].visibility,
						resource: res.data[i].web_url,
					});
				}
                console.log("groups");
                console.log(groups);
                return groups;
			} else {
                console.log("res.data.length: " + res.data.length)
                console.log("no childrens found")
				return <GroupNode>{};
			}
		});
	}
	getParent?(element: GroupNode): vscode.ProviderResult<GroupNode> {
		// throw new Error("Method not implemented.");
		return api.getGroupById(element.parent_id).then((res: any) => {
			return res.data.length === 1
				? <GroupNode>{
						id: res.data[0].id,
						name: res.data[0].name,
						parent_id: res.data[0].parent_id,
						visibility: res.data[0].visibility,
						resource: res.data[0].web_url,
				  }
				: <GroupNode>{};
		});
	}
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
		vscode.commands.registerCommand('GitLabCode.refresh', () => treeDataProvider.refresh()); // hook up to button?
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
