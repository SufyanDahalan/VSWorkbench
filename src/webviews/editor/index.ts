import { ViewEvents } from "../../globals";
import * as vscode from "vscode";

export class EditorView {
	public viewType = "VSWorkbench.editor";
	token?: string;
	context?: vscode.ExtensionContext;
	private _views: Record<string, vscode.WebviewPanel | undefined> = {};
	_extensionUri?: vscode.Uri;
    add(context: vscode.ExtensionContext, Token: string) {
		this.context = context;
		this._extensionUri = context.extensionUri;
		this.token = Token;
	}
	public open(type: ViewEvents, isGroup: boolean, id: number, name: string) {
		const panelKey = `${type}.${isGroup}.${id}.${name}`;
		const openedPanel = this._views[panelKey];
		if (openedPanel) {
			openedPanel.reveal();
			return openedPanel;
		} else {
			const newPanel = this.create(type, isGroup, id, name);
			this._views[panelKey] = newPanel;
			newPanel.onDidDispose(() => {
				this._views[panelKey] = undefined;
			});
			return newPanel;
		}
	}

	/**
	 * Creates a new panel. Can be a wiki or a snippet panel, depending on @type param
	 * Can be used to create a wiki page, or view and edit an existing wiki.
	 * @param type Wiki or snippet
	 * @param isGroup Specifies if Group or Project
	 * @param id Group or Project id
	 */
	private create(type: ViewEvents, isGroup: boolean, id: number, name: string) {
		let panel = vscode.window.createWebviewPanel(this.viewType, `${name} | ${ViewEvents[type]}`, vscode.ViewColumn.One, {
			enableScripts: true,
			localResourceRoots: [this._extensionUri!],
			retainContextWhenHidden: true,
		});
		panel.webview.html = this.getHtml(panel.webview);
		panel.webview.postMessage({ type: ViewEvents.API_TOKEN, Token: this.token });
		panel.webview.postMessage({ type, id, isGroup });
		return panel;
	}
	private getHtml(webview: vscode.Webview): string {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri!, "dist", "editor", "main.js"));
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy">
				<title>GitLab CI | Editor</title>
			</head>
			<body>
            <script >window.vscode = acquireVsCodeApi();</script>
            <div id="app"></div>
                <script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
