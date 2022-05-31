import * as vscode from "vscode";
import { Api } from "../../api";
import PubSub from 'pubsub-js'
import { IssueViewEvents } from '../../globals/'
let api = Api.Instance;


export class IssuesViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "VSWorkbench.gitlabIssues";
	token: string;
	// issues = [1, 2];
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;

	constructor(context: vscode.ExtensionContext, Token: string) {
		vscode.window.registerWebviewViewProvider(this.viewType, this, { webviewOptions: { retainContextWhenHidden: true } });
		this._extensionUri = context.extensionUri;
		this.token = Token;
        PubSub.subscribe(IssueViewEvents[IssueViewEvents.GROUP_SELECTED], (msg: any, data: any)=>{
		    this._view!.webview.postMessage({ type: 0, msg, id: data.id });
        })
        PubSub.subscribe(IssueViewEvents[IssueViewEvents.PROJECT_SELECTED], (msg: any, data: any)=>{
		    this._view!.webview.postMessage({ type: 1, msg, id: data.id });
        })
	}
	public resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
		this._view = webviewView;
		webviewView.webview.options = {
			enableScripts: true,
			enableCommandUris: true,
			localResourceRoots: [this._extensionUri],
		};
		webviewView.webview.html = this.getHtml(webviewView.webview);
		this._view.webview.postMessage({ type: IssueViewEvents.API_TOKEN, Token: this.token });
		this._view.webview.onDidReceiveMessage((message)=>{
		api.createNewProjectIssueComment(message.project_id, message.issue_iid, message.newComment);

        });
        
	}

	private getHtml(webview: vscode.Webview): string {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "dist", "issues", "main.js"));
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy">
				<title>GitLab Issues | VSWorkbench</title>
			</head>
			<body>
            <script >window.vscode = acquireVsCodeApi();</script>
            <div id="app"></div>

                <script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
