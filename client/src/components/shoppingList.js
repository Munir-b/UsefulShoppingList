import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddButton from './controls/addButton'
import Category from './category'
import * as actions from '../actions/actions'
import OkButton from './controls/okButton'
import CancelButton from './controls/cancelButton'

export default class ShoppingList extends Component {


    render() {

        const {categories, newCategoryName, adding} = this.props;

        const newOrSave = (adding) ?
            <span>
                <input className="form-control col-md-10"
                       type="text"
                       value={newCategoryName}
                       onChange={this.props.storeNewCategoryName.bind(this)}
                />
                <OkButton onClick={this.props.addCategory.bind(this, newCategoryName)}/>
                <CancelButton onClick={this.props.cancelAdding}/>
            </span>
            :
            <AddButton className="form-control col-md-2" onClick={this.props.startAdding}/>;

        const newCategory = <li>
            <h2>
                    <span>
                        {newOrSave}
                    </span>
            </h2>
        </li>;

        const allCategories = (categories && categories.size && categories.size > 0) ?
            categories.map(function (category) {
                return <li key={category.id}>
                    <Category
                        id={category.id}
                        adding={category.adding}
                        name={category.name}/>
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