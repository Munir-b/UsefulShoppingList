import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'


import RemoveButton from './controls/removeButton'
import EditButton from './controls/editButton'
import AddButton from './controls/addButton'


import InputWithOkCancel from './controls/InputWithOkCancel'

import * as actions from '../actions/actions'

import Item from './item'

export class Category extends Component {


    render() {

        const {id, items, adding, newItemName, editing, temporaryName} = this.props;


        const allItems = (items && items.size && items.size > 0) ? (items.valueSeq().map(
            (item) => {
                return <li key={item.id}>
                    <Item categoryId={id}
                          id={item.id}
                          name={item.name}
                          have={item.have}/>
                </li>
            }
        )) : "";

        const newOrSave = (adding) ?
            <InputWithOkCancel newItemName={newItemName}
                               onOk={this.props.addItem.bind(this, id, newItemName)}
                               onCancel={this.props.cancelAddingItem}
                               onChange={this.props.storeNewItemName.bind(this, id)}/>
            :
            <AddButton onClick={this.props.startAddingItem.bind(this, id)}/>;

        const nameWithActions = (editing) ?
            <InputWithOkCancel newItemName={temporaryName}
                               onOk={this.props.saveCategoryName.bind(this, id, temporaryName)}
                               onCancel={this.props.cancelEditingCategory}
                               onChange={this.props.storeCategoryName.bind(this, id)}/>
            :
            <span className="input-group">
                    {this.props.name}
                        <span className="input-group-btn">
                            <EditButton onClick={this.props.editCategory.bind(this, id)}/>
                            <RemoveButton onClick={this.props.removeCategory.bind(this, id)}/>
                        </span>
                </span>;
        return <span>
            {nameWithActions}
            <ul>
                {allItems}
                <li>
                    {newOrSave}
                </li>
            </ul>
            </span>
    }
}

function mapStateToProps(state, ownProps) {

    const category = state.categories.get(ownProps.id);

    if (!category) {
        console.error("category", "mapStateToProps", "Category not found", ownProps.id)
    }
    else {
        return {
            items: category.items,
            temporaryName: category.temporaryName || category.name,
            adding: category.adding || false,
            editing: category.editing || false,
            newItemName: category.newItemName || ""
        }
    }

    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        removeCategory: (id) => {
            dispatch(actions.removeCategory(id))
        },
        editCategory: (id) => {
            dispatch(actions.startEditingCategory(id))
        },
        startAddingItem: (categoryId) => {
            dispatch(actions.startAddingItem(categoryId))
        },
        cancelAddingItem: (categoryId) => {
            dispatch(actions.cancelAddingItem(categoryId))
        },
        storeNewItemName: (id, event) => {
            dispatch(actions.storeNewItemName(id, event.target.value))
        },
        addItem: (categoryId, name) => {
            if (categoryId && name) {
                dispatch(actions.addItem(categoryId, name))
            }
            else {
                console.warn("addItem", "Invalid parameters", categoryId, name);
            }
        },
        saveCategoryName: (id, name) => {
            dispatch(actions.saveCategoryName(id, name))
        },
        cancelEditingCategory: () => {
            dispatch(actions.cancelEditingCategory())
        },
        storeCategoryName: (id, event) => {
            dispatch(actions.storeCategoryName(id, event.target.value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);