import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import RemoveButton from './controls/removeButton'
import EditButton from './controls/editButton'
import Checkbox from './controls/checkbox'

import * as actions from '../actions/actions'

export class Item extends Component {


    render() {

        const {id, categoryId, name, have} = this.props;

        return <span className="input-group">

               <label>
                   <input type="checkbox"
                          checked={have}
                          onChange={this.props.toggleItem.bind(this, categoryId, id)}
                   />{name}
               </label>
                <span className="input-group-btn">
                    <EditButton onClick={this.props.editItem.bind(this, categoryId, id)}/>
                    <RemoveButton onClick={this.props.removeItem.bind(this, categoryId, id)}/>
                </span>

        </span>
    }
}


function mapStateToProps(state, ownProps) {

    const category = state.categories.get(ownProps.categoryId);
    if (!category) {
        console.error("mapStateToProps", "Category not found", ownProps.categoryId);
    }
    else {
        const item = category.items.get(ownProps.id);
        return {
            have: item.have,
            name: item.name
        }
    }
}

function mapDispatchToProps(dispatch) {

    return {
        removeItem: function (categoryId, id) {
            dispatch(actions.removeItem(categoryId, id))
        },
        editItem: function () {
            console.log("editItem")
        },
        toggleItem: function (categoryId, id) {
            dispatch(actions.toggleItem(categoryId, id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);