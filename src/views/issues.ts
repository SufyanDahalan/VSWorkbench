import * as vscode from "vscode";
import {Node} from './node' 

import Api from "../api";
const api = Api.Instance
let issueKind: boolean;
let parent_id: number;

export class IssueNode extends Node {
	constructor(
		node_id: number,
		project_id: number,
		url: URL,
		public readonly label: string
	) {
		super(node_id, parent_id, url, 'issue', vscode.TreeItemCollapsibleState.None, label);
		this.parent_id = project_id;
		this.node_id = node_id;
		this.url = url;
	}
	iconPath: vscode.ThemeIcon | undefined;
}

export class IssueModel {
	constructor() {}
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
			return (issueKind ? api.getGroupIssues(parent_id) : api.getProjectIssues(parent_id)).then((res: any) => {
				if (res.data.length > 0) {
					let groups = new Array<IssueNode>();
					for (let i = 0; i < res.data.length; i++) {
						groups.push(new IssueNode(res.data[i].id, res.data[i].project_id, res.data[i].web_url/* , res.data[i].kind */, res.data[i].title));
					}
					return groups;
				} else {
					return undefined;
				}
			});
		}
        return null
	}
}

export class IssueView {
	public issueTreeViewer: vscode.TreeView<IssueNode>;

	constructor(context: vscode.ExtensionContext, GroupOrProjectSelected: boolean, node_id: number) {
		/**
		 * 0 == project, 1 == group
		 */
		issueKind = GroupOrProjectSelected;
		parent_id = node_id;
		const groupModel = new IssueModel();
		const treeDataProvider = new IssueTreeDataProvider(groupModel);
		this.issueTreeViewer = vscode.window.createTreeView("issueView", { treeDataProvider });
		context.subscriptions.push(this.issueTreeViewer);
        vscode.commands.getCommands().then((res: string[]) => {
            if(res.indexOf('VSWorkbench.refreshIssueView') === -1) 
                vscode.commands.registerCommand("VSWorkbench.refreshIssueView", () => treeDataProvider.refresh());
        })
	}
}

