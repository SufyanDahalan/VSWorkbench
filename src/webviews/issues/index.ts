import * as vscode from "vscode";
import { Api } from "../../api";
let api = Api.Instance;

export class IssuesViewProvidor implements vscode.WebviewViewProvider {
	public viewType = "VSWorkbench.gitlabIssues";
	token: string;
	issues = [1, 2];
	private _view?: vscode.WebviewView;
	_extensionUri: vscode.Uri;

	constructor(context: vscode.ExtensionContext, Token: string) {
		vscode.window.registerWebviewViewProvider(this.viewType, this, { webviewOptions: { retainContextWhenHidden: true } });
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
		this._view.webview.postMessage({ type: "Token", Token: this.token });
		// this._view.webview.onDidReceiveMessage((event) => {
		//     // console.log(event)
		// api.createNewProjectIssueComment(event.project_id, event.issue_iid, event.newComment);
		// this._view ? this._view.webview.html = this.getHtml(webviewView.webview):null;
		// // vscode.commands.executeCommand('VSWorkbench.createNewProjectIssueCommand', {project_id: event.project_id, issue_iid: event.issue_iid, newComment: event.newComment})
		//     return;
		// })
		// this._view.webview.onDidReceiveMessage(this.createMessageHandler(this._view));
		this._view.webview.onDidReceiveMessage((message)=>{
		api.createNewProjectIssueComment(message.project_id, message.issue_iid, message.newComment);

        });
        
	}
	private createMessageHandler =
		(
			panel: vscode.WebviewView
			//   issuable: RestIssuable,
			//   projectInRepository: ProjectInRepository,
		) =>
		async (message: any) => {
			switch (message.command) {
				case "postComment":{
					console.log("message: ", message);
		api.createNewProjectIssueComment(message.project_id, message.issue_iid, message.newComment);

					// await vscode.commands.executeCommand("VSWorkbench.createNewProjectIssueCommand", {
					// 	project_id: message.project_id,
					// 	issue_iid: message.issue_iid,
					// 	newComment: message.newComment,
					// });

					await panel.webview.postMessage({
						type: "markdownRendered",
					});
					break;
                }
				default:
					break;
			}
		};

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
            <script > function newComment(){
                const vscode = acquireVsCodeApi();
                console.log("new comment in progress");
                vscode.postMessage({
                    command: 'postComment',
                    project_id: 35151212,
                    issue_iid: 4,
                    newComment: 'this.state.newComment'
                });
                }</script>
            <button onclick="newComment()">new comment bliz</button>
            <div id="app"></div>

                <script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
