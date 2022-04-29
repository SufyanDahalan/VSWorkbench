//@ts-check

import { render, Component } from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration
import { Api } from "../../../api";
import "./App.css";
import Issue from "./Issue";
import IssueView from "./issueView";
import { Router, route } from "preact-router"; // https://www.npmjs.com/package/preact-router
// @ts-ignore
const vscode = acquireVsCodeApi();
const previousState = vscode.getState();

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case "Token": {
			let api = Api.Instance;
			Api.updateAuthToken(event.data.Token);
			render(<App api={api} />, document.getElementById("app") as Element);
			break;
		}
	}
});

class App extends Component<{ api: Api }, {}> {
	api: Api = this.props.api;
	state = {
		issues: [{} as IIssue],
	};
	async getIssues() {
		return this.api.getGroupIssues(16455408);
	}
	componentDidMount() {
		this.api.getGroupIssues(16455408).then((res: any) => {
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
	handleRoute = async (e: any) => {
		switch (e.url) {
			case "/issue":
				route("/issue", true);
				break;
            // case "/issue/:projectID/:issueID":
            //     route("/issue/:projectID/:issueID", true);
            //     break;
            // default:
            //     route("/", true);
            //     break;
		}
	};
	public render() {
		return (
			<div className="App">
				<Router onChange={this.handleRoute}>
					<div path="/" default>
						<header className="App-header">
							<h1 className="App-title">Issues</h1>
						</header>
						{this.state.issues.map((issue) => (
							<Issue {...issue}></Issue>
						))}
					</div>
					<IssueView path="/issue/:projectID/:issueID" />
				</Router>
			</div>
		);
	}
}
