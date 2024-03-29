import * as vscode from "vscode";
import Api from "../api";
const api = Api.Instance;
import { Node } from "./node";

let ProjectID: number;

export class JobNode extends Node {
	status: string; //can prob be made into an enum, TODO
	stage: string;
	duration: string;
	constructor(
		node_id: number,
		parent_id: number,
		status: string,
		url: URL,
		public readonly label: string /* vscode.TreeItemLabel */,
		stage: string,
		duration: string
	) {
		super(node_id, parent_id, url, "job", vscode.TreeItemCollapsibleState.None, label);
		this.status = status;
		this.stage = stage;
		this.duration = duration;
	}

	iconPath: vscode.ThemeIcon | undefined;
}
export class PipelineNode extends Node {
	status: string;
	source: string; //can prob be made into an enum, TODO
	// author_name
	constructor(
		node_id: number,
		parent_id: number,
		status: string,
		source: string,
		url: URL,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(node_id, parent_id, url, "pipeline", vscode.TreeItemCollapsibleState.Collapsed, "#" + node_id.toString());
		this.status = status;
		this.source = source;
	}
}

export class PipelineModel {
	constructor() {}
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
				let pipelines = new Array<PipelineNode>();
				for (let i = 0; i < res.data.length; i++) {
					pipelines.push(
						new PipelineNode(
							res.data[i].id,
							res.data[i].project_id,
							res.data[i].status,
							res.data[i].source,
							res.data[i].web_url,
							vscode.TreeItemCollapsibleState.Collapsed
						)
					);
				}
				return pipelines;
			});
		} else if (element.contextValue === "pipeline") {
			return api.getPipelineJobs(ProjectID, element.node_id).then((res: any) => {
				let jobs = new Array<JobNode>();
				for (let i = 0; i < res.data.length; i++) {
					jobs.push(
						new JobNode(
							res.data[i].id,
							res.data[i].pipeline.project_id,
							res.data[i].status,
							res.data[i].web_url,
							res.data[i].name,
							res.data[i].stage,
							res.data[i].duration
						)
					);
				}
				return jobs;
			}) as vscode.ProviderResult<PipelineNode[]>;
		} else return null;
	}
}

export class PipelineView {
	public groupTreeViewer: vscode.TreeView<PipelineNode>;

	constructor(context: vscode.ExtensionContext, node_id: number) {
		ProjectID = node_id;
		const pipelineModel = new PipelineModel();
		const treeDataProvider = new PipelineTreeDataProvider(pipelineModel);
		this.groupTreeViewer = vscode.window.createTreeView("pipelineView", { treeDataProvider });
		context.subscriptions.push(this.groupTreeViewer);
		vscode.commands.getCommands().then((res: string[]) => {
            if(res.indexOf('VSWorkbench.refreshPipelineView') === -1) 
                vscode.commands.registerCommand("VSWorkbench.refreshPipelineView", () => treeDataProvider.refresh());
        })
	}
}
