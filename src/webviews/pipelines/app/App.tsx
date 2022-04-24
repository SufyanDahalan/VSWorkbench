//@ts-check

import { render, Component } from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration
// import "./style.css";
import { Api } from "../../../api";
import { Router, route } from "preact-router"; // https://www.npmjs.com/package/preact-router
// @ts-ignore
const vscode = acquireVsCodeApi();
const previousState = vscode.getState();
import Commit from "./Commit";

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
		commits: [{} as ICommit],
	};
	async getCommits() {
		return this.api.getCommits(34436238);
	}
	componentDidMount() {
		this.api.getCommits(34436238).then((res: any) => {
			const commits = res.data;
			this.setState({ commits });
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
            <Router onChange={this.handleRoute}>

				<div path="/" default>
                    a7a
                    {this.state.commits.map((c) => (
							<Commit {...c}></Commit>
						))}
				</div>
                </Router>

			</div>
		);
	}
}
