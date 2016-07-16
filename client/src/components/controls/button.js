import React, {Component} from 'react'

export default class Button extends Component {


    render() {
        return <span >
                <button onClick={this.props.onClick} type="button"
                        className="btn btn-default">
                    <span className={["glyphicon"].concat( this.getIcon()).join(" ")}/>
                </button>
        </span>
    }
}
