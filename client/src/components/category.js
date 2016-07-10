import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import RemoveButton from './controls/removeButton'
import EditButton from './controls/editButton'
import AddButton from './controls/addButton'

import * as actions from '../actions/actions'

import Item from './item'

export class Category extends Component {

    render() {
        const {items} = this.props;

        const categoryName = this.props.name;


        const allItems = items && items.size && items.size > 0 ? (items.map(
            function(item) {
                return <li key = {item.name}>
                    <Item categoryName = {categoryName}
                          name = {item.name}
                          have = {item.have} />
                </li>
            }
        )) : "";

        return <span>
                <div>{categoryName}
                    <RemoveButton onClick={this.props.removeCategory.bind(this, categoryName)}/>
                    <EditButton onClick={this.props.editCategory}/>
                </div>
            <ul>
                {
                    allItems
                }
                <li>
                    {
                        (1 == 1) ?
                            <AddButton onClick = {this.props.startAddingItem} />
                            :
                            <AddButton onClick = {this.props.startAddingItem} />
                    }
                </li>
            </ul>
            </span>
    }
}

function mapStateToProps(state, ownProps) {

    const categories = state.categories;
    for (let i = 0; i < categories.size; i++) {

        if (ownProps.name === categories.get(i).name) {
            const items = categories.get(i).items;
            return {
                items: items
            }
        }
    }

    return {
        items: []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeCategory: function(name) {
            console.log("removeCategory");
            dispatch(actions.deleteCategory(name))
        },
        editCategory: function() {
            console.log("editCategory")
        },
        startAddingItem: function() {
            console.log("startAddingItem")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);