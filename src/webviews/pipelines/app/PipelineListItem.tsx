//@ts-check
// import * as React from "preact/compat";
import {Component} from "preact"; // https://preactjs.com/guide/v10/getting-started#typescript-preactcompat-configuration


import styles from '../styles/Pipelinelistitem.module.css'
// import styles from './Styles.module.css'
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
      <div class="smth" className={styles.smth}>x</div>
                <h3 key={this.props.id}> {this.props.status} | {this.props.project_id}</h3>
                <br />
            </div>
        )
    }
}
export default PipelineListItem;
