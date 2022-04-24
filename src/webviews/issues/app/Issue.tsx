//@ts-check

// import * as React from "preact/compat";
import {Component} from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration

import "./App.css";
class Issue extends Component<IIssue,{}>{
    constructor(props: IIssue){
        super(props)
    }
    render() {
        return (
            <div>
            <h1 key={this.props.id}>
                <a href={'/issue/'+this.props.project_id+'/'+this.props.iid}>
                {this.props.title}
                </a>
                </h1>
            <h3>{this.props.reference} * created {this.props.created_at} by {this.props.author && this.props.author.name}</h3>
            </div>
        )
    }
}
export default Issue;
