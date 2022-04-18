//@ts-check

import * as React from "preact/compat";
import "./App.css";
import { Api } from "../api";
let api = Api.Instance;

// function IssueView(props:any) {
//     // `props.rest` is the rest of the URL after "/profile/"
//     let issue:any;

//     api.getProjectIssue(props.projectID, props.issueID).then((res)=>{
//         console.log('res.data')
//         console.log(res.data)
//         issue = res.data
//     })
//     return (
//       <div>
//           {props.id}
//         { issue &&
//         <h1>
//         {issue.title}
//         </h1>

//         }
//       </div>
//     );
//   }

class IssueView extends React.Component<any, {}> {
	state = {
		issue: {} as IIssue,
	};
	constructor(props: any) {
		super(props);
	}
	componentDidMount() {
		api.getProjectIssue(this.props.projectID, this.props.issueID).then((res) => {
			console.log("res.data");
			console.log(res.data);
			this.setState({ issue: res.data });
		});
	}
	render() {
		return (
			<div>
				{this.props.id}
				<h1>{this.state.issue.title}</h1>
			</div>
		);
	}
}
export default IssueView;
