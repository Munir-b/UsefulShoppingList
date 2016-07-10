import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import { List } from "immutable"


import Item from '../../src/components/item'
import { expect } from 'chai';

import reducer from "../../src/reducers/categories"

import { createStore, compose } from 'redux';
const store = createStore(reducer);

describe('Item', () => {

    it('Have=true checks the checkbox', () => {
        const wrapper = render(<Provider store={store}>
            <Item name = {"Some name"} have = {true} />
        </Provider>);

        expect(wrapper.find("input[type='checkbox']").length).to.equal(1);
        expect(wrapper.find("input[type='checkbox']").is(":checked")).to.equal(true);
    });

    it('Have=false unchecks the checkbox', () => {
        const wrapper = render(<Provider store={store}>
            <Item name = {"Some name"} have = {false} />
        </Provider>);

        expect(wrapper.find("input[type='checkbox']").length).to.equal(1);
        expect(wrapper.find("input[type='checkbox']").is(":checked")).to.equal(false);
    });

    it('Checking unchecked item should put it at the bottom', () => {
        let wrapper = mount(<Provider store={store}>
            <Item name = {"Some item"} have = {false} />
        </Provider>);

        expect(store.getState().categories.get(0).items.get(0).name).to.equal("Some item");
        expect(store.getState().categories.get(0).items.get(0).have).to.equal(false);
        expect(store.getState().categories.get(0).items.get(1).name).to.equal("Other item");
        expect(store.getState().categories.get(0).items.get(1).have).to.equal(true);

        wrapper.find("Item").props().toggleItem("dummy", "Some item" );

        expect(store.getState().categories.get(0).items.get(0).name).to.equal("Other item");
        expect(store.getState().categories.get(0).items.get(0).have).to.equal(true);
        expect(store.getState().categories.get(0).items.get(-1).name).to.equal("Some item");
        expect(store.getState().categories.get(0).items.get(-1).have).to.equal(true);

    });

});