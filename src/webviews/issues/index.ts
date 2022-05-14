import { AUTH_TOKEN_KEY } from "globals";
import * as vscode from "vscode";

export class IssuesViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "VSWorkbench.gitlabIssues";
	token: string;
	issues = [1, 2];
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;
	// private readonly _panel: vscode.WebviewPanel;



	constructor(context: vscode.ExtensionContext, Token: string) {
		// this._view = vscode.window.createWebviewPanel(this.viewType, 'gitlabIssues', vscode.ViewColumn.One, {})
		vscode.window.registerWebviewViewProvider(this.viewType, this, 
            {webviewOptions: {retainContextWhenHidden: true}}
            );
		this._extensionUri = context.extensionUri;
		// vscode.window.registerWebviewPanelSerializer(this.viewType, this)
		// context.subscriptions.push(this);
		this.token = Token;
	}
	public resolveWebviewView(
		webviewView: vscode.WebviewView
		// context: vscode.WebviewViewResolveContext<unknown>,
		// token: vscode.CancellationToken
	): void | Thenable<void> {
		// throw new Error("Method not implemented.");
		this._view = webviewView;
		webviewView.webview.options = {
			enableScripts: true,
			enableCommandUris: true,
			localResourceRoots: [this._extensionUri],
		};
		webviewView.webview.html = this.getHtml(webviewView.webview);
		this._view.webview.postMessage({ type: "Token", Token: this.token });
        this._view.onDidChangeVisibility(()=>{/* console.log("visibility changed") */}, this)
	}


	private getHtml(webview: vscode.Webview): string {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "dist", "issues", "main.js"));
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<meta http-equiv="Content-Security-Policy">
				<title>Cat Colors</title>
			</head>
			<body>
            <div id="app"></div>
                <script src="${scriptUri}"></script>

			</body>
			</html>`;
	}
}
