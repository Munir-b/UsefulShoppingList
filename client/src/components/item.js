import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import RemoveButton from './controls/removeButton'
import EditButton from './controls/editButton'
import Checkbox from './controls/checkbox'

import * as actions from '../actions/actions'

export class Item extends Component {


    render() {

        const {id, categoryId, itemName, have} = this.props;

        return <span>
           <label>
               <input type="checkbox"
                      checked={have}
                      onChange={this.props.toggleItem.bind(this, categoryId, id)}
               />{itemName}
           </label>
            <RemoveButton onClick={this.props.removeItem.bind(this, id)}/>
                    <EditButton onClick={this.props.editItem.bind(this, id)}/>
        </span>
    }
}


function mapStateToProps(state, ownProps) {

    return {}
}

function mapDispatchToProps(dispatch) {

    return {
        removeItem: function () {
            console.log("removeItem")
        },
        editItem: function () {
            console.log("editItem")
        },
        toggleItem: function (categoryName, name) {
            dispatch(actions.toggleItem(categoryName, name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);