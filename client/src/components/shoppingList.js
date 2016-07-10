import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddButton from './controls/addButton'
import Category from './category'
import * as actions from '../actions/actions'

export default class ShoppingList extends Component {



    render() {

        const {categories} = this.props;

        const newCategory = <li>
            <h2>
                    <span >
                        <input className="form-control col-md-10"
                               type = "text"
                               value = {this.props.newCategoryName}
                               onChange = {this.props.storeNewCategoryName.bind(this)}
                        />
                        <AddButton onClick = {this.props.addCategory.bind(this, this.props.newCategoryName)} />
                    </span>
            </h2>
        </li>;

        const allCategories = (categories && categories.size && categories.size > 0) ?
            categories.map(function(category) {
            return <li key = {category.name}>
                <Category
                    name = {category.name}/>
            </li>
        }) : "";

        return <ul>
            {
                allCategories
            }
            {newCategory}
            </ul>
    }
}


function mapStateToProps(state, ownProps) {

    console.log("State", state);
    const {categories, newCategoryName} = state;


    return {
        categories, newCategoryName
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addCategory: (name)=> {
            dispatch(actions.addCategory(name))
        },
        storeNewCategoryName: function (event) {
            dispatch(actions.storeNewCategoryName(event.target.value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);