import React, {Component} from 'react'

import OkButton from './okButton'
import CancelButton from './cancelButton'
import ReactDOM from "react-dom"

export default class InputWithOkCancel extends Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.newItemNameInput).focus();
    }

    render() {
        return <span className="input-group">
                <input className="form-control col-md-10"
                       type="text"
                       value={this.props.newItemName}
                       ref="newItemNameInput"
                       onChange={this.props.onChange}
                />
                <span className="input-group-btn">
                    <OkButton onClick={this.props.onOk}/>
                    <CancelButton onClick={this.props.onCancel}/>
                </span>
            </span>
    }
}