//@ts-check

import * as React from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration
import { Api } from "../api";
import "./App.css";
import Issue from "./Issue";
const vscode = acquireVsCodeApi();
const previousState = vscode.getState();
import { Router, route } from 'preact-router'; // https://www.npmjs.com/package/preact-router
window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case "Token": {
			let api = Api.Instance;
			Api.updateAuthToken(event.data.Token);
			React.render(<App api={api} />, document.getElementById("app") as Element);
			break;
		}
	}
});

// interface IIssue {
// 	id: number;
// 	title: string;
//     state: string;
//     updated_at: string;
//     labels: string[];
// }
class App extends React.Component<{ api: Api }, {}> {
	api: Api = this.props.api;
	state = {
		issues: [{} as IIssue],
	};
	async getIssues() {
		return this.api.getGroupIssues(16725755);
	}
	componentDidMount() {
		this.api.getGroupIssues(16725755).then((res: any) => {
			const issues = res.data;
			for (const issue of issues) {
				issue.author = {
					username: issue.author.username,
					name: issue.author.name,
					id: issue.author.id,
				};
				issue.reference = issue.references.full;
			}
			this.setState({ issues });
		});
	}
    handleRoute = async (e:any) => {
        switch (e.url) {
          case '/issue':
            route('/issue', true);
            break;
        }
      };
	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Issues</h1>
				</header>
            <Router onChange={this.handleRoute}>

                <div path="/" default>
                    {this.state.issues.map((issue) => (
                        <Issue {...issue}></Issue>
                        ))}
                </div>

                <div path="/issue/:id">
                        ssssssssssssssssssss

                </div>

                </Router>
			</div>
		);
	}
}
// render(<App name="s"/>, document.getElementById('app'));
export default App;

// //@ts-check

// // This script will be run within the webview itself
// // It cannot access the main VS Code APIs directly.
// (function () {
//     const vscode = acquireVsCodeApi();

//     const oldState = vscode.getState() || { colors: [] };

//     /** @type {Array<{ value: string }>} */
//     let colors = oldState.colors;

//     updateColorList(colors);

//     document.querySelector('.add-color-button').addEventListener('click', () => {
//         addColor();
//     });

//     // Handle messages sent from the extension to the webview
//     window.addEventListener('message', event => {
//         const message = event.data; // The json data that the extension sent
//         switch (message.type) {
//             case 'addColor':
//                 {
//                     addColor();
//                     break;
//                 }
//             case 'clearColors':
//                 {
//                     colors = [];
//                     updateColorList(colors);
//                     break;
//                 }

//         }
//     });

//     /**
//      * @param {Array<{ value: string }>} colors
//      */
//     function updateColorList(colors) {
//         const ul = document.querySelector('.color-list');
//         ul.textContent = '';
//         for (const color of colors) {
//             const li = document.createElement('li');
//             li.className = 'color-entry';

//             const colorPreview = document.createElement('div');
//             colorPreview.className = 'color-preview';
//             colorPreview.style.backgroundColor = `#${color.value}`;
//             colorPreview.addEventListener('click', () => {
//                 onColorClicked(color.value);
//             });
//             li.appendChild(colorPreview);

//             const input = document.createElement('input');
//             input.className = 'color-input';
//             input.type = 'text';
//             input.value = color.value;
//             input.addEventListener('change', (e) => {
//                 const value = e.target.value;
//                 if (!value) {
//                     // Treat empty value as delete
//                     colors.splice(colors.indexOf(color), 1);
//                 } else {
//                     color.value = value;
//                 }
//                 updateColorList(colors);
//             });
//             li.appendChild(input);

//             ul.appendChild(li);
//         }

//         // Update the saved state
//         vscode.setState({ colors: colors });
//     }

//     /**
//      * @param {string} color
//      */
//     function onColorClicked(color) {
//         vscode.postMessage({ type: 'colorSelected', value: color });
//     }

//     /**
//      * @returns string
//      */
//     function getNewCalicoColor() {
//         const colors = ['020202', 'f1eeee', 'a85b20', 'daab70', 'efcb99'];
//         return colors[Math.floor(Math.random() * colors.length)];
//     }

//     function addColor() {
//         colors.push({ value: getNewCalicoColor() });
//         updateColorList(colors);
//     }
// }());
