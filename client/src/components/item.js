import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import RemoveButton from './controls/removeButton'
import EditButton from './controls/editButton'
import Checkbox from './controls/checkbox'

import * as actions from '../actions/actions'

export class Item extends Component {


    render() {

        return <span>
           <label>
               <input type = "checkbox"
                      checked = {this.props.have}
                      onChange={this.props.toggleItem.bind(this, this.props.categoryName, this.props.name)}
               />{this.props.name}
           </label>
            <RemoveButton onClick={this.props.removeItem.bind(this, this.props.name)}/>
                    <EditButton onClick={this.props.editItem}/>
        </span>
    }
}


function mapStateToProps(state, ownProps) {

    return {

    }
}

function mapDispatchToProps(dispatch) {

    return {
        removeItem: function() {
            console.log("removeItem")
        },
        editItem: function() {
            console.log("editItem")
        },
        toggleItem: function(categoryName, name) {
            console.log("toggleItem");
            dispatch(actions.toggleItem(categoryName, name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);