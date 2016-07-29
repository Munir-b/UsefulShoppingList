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


    return {
        ...state,
        categories: categories.delete(id)
    };
}


function toggleItem(state, categories, categoryId, itemId) {

    let category = state.categories.get(categoryId);

    if (category) {
        let item = category.items.get(itemId);

        if (item) {
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
        category.editing = false;
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

function startEditingCategory(state, categoryId) {

    return {
        ...state,
        categories: state.categories.map((category) => {

            if (category.id === categoryId) {
                category.editing = true;
                category.temporaryName = category.name;
            }
            else {
                category.editing = false;
            }

            return category
        })
    }
}

function cancelEditingItem(state, categoryId, id) {
    console.log("cancelEditingItem")
    let categories = state.categories;

    let category = categories.get(categoryId);

    if (category) {
        let item = category.items.get(id);

        if (item) {
            item.editing = false;

            category.items = category.items.set(id, item);
            categories = categories.set(categoryId, category);
        }
        else {
            console.log("No such item", id)
        }
    }
    else {
        console.log("No such category", categoryId)
    }

    return {
        ...state,
        currentlyEditing: {},
        categories: categories
    }
}


function startEditingItem(state, categoryId, id) {
    let categories = state.categories;

    let category = categories.get(categoryId);

    if (category) {
        let item = category.items.get(id);

        if (item) {
            item.editing = true;
            item.temporaryName = item.name;
            category.items = category.items.set(id, item);
            categories = categories.set(categoryId, category);
        }
        else {
            console.warn("No such item", id)
        }
    }
    else {
        console.warn("No such category", categoryId)
    }

    return {
        ...state,
        currentlyEditing: {categoryId, id},
        categories: categories
    }
}

function cancelEditingCategory(state) {
    return {
        ...state,
        adding: false,
        categories: collapseCategoriesEditing(state)
    }
}

function storeCategoryName(state, categoryId, name) {
    return {
        ...state,
        categories: state.categories.map((category) => {

            if (category.id === categoryId) {
                category.temporaryName = name;
            }
            return category
        })
    }
}

function storeItemName(state, categoryId, id, name) {
    let categories = state.categories;
    let category = categories.get(categoryId);

    if (category) {
        let item = category.items.get(id);
        if (item) {
            item.temporaryName = name;
            category.items = category.items.set(id, item);
            categories = categories.set(categoryId, category);
        }
        else {
            console.log("Item not found", id);
        }
    }
    else {
        console.log("Category not found", categoryId);
    }
    return {
        ...state,
        categories: categories
    }
}

function saveItemName(state, categoryId, id, name) {
    let categories = state.categories;
    let category = categories.get(categoryId);

    if (category) {
        let item = category.items.get(id);
        if (item) {
            item.name = name;
            item.temporaryName = "";
            item.editing = false;
            category.items = category.items.set(id, item);
            categories = categories.set(categoryId, category);
        }
        else {
            console.log("Item not found", id);
        }
    }
    else {
        console.log("Category not found", categoryId);
    }
    return {
        ...state,
        currentlyEditing: {},
        categories: categories
    }
}



function storeNewItemName(state, categoryId, name) {
    return {
        ...state,
        categories: state.categories.map((category) => {

            if (category.id === categoryId) {
                category.newItemName = name;
            }
            return category
        })
    }
}


function saveCategoryName(state, categoryId, name) {
    return {
        ...state,
        categories: state.categories.map((category) => {

            if (category.id === categoryId) {
                category.name = name;
                category.editing = false;
            }
            return category
        })
    }
}

function removeItem(state, categoryId, id) {

    return {
        ...state,
        categories: state.categories.map((category) => {
            if (category.id === categoryId) {
                category.items = category.items.delete(id)
            }

            return category
        })
    }
}

function addItem(state, categoryId, itemName) {

    function add(category, itemName) {
        const itemId = itemName.trim().replace(SPACE, UNDERSCORE).toLowerCase();
        if (itemId === EMPTY) {
            console.warn("addItem", "Invalid item id", itemId);
        }
        else if (category.items.get(itemId)) {
            console.warn("addItem", "Item id already exists", itemId);
        }
        else {
            category.items = category.items.set(itemId, {
                id: itemId,
                name: itemName
            });
            category.newItemName = EMPTY;
            category.adding = false;
        }
    }

    return {
        ...state,
        categories: state.categories.map((category) => {
            if (category.id === categoryId) {
                add(category, itemName);
            }

            return category
        })
    }
}

export default function categories(state = initialState, action = {type: ""}) {

    switch (action.type) {

        case types.ADD_CATEGORY:
            return addCategory(state, state.categories, action.name);
        case types.STORE_NEW_CATEGORY_NAME:
            return {
                ...state,
                newCategoryName: action.name
            };
        case types.REMOVE_CATEGORY:
            return removeCategory(state, state.categories, action.id);
        case types.TOGGLE_ITEM:
            return toggleItem(state, state.categories, action.categoryId, action.id);
        case types.START_ADDING_CATEGORY:
            return startAddingCategory(state);
        case types.CANCEL_ADDING_CATEGORY:
            return cancelAddingCategory(state);
        case types.START_ADDING_ITEM:
            return startAddingItem(state, state.categories, action.id);
        case types.CANCEL_ADDING_ITEM:
            return cancelAddingItem(state, state.categories);
        case types.START_EDITING_CATEGORY:
            return startEditingCategory(state, action.id);
        case types.CANCEL_EDITING_CATEGORY:
            return cancelEditingCategory(state);
        case types.STORE_CATEGORY_NAME:
            return storeCategoryName(state, action.id, action.name);
        case types.SAVE_CATEGORY_NAME:
            return saveCategoryName(state, action.id, action.name);
        case types.REMOVE_ITEM:
            return removeItem(state, action.categoryId, action.id);
        case types.ADD_ITEM:
            return addItem(state, action.categoryId, action.name);
        case types.STORE_NEW_ITEM_NAME:
            return storeNewItemName(state, action.categoryId, action.name);
        case types.STORE_ITEM_NAME:
            return storeItemName(state, action.categoryId, action.id, action.name);
        case types.CANCEL_EDITING_ITEM:
            return cancelEditingItem(state, action.categoryId, action.id);
        case types.SAVE_ITEM_NAME:
            return saveItemName(state, action.categoryId, action.id, action.name);
        case types.START_EDITING_ITEM:
            return startEditingItem(state, action.categoryId, action.id)
        default:
            return state;
    }
}