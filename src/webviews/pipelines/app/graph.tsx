//@ts-check

import {Component} from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration
import "./App.css";
import { Router, route } from 'preact-router'; // https://www.npmjs.com/package/preact-router
// @ts-ignore
const vscode = acquireVsCodeApi();
const previousState = vscode.getState();

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case "Token": {
			break;
		}
	}
});

class App extends Component<{ }, {}> {
	componentDidMount() {
	}

	public render() {
		return (
                <div className="graph">
                    
                </div>
		);
	}
}

