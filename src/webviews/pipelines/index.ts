import { ViewEvents } from "../../globals";
import * as vscode from "vscode";
import { changeValidEmitter, newAuthentication } from "../../globals/event";
import { Api } from "../../api";

let pendingData: any = null;

export class PipelineViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "VSWorkbench.gitlabPipelines";
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;
	constructor(context: vscode.ExtensionContext) {
		changeValidEmitter.event(this.eventCallback, this);

		vscode.window.registerWebviewViewProvider(this.viewType, this, { webviewOptions: { retainContextWhenHidden: true } });
		this._extensionUri = context.extensionUri;
	}
	eventCallback(data: any) {
		if (this._view) {
			this._view.webview.postMessage({ type: ViewEvents[data.event], id: data.id, fullpath: data.fullpath });
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
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "dist", "pipelines", "main.js"));
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy">
				<title>GitLab CI | VSWorkbench</title>
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
