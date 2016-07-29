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

export function storeNewItemName(categoryId, name) {
    return {
        type: types.STORE_NEW_ITEM_NAME,
        categoryId, name
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

export function startEditingCategory(id) {
    return {
        type: types.START_EDITING_CATEGORY,
        id
    }
}

export function startAddingItem(id) {
    return {
        type: types.START_ADDING_ITEM,
        id
    }
}

export function addItem(categoryId, name) {
    return {
        type: types.ADD_ITEM,
        categoryId, name
    }
}

export function cancelAddingItem(id) {
    return {
        type: types.CANCEL_ADDING_ITEM,
        id
    }
}

export function cancelEditingCategory() {
    return {
        type: types.CANCEL_EDITING_CATEGORY
    }
}

export function storeCategoryName(id, name) {
    return {
        type: types.STORE_CATEGORY_NAME,
        id, name
    }
}

export function saveCategoryName(id, name) {
    return {
        type: types.SAVE_CATEGORY_NAME,
        id, name
    }
}

export function removeItem(categoryId, id) {
    return {
        type: types.REMOVE_ITEM,
        categoryId, id
    }
}

export function toggleItem(categoryId, id) {

    return {
        type: types.TOGGLE_ITEM,
        categoryId,
        id
    }
}

export function cancelEditingItem(categoryId, id) {
    return {
        type: types.CANCEL_EDITING_ITEM,
        categoryId,
        id
    }
}

export function storeItemName(categoryId, id, name) {
    return {
        type: types.STORE_ITEM_NAME,
        categoryId,
        id,
        name
    }
}

export function saveItemName(categoryId, id, name) {
    return {
        type: types.SAVE_ITEM_NAME,
        categoryId, id, name
    }
}

export function startEditingItem(categoryId, id) {
    return {
        type: types.START_EDITING_ITEM,
        categoryId, id
    }
}