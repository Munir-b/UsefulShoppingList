import React, {Component} from 'react'

export default class Button extends Component {


    render() {
        return <button onClick={this.props.onClick}  type="button" className="btn btn-default btn-sm">
            <span className={["glyphicon"].concat( this.getIcon()).join(" ")}/></button>
    }
}