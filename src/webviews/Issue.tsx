//@ts-check

import { RenderableProps, ComponentChild } from "preact";
import * as React from "preact/compat"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration
import "./App.css";


interface IIssue {
    id: number,
    title: string,
    
}
// function Issue (/* issue */{id, title}: IIssue) {
//     const [value, setValue] = React.useState(0);
// 		return <div className="issue">
//                 <h1 key={/* issue. */id}>{/* issue. */title}</h1>

// 			</div>
// 		;
// }

class Issue extends React.Component<IIssue,{}>{
    constructor(props: IIssue){
        super(props)
    }
    render() {
        return (
            <div>
            <h1 key={this.props.id}>{this.props.title}</h1>
            </div>
        )
    }
}
export default Issue;
