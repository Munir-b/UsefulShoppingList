import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddButton from './controls/addButton'
import Category from './category'
import * as actions from '../actions/actions'
import InputWithOkCancel from './controls/InputWithOkCancel'

export default class ShoppingList extends Component {


    render() {

        const {categories, newCategoryName, adding} = this.props;

        const newOrSave = (adding) ?
            <InputWithOkCancel newItemName={newCategoryName}
                               onOk={this.props.addCategory.bind(this, newCategoryName)}
                               onCancel={this.props.cancelAdding}
                               onChange={this.props.storeNewCategoryName.bind(this)}/>
            :
            <AddButton className="form-control col-md-2" onClick={this.props.startAdding}/>;


        const allCategories = (categories && categories.size && categories.size > 0) ?
            categories.valueSeq().map((category) => {
                return <li key={category.id}>
                    <Category
                        id={category.id}
                        name={category.name}/>
                </li>
            }) : "";

        return <ul>
            {
                allCategories
            }
            <li>{newOrSave}</li>
        </ul>
    }
}


function mapStateToProps(state, ownProps) {


    return {
        ...state
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addCategory: (name)=> {
            dispatch(actions.addCategory(name))
        },
        storeNewCategoryName: (event) => {
            dispatch(actions.storeNewCategoryName(event.target.value))
        },
        startAdding: () => {
            dispatch(actions.startAddingCategory())
        },
        cancelAdding: function () {
            dispatch(actions.cancelAddingCategory())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);