import { ViewEvents } from "../../globals";
import * as vscode from "vscode";
// import PubSub from "pubsub-js";
import { changeValidEmitter } from "../../event";


export class PipelineViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "VSWorkbench.gitlabPipelines";
	token: string;
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;
	constructor(context: vscode.ExtensionContext, Token: string) {
		// PubSub.subscribe(ViewEvents[ViewEvents.PROJECT_SELECTED], (msg: any, data: any) => {
		// 	this._view!.webview.postMessage({ type: ViewEvents.PROJECT_SELECTED, msg, id: data.id });
		// });
        changeValidEmitter.event(this.funk, this)

		vscode.window.registerWebviewViewProvider(this.viewType, this,
            {webviewOptions: {retainContextWhenHidden: true}}
            );
		this._extensionUri = context.extensionUri;
		this.token = Token;
	}
    funk(data: any){
        this._view!.webview.postMessage({ type: ViewEvents[data.event], msg: data.event, id: data.id });
    }
	public resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
		this._view = webviewView;
		webviewView.webview.options = {
			enableScripts: true,
			enableCommandUris: true,
			localResourceRoots: [this._extensionUri],
		};
		webviewView.webview.html = this.getHtml(webviewView.webview);
		this._view.webview.postMessage({ type: ViewEvents.API_TOKEN, Token: this.token });

        
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
            <script >window.vscode = acquireVsCodeApi();</script>
            <div id="app"></div>
                <script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
