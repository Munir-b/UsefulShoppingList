import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import RemoveButton from './controls/removeButton'
import EditButton from './controls/editButton'
import Checkbox from './controls/checkbox'
import InputWithOkCancel from "./controls/InputWithOkCancel"
import * as actions from '../actions/actions'

export class Item extends Component {


    render() {

        const {id, categoryId, name, have, temporaryName, editing} = this.props;

        console.log("temporaryName", temporaryName)

        const nameWithActions = (editing) ?
            <InputWithOkCancel newItemName={temporaryName}
                               onOk={this.props.saveItemName.bind(this, categoryId, id, temporaryName)}
                               onCancel={this.props.cancelEdit.bind(this, categoryId, id)}
                               onChange={this.props.storeItemName.bind(this, categoryId, id)}/>
            :

            <span className="input-group">

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

        </span>;

        return <span>{nameWithActions}</span>
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
            have: item.have || false,
            name: item.name,
            editing: item.editing || false,
            temporaryName: item.temporaryName || item.name
        }
    }
}

function mapDispatchToProps(dispatch) {

    return {
        removeItem: (categoryId, id) => {
            dispatch(actions.removeItem(categoryId, id))
        },
        editItem: (categoryId, id) => {
            if (categoryId && id) {
                dispatch(actions.startEditingItem(categoryId, id))
            }
            else {
                console.warn("editItem", "Invalid arguments", categoryId, id)
            }
        },
        cancelEdit: (categoryId, id) => {
            dispatch(actions.cancelEditingItem(categoryId, id))
        },
        storeItemName: (categoryId, id, event) => {
            dispatch(actions.storeItemName(categoryId, id, event.target.value))
        },
        saveItemName: (categoryId, id, name) => {
            dispatch(actions.saveItemName(categoryId, id, name))
        },
        toggleItem: (categoryId, id) => {
            dispatch(actions.toggleItem(categoryId, id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);