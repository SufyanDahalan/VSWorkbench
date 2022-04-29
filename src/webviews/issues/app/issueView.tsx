//@ts-check

import { Component } from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration
import "./App.css";
import { Api } from "../../../api";
let api = Api.Instance;
import Comment from "./comments";
class IssueView extends Component<any, {}> {
	state = {
		issue: {} as IIssue,
		comments: [{} as IComment],
		newComment: "",
	};
	constructor(props: any) {
		super(props);
	}
	componentDidMount() {
		api.getProjectIssue(this.props.projectID, this.props.issueID).then((res) => {
			this.setState({ issue: res.data });
		});
		api.getProjectIssueComments(this.props.projectID, this.props.issueID).then((res) => {
			let comments = res.data;
			for (const comment of comments) {
				comment.id = comment.noteable_iid;
				comment.author = {
					username: comment.author.username,
					name: comment.author.name,
					id: comment.author.id,
				};
				// console.log(comment.body);
			}
			this.setState({ comments });
		});
	}
	onSubmit = () => {
		// alert("Submitted a todo");
		api.createNewProjectIssueComment(this.state.issue.project_id, this.state.issue.iid, this.state.newComment);
	};
	render() {
		return (
			<div>
				<a href="/" style="font-size: 30px;text-decoration: none;">
					{" "}
					&#x21A9;{" "}
				</a>
				<h1>{this.state.issue.title}</h1>

				{this.state.comments.map((comment) => (
					<Comment {...comment}></Comment>
				))}
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						onInput={(e: any) => {
							this.setState({ newComment: e.target.value });
							// console.log(e.target.value);
						}}
					/>
					<button type="submit">post comment</button>
				</form>
			</div>
		);
	}
}
export default IssueView;
