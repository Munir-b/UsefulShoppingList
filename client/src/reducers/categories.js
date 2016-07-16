import * as types from "../constants/actionTypes";
import {List, OrderedMap} from "immutable";
import {initialState} from "../constants/initialState"


function isUnique(categories, name = "") {

    return categories.filter((category) => {
            return category.name.toLowerCase() === name.toLowerCase()
        }).size === 0;
}

const EMPTY = "";
const SPACE = " ";
const UNDERSCORE = "_";

function addCategory(state, categories, name) {

    if (name) {
        var newName = name.trim();
        var newCategoryName = EMPTY;

        if (newName === EMPTY) {
            console.warn("Category name cannot be empty");
        }
        else if (!isUnique(categories, newName)) {
            console.warn("Category already exists: " + newName);
            newCategoryName = newName;
        }
        else {

            const id = newName.toLowerCase().replace(SPACE, UNDERSCORE);
            categories = categories.set(id, {
                id: id,
                name: newName,
                items: OrderedMap()
            })
        }
    }
    else {
        console.warn("Empty category name", name);
    }


    return {
        ...state,
        adding: false,
        categories,
        newCategoryName
    };
}

function removeCategory(state, categories, id) {

    console.log("Removing category", id);

    return {
        ...state,
        categories: categories.delete(id)
    };
}


function toggleItem(state, categories, categoryId, itemId) {

    let category = state.categories.get(categoryId);

    if (category) {
        let item = category.items.get(itemId);

        if (itemId) {
            item.have = !item.have;

            category.items = category.items.delete(itemId).set(itemId, item);

            categories = categories.delete(categoryId).set(categoryId, category);
        }
        else {
            console.warn("No item: " + itemId);
        }
    }
    else {
        console.warn("No category: " + categoryId);
    }

    return {
        ...state,
        categories: categories
    }
}

function startAddingItem(state, categories, categoryId) {


    return {
        ...state,
        adding: false,
        categories: categories.map((category) => {

            category.adding = category.id === categoryId;
            return category
        })
    }
}

function cancelAddingItem(state) {


    return {
        ...state,
        categories: collapseCategoriesEditing(state)
    }
}

function cancelAddingCategory(state) {
    return {
        ...state,
        adding: false,
        categories: collapseCategoriesEditing(state)
    }
}

function collapseCategoriesEditing(state) {
    return state.categories.map((category) => {
        category.adding = false;
        return category
    })
}

function startAddingCategory(state) {
    return {
        ...state,
        adding: true,
        categories: collapseCategoriesEditing(state)
    }
}

export default function categories(state = initialState, action) {

    switch (action.type) {

        case types.ADD_CATEGORY:
            return addCategory(state, state.categories, action.name);
        case types.STORE_NEW_CATEGORY_NAME:
            return {
                ...state,
                adding: false,
                newCategoryName: action.name
            };
        case types.REMOVE_CATEGORY:
            return removeCategory(state, state.categories, action.id);
        case types.TOGGLE_ITEM:
            return toggleItem(state, state.categories, action.categoryName, action.itemName);
        case types.START_ADDING_CATEGORY:
            return startAddingCategory(state);
        case types.CANCEL_ADDING_CATEGORY:
            return cancelAddingCategory(state);
        case types.START_ADDING_ITEM:
            return startAddingItem(state, state.categories, action.id);
        case types.CANCEL_ADDING_ITEM:
            return cancelAddingItem(state, state.categories);
        default:
            return state;
    }
}