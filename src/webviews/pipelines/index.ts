import * as vscode from "vscode";
export class PipelineViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "VSWorkbench.gitlabPipelines";
	token: string;
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;
    focusedTreeViewItemId: number;
	constructor(context: vscode.ExtensionContext, Token: string) {
        // console.log("smth:", smth )
        this.focusedTreeViewItemId = -1;

		vscode.window.registerWebviewViewProvider(this.viewType, this,
            {webviewOptions: {retainContextWhenHidden: true}}
            );
		this._extensionUri = context.extensionUri;
		this.token = Token;
	}
	public resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
		this._view = webviewView;
		webviewView.webview.options = {
			enableScripts: true,
			enableCommandUris: true,
			localResourceRoots: [this._extensionUri],
		};
		webviewView.webview.html = this.getHtml(webviewView.webview);
        console.log('this.token', this.token)
		this._view.webview.postMessage({ type: "Token", Token: this.token });
        
	}
    public updateFocusedTreeViewItem(){

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
            <div id="app"></div>
                <script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
