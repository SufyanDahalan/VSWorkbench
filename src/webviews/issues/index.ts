import { AUTH_TOKEN_KEY } from "globals";
import * as vscode from "vscode";

export class IssuesViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "GitLabCode.gitlabIssues";
	token: string;
	issues = [1, 2];
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;
	constructor(context: vscode.ExtensionContext, Token: string) {
		// this._view = vscode.window.createWebviewPanel(this.viewType, 'gitlabIssues', vscode.ViewColumn.One, {})
		vscode.window.registerWebviewViewProvider(this.viewType, this);
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
			// retainContextWhenHidden: true,
			enableCommandUris: true,
			localResourceRoots: [this._extensionUri],
		};
		webviewView.webview.html = this.getHtml(webviewView.webview);
		this._view.webview.postMessage({ type: "Token", Token: this.token });
        // webviewView.webview.cspSource='https://gitlab.com'
	}

	private getHtml(webview: vscode.Webview): string {
		// const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "src", "webviews", "main.js"));
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "dist", "issues", "main.js"));
		// console.log(vscode.Uri.joinPath(this._extensionUri, "src", "webviews", "main.js"));
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
