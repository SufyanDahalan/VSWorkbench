import * as vscode from "vscode";
import api from "../api";

export class Node extends vscode.TreeItem {
	node_id: number;
	parent_id: number;
	url: URL;
    contextValue: string;

	constructor(
		node_id: number,
		parent_id: number,
		url: URL,
		contextValue: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly label: string/* vscode.TreeItemLabel */
	) {
		super(label, collapsibleState);
		this.parent_id = parent_id;
		this.node_id = node_id;
		this.url = url;
		this.contextValue = contextValue;
	}
    openInGitlab(){
        vscode.env.openExternal(vscode.Uri.parse(this.url.toString()));
    }
}