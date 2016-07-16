import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import RemoveButton from './controls/removeButton'
import EditButton from './controls/editButton'
import AddButton from './controls/addButton'
import OkButton from './controls/okButton'
import CancelButton from './controls/cancelButton'


import * as actions from '../actions/actions'

import Item from './item'

export class Category extends Component {

    render() {

        const {id, items, adding, newItemName} = this.props;


        const allItems = items && items.size && items.size > 0 ? (items.map(
            function (item) {
                return <li key={id}>
                    <Item categoryId={id}
                          name={item.name}
                          have={item.have}/>
                </li>
            }
        )) : "";


        const newOrSave = (adding) ?
            <span className="input-group">
                <input className="form-control col-md-10"
                       type="text"
                       value={newItemName}
                       onChange={this.props.storeNewItemName.bind(this, id)}
                />
                <span className="input-group-btn">
                    <OkButton onClick={this.props.addItem.bind(this, newItemName)}/>
                    <CancelButton onClick={this.props.cancelAddingItem}/>
                </span>
            </span>
            :
            <AddButton onClick={this.props.startAddingItem.bind(this, id)}/>;

        return <span>
                <div>{this.props.name}
                    <RemoveButton onClick={this.props.removeCategory.bind(this, id)}/>
                    <EditButton onClick={this.props.editCategory.bind(this, id)}/>
                </div>
            <ul>
                {
                    allItems
                }
                <li>
                    {newOrSave}
                </li>
            </ul>
            </span>
    }
}

function mapStateToProps(state, ownProps) {

    return {
        items: state.categories.get(ownProps.id)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeCategory: function (id) {
            dispatch(actions.removeCategory(id))
        },
        editCategory: function () {
            console.log("editCategory")
        },
        startAddingItem: function (categoryId) {
            dispatch(actions.startAddingItem(categoryId))
        },
        cancelAddingItem: function (categoryId) {
            dispatch(actions.cancelAddingItem(categoryId))
        },
        storeNewItemName: (id, event) => {
            dispatch(actions.storeNewItemName(id, event.target.value))
        },
        addItem: () => {
            console.log("addItem")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);