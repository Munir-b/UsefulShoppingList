import * as types from "../constants/actionTypes";
import {List} from "immutable";
import {initialState} from "../constants/initialState"



function isUnique(categories = List.of(), name = "") {

    const newName = name.toLowerCase();
    for (let i = 0; i < categories.size; i++) {
        let categoryName = categories.get(i).name;

        if (categoryName.toLowerCase() === newName) {
            return false;
        }
    }

    return true;
}

const EMPTY = "";

function addCategory(state, categories = List.of(), name) {

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

        categories = categories.push({
            id: newName.toLowerCase(),
            name: newName,
            items: []
        })
    }

    return {
        ...state,
        categories,
        newCategoryName
    };
}

function removeCategory(state, categories, name) {


    for (let i = 0; i < categories.size; i++) {

        if (categories.get(i).name === name) {
            categories = categories.delete(i);
            break;
        }
    }

    return {
        ...state,
        categories
    };
}


function getCategoryWithIndex(categories = List.of(), categoryName = "") {

    categoryName = categoryName.trim().toLowerCase();

    for (let i = 0; i < categories.size; i++) {
        let currentCategoryName = categories.get(i).name.toLowerCase();

        if (currentCategoryName === categoryName) {
            return {category: categories.get(i), index: i};
        }
    }

    return {category: null, index: -1};
}

function getItemWithIndex(items = List.of(), itemName = "") {

    itemName = itemName.trim().toLowerCase();
    for (let i = 0; i < items.size; i++) {
        let currentItemName = items.get(i).name.toLowerCase();

        if (currentItemName === itemName) {
            return {item: items.get(i), index: i};
        }
    }

    return {item: null, index: -1};
}



function toggleItem(state, categories, categoryName, itemName) {

    let categoryWithIndex = getCategoryWithIndex(categories, categoryName);

    if (categoryWithIndex.index >= 0) {
        let itemWithIndex = getItemWithIndex(categoryWithIndex.category.items, itemName);

        if (itemWithIndex.index >= 0) {

            itemWithIndex.item.have = !itemWithIndex.item.have;

            categoryWithIndex.category.items = categoryWithIndex.category.items.delete(itemWithIndex.index).push(itemWithIndex.item);

            categories = categories.delete(categoryWithIndex.index).push(categoryWithIndex.category);

            console.log(categories.get(0))
        }
        else {
            console.log("Item not found: ", itemName);
        }
    }
    else {
        console.log("Category not found: ", categoryName);
    }

    return {
        ...state,
        categories: categories
    }
}

export default function categories(state = initialState, action = {type:""}) {

    switch (action.type) {

        case types.ADD_CATEGORY:
            return addCategory(state, state.categories, action.name);
        case types.STORE_NEW_CATEGORY_NAME:
            return {
                ...state,
                newCategoryName: action.name
            };
        case types.REMOVE_CATEGORY:
            return removeCategory(state, state.categories, action.name);
        case types.TOGGLE_ITEM:
            return toggleItem(state, state.categories, action.categoryName, action.itemName);
        default:
            return state;
    }
}