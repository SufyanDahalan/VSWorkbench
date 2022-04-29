//@ts-check
// import * as React from "preact/compat";
import {Component} from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration


class PipelineListItem extends Component<IPipelineListItem,{}>{
    constructor(props: IPipelineListItem){
        super(props)
    }
    componentDidMount() {
	}
    render() {
        return (
            <div>
                <div style={{
                    'height': '25px',
    'width': '25px',
    'background-color': 'rgb(179, 20, 20)',
    'border-radius': '50%',
     'display': 'inline-block',
      }}>s</div>
      {/* <div class={styles.node} className={styles.node}>x</div> */}
                <h3 key={this.props.id}> {this.props.message}</h3>
                <br />
            </div>
        )
    }
}
export default PipelineListItem;
