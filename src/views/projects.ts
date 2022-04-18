// import { IssuesNode } from "./issues";
import * as vscode from "vscode";
import Api from "../api";
import {Node} from './node' 
const api = Api.Instance
export class ProjectNode extends Node{
    visibility: string; //can prob be made into an enum, TODO
	constructor(
        node_id: number, 
        parent_id: number,
		visibility: string,
		url: URL,
		public readonly label: string,
		public readonly command?: vscode.Command

	) {
		super(node_id, parent_id, url, 'project', vscode.TreeItemCollapsibleState.None, label);
		this.visibility = visibility;
	}
    deleteProject(){
		return api.deleteProject(this.node_id);
    }
    cloneProject(){
        
    }
}