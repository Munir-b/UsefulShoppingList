import * as types from '../constants/actionTypes';

export function addCategory(name) {
    return {
        type: types.ADD_CATEGORY,
        name
    };
}

export function storeNewCategoryName(name) {
    return {
        type: types.STORE_NEW_CATEGORY_NAME,
        name
    }
}

export function deleteCategory(name) {
    return {
        type: types.REMOVE_CATEGORY,
        name
    };
}

export function toggleItem(categoryName, itemName) {

    return {
        type: types.TOGGLE_ITEM,
        categoryName,
        itemName
    }
}