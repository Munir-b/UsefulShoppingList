import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import { List, OrderedMap } from "immutable"


import ShoppingList from '../../src/components/shoppingList'
import { expect } from 'chai';

import reducer from "../../src/reducers/categories"

import { createStore, compose } from 'redux';
const store = createStore(reducer);

describe('Shopping List', () => {

    it("Should open editing when adding new category", () => {
        const wrapper = mount(<Provider store={store}>
            <ShoppingList />
        </Provider>);

        wrapper.find("ShoppingList").props().startAdding();

        expect(wrapper.find("OkButton").length).to.equal(1);
        expect(wrapper.find("CancelButton").length).to.equal(1);
        expect(wrapper.find("input[type='text']").length).to.equal(1);
    });

    it("Should save new category", () => {
        const wrapper = mount(<Provider store={store}>
            <ShoppingList />
        </Provider>);

        let count = wrapper.find("Category").length;

        wrapper.find("ShoppingList").props().addCategory("New Category");

        expect(wrapper.find("Category").length).to.equal(count + 1);
    });

    it("Should close editing after category was added", () => {
        const wrapper = mount(<Provider store={store}>
            <ShoppingList />
        </Provider>);

        wrapper.find("ShoppingList").props().startAdding();
        expect(wrapper.find("OkButton").length).to.equal(1);
        wrapper.find("ShoppingList").props().addCategory("New Category");

        expect(wrapper.find("OkButton").length).to.equal(0);
    });
});