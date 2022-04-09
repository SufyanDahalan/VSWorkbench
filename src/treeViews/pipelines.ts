import { AxiosResponse } from "axios";
import * as vscode from "vscode";
import api from "../api";
import { GROUP_VIEW_FOCUS } from "../globals";

let ProjectID: number;

export class JobNode extends vscode.TreeItem {
    node_id: number;
    project_id: number;
    status: string; //can prob be made into an enum, TODO
    resource: URL;
    stage: string;
    duration: string;

    contextValue: string = 'job';
    constructor(
        node_id: number,
        project_id: number,
        status: string,
        resource: URL,
        public readonly label: vscode.TreeItemLabel,
        stage: string,
        duration: string
    ){
        super(label);
        this.project_id = project_id;
        this.node_id = node_id;
        this.status = status;
        this.resource = resource;
        this.stage = stage;
        this.duration = duration;
    }

    iconPath:vscode.ThemeIcon | undefined;
}
export class PipelineNode extends vscode.TreeItem{
    resource: URL;
    parent_id: string;
    status: string; 
    source: string; //can prob be made into an enum, TODO
    node_id: number;
	contextValue: string = 'pipeline';
    // author_name
constructor(
    pipeline_id: number, 
    parent_id: string,
    status: string,
    source: string,
    resource: URL,
    // public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command

) {
    super('#'+pipeline_id.toString(), collapsibleState);
    this.parent_id = parent_id;
    this.status = status;
    this.node_id = pipeline_id;
    this.source = source;
    this.resource = resource;
}

}


export class PipelineModel {
	constructor() {}

	// public async getGroups(): Promise<any> {
	// 	let res = await api.getPipelineJobs(ProjectID,);

	// 	if (res.data.length == 0) {
	// 		return {} as PipelineNode;
	// 	} else if (res.data.length > 0) {
	// 		let groups = new Array<PipelineNode>();
	// 		for (let i = 0; i < res.data.length; i++) {
	// 			groups.push(
	// 				new PipelineNode(
	// 					res.data[i].id,
	// 					res.data[i].parent_id,
	// 					res.data[i].visibility,
	// 					res.data[i].web_url,
	// 					vscode.TreeItemCollapsibleState.Collapsed,
	// 					res.data[i].name
	// 				)
	// 			);
	// 		}
	// 	}
	// }
}

export class PipelineTreeDataProvider implements vscode.TreeDataProvider<PipelineNode> {


	onDidChange?: vscode.Event<vscode.Uri>;
	private _onDidChangeTreeData: vscode.EventEmitter<PipelineNode | undefined | void> = new vscode.EventEmitter<PipelineNode | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<PipelineNode | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private readonly model: PipelineModel) {}

    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }

	public getTreeItem(element: PipelineNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	public getChildren(element?: PipelineNode): vscode.ProviderResult<PipelineNode[]> {
		if (!element) {
			return api.getProjectPipelines(ProjectID).then((res: any) => {
				// TODO: migrate to getNamespaces, and filter out nodes with parent_id != null, and add a hint on the personal namespace that it aint a group
				if (res.data.length > 0) {
					let groups = new Array<PipelineNode>();
					for (let i = 0; i < res.data.length; i++) {
						groups.push(
							new PipelineNode(
                                res.data[i].id,
                                res.data[i].project_id,
                                res.data[i].status,
                                res.data[i].source,
                                res.data[i].web_url,
                            vscode.TreeItemCollapsibleState.Collapsed,
                        )
						);
					}
					return groups;
				} else {
					return <PipelineNode>{};
				}
			});
		} else if (element.contextValue === "pipeline"){
				return api.getPipelineJobs(ProjectID, element.node_id).then((res: any) => {
					if (res.data.length > 0) {
						let groups = new Array<JobNode>();
						for (let i = 0; i < res.data.length; i++) {
							groups.push(
								new JobNode(
									res.data[i].id,
									res.data[i].pipeline.project_id,
									res.data[i].status,
									res.data[i].web_url,
									res.data[i].name,
									res.data[i].stage,
									res.data[i].duration,
								)
							);
						}
						return groups;
					} else {
						return <JobNode>{};
					}
				});
		}
	}
}

export class PipelineView {
	public groupTreeViewer: vscode.TreeView<PipelineNode>;

	constructor(context: vscode.ExtensionContext, node_id:number) {
        ProjectID = node_id;
		const groupModel = new PipelineModel();
		const treeDataProvider = new PipelineTreeDataProvider(groupModel);
		this.groupTreeViewer = vscode.window.createTreeView("pipelineView", { treeDataProvider });


		// this.groupTreeViewer.onDidChangeSelection((selection: vscode.TreeViewSelectionChangeEvent<PipelineNode>) => {
		// 	// context.workspaceState.update(GROUP_VIEW_FOCUS, selection["selection"][0].node_id);
        // });
		vscode.commands.registerCommand("GitLabCode.refreshPipelineView", () => treeDataProvider.refresh()); // FEATURE: hook up to button with refresh icon?
	}
}
