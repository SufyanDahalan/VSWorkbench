import * as vscode from "vscode";
import api from "../api";

export class Node extends vscode.TreeItem {
    
	node_id: number;
	parent_id: number;
	url: URL;
    /**
     * possible values: "group", "user", "project"
     * value depends on kind of gitlab namespace
     * @TODO maybe turn into enum to keep em clear? idk
     // Note: it's possible to ignore broken links with the 'onBrokenLinks' Docusaurus configuration, and let the build pass.
	 // maybe add a rule to link it to vscode api docs. see vscode.TreeItem.contextValue
	 */
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