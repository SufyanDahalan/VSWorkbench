// import { IssuesNode } from "./issues";
import * as vscode from "vscode";
import api from "../api";


// export interface ProjectNode {
// 	resource: URL;
//     name: string;
//     parent_id: number; // to which group this project belongs
// 	visibility: string; //can prob be made into an enum, TODO
// 	id: number;

// 	// issues: IssuesNode[];
// }

export class ProjectNode extends vscode.TreeItem{
        resource: URL;
        parent_id: number; // to which group this project belongs
        visibility: string; //can prob be made into an enum, TODO
        project_id: number;

	constructor(
        project_id: number, 
        parent_id: number,
		visibility: string,
		resource: URL,
		public readonly label: string,
		// public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command

	) {
		super(label/* , collapsibleState */);
		this.parent_id = parent_id;
		this.project_id = project_id;
		this.visibility = visibility;
		this.resource = resource;
	}

	contextValue = 'project';
}

// export class ProjectModel {
// 	constructor() {}
// 	public async getProjects(): Promise<any>{
// 		let res = await api.getUserProjects(api.getUserIDAsync());
// 		if (res.data.length == 0) {
// 			return {} as ProjectNode;
// 		} else if (res.data.length > 0) {
// 			let groups = new Array<ProjectNode>();
// 			for (let i = 0; i < res.data.length; i++) {
// 				groups.push(<ProjectNode>{
// 					id: res.data[i].id,
// 					name: res.data[i].name,
// 					parent_id: res.data[i].parent_id,
// 					visibility: res.data[i].visibility,
// 					resource: res.data[i].web_url,
// 				});
// 			}
// 		}
// 	}
// }
// export class ProjectTreeDataProvider implements vscode.TreeDataProvider<ProjectNode>/* , vscode.TextDocumentContentProvider  */{
// 	// onDidChangeTreeData?: vscode.Event<void | ProjectNode | ProjectNode[]>;
// 	onDidChange?: vscode.Event<vscode.Uri>;
// 	private _onDidChangeTreeData: vscode.EventEmitter<ProjectNode> = new vscode.EventEmitter<ProjectNode>();
// 	readonly onDidChangeTreeData: vscode.Event<ProjectNode> = this._onDidChangeTreeData.event;
// 	constructor(private readonly model: ProjectModel) {}

// 	public async refresh(): Promise<void> {
// 		await this.model.getProjects();
// 	}

// 	getTreeItem(element: ProjectNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
//         // return element.getTreeItem()
//         return {
//             label: element.name,
//         }
// 	}

// 	public getChildren(element?: ProjectNode): vscode.ProviderResult<ProjectNode[]> {
// 		return api.getUserProjects(9018313/* api.getUserIDAsync() */).then((res: any) => { 
// 			if (res.data.length > 0) {
// 				let groups = new Array<ProjectNode>();
// 				for (let i = 0; i < res.data.length; i++) {
// 					groups.push(<ProjectNode>{
// 						id: res.data[i].id,
// 						name: res.data[i].name,
// 						parent_id: res.data[i].parent_id,
// 						visibility: res.data[i].visibility,
// 						resource: res.data[i].web_url,
// 					});
// 				}
//                 return groups;
// 			} else {
// 				return <ProjectNode>{};
// 			}
// 		});
// 	}
// 	getParent?(element: ProjectNode): vscode.ProviderResult<ProjectNode> {
// 		return api.getGroupById(element.parent_id).then((res: any) => {
// 			return res.data.length === 1
// 				? <ProjectNode>{
// 						id: res.data[0].id,
// 						name: res.data[0].name,
// 						parent_id: res.data[0].parent_id,
// 						visibility: res.data[0].visibility,
// 						resource: res.data[0].web_url,
// 				  }
// 				: <ProjectNode>{};
// 		});
// 	}
// }
// export class ProjectView {
// 	private projectTreeViewer: vscode.TreeView<ProjectNode>;

// 	constructor(context: vscode.ExtensionContext) {
// 		const projectModel = new ProjectModel();
// 		const treeDataProvider = new ProjectTreeDataProvider(projectModel);
// 		// context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider("GroupTree", treeDataProvider));
// 		this.projectTreeViewer = vscode.window.createTreeView("projectsView", { treeDataProvider });
// 		vscode.commands.registerCommand('GitLabCode.refreshProjectsView', () => treeDataProvider.refresh()); // hook up to button?
// 	}
// }
