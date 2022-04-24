//@ts-check

import { Component} from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration
import "./App.css";
/**
 * @TODO: implement an api to exchange messages with the issues webview view over which api requests will be fulfilled
 */

/**
 * class to show comments
 * @params comments that implement interface {@link IComment}
 * 
 */
class Comment extends Component<IComment, {}> {
    constructor(props: IComment){
        super(props)
    }
	render() {
		return (
			<div>
				<h3>{this.props.body}</h3>
			</div>
		);
	}
}
export default Comment;
