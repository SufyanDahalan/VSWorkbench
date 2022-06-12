import * as vscode from "vscode";
import { ViewEvents } from "../../globals/";
import { changeValidEmitter, newAuthentication } from "../../globals/event";
import { Api } from "../../api";

let pendingData: any = null;

export class IssuesViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "VSWorkbench.gitlabIssues";
	// token: string;
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;

	constructor(context: vscode.ExtensionContext) {
		vscode.window.registerWebviewViewProvider(this.viewType, this, { webviewOptions: { retainContextWhenHidden: true } });
		this._extensionUri = context.extensionUri;
		// this.token = Token;
		changeValidEmitter.event(this.eventCallback, this);
	}
	public eventCallback(data: any): void {
		if (this._view) {
			this._view.webview.postMessage({ type: ViewEvents[data.event], id: data.id });
		} else {
			pendingData = { type: ViewEvents[data.event], id: data.id, fullpath: data.fullpath };
		}
	}
	public resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
		this._view = webviewView;
		webviewView.webview.options = {
			enableScripts: true,
			enableCommandUris: true,
			localResourceRoots: [this._extensionUri],
		};
		webviewView.webview.html = this.getHtml(webviewView.webview);
		// this._view.webview.postMessage({ type: ViewEvents.API_TOKEN, Token: Api.PRIVATE_TOKEN, baseURL: Api.baseURL });
		this.updateApi();
		newAuthentication.event(this.updateApi, this);
		if (pendingData !== null) {
			this.eventCallback(pendingData);
			pendingData = null;
		}
	}
	public updateApi(): void {
		if (this._view) {
			this._view!.webview.postMessage({ type: ViewEvents.API_TOKEN, Token: Api.PRIVATE_TOKEN, baseURL: Api.baseURL });
		}
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
            <script>window.vscode = acquireVsCodeApi();</script>
            <style> </style>
            <div id="app"></div>
                <script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
