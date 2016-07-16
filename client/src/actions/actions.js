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

export function storeNewItemName(name) {
    return {
        type: types.STORE_NEW_ITEM_NAME,
        name
    }
}

export function removeCategory(id) {
    return {
        type: types.REMOVE_CATEGORY,
        id
    };
}

export function startAddingCategory() {
    return {
        type: types.START_ADDING_CATEGORY
    }
}

export function cancelAddingCategory() {
    return {
        type: types.CANCEL_ADDING_CATEGORY
    }
}


export function startAddingItem(id) {
    return {
        type: types.START_ADDING_ITEM,
        id
    }
}

export function cancelAddingItem(id) {
    return {
        type: types.CANCEL_ADDING_ITEM,
        id
    }
}

export function toggleItem(categoryName, itemName) {

    return {
        type: types.TOGGLE_ITEM,
        categoryName,
        itemName
    }
}