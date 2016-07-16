import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import { List, OrderedMap } from "immutable"


import Category from '../../src/components/category'
import { expect } from 'chai';

import reducer from "../../src/reducers/categories"

import { createStore, compose } from 'redux';
const store = createStore(reducer);

describe('Category', () => {

    it('Should render', () => {
        const wrapper = render(<Provider store={store}>
            <Category name={"Some name"}/>
        </Provider>);
    });

    it("Should have a delete button", () => {
        const wrapper = render(<Provider store={store}>
            <Category name={"Some name"}/>
        </Provider>);

        expect(wrapper.find(".glyphicon-remove").length).to.equal(1);

    });

    it("Should allow removing category", () => {
        const wrapper = mount(<Provider store={store}>
            <Category name={"Dummy"}/>
        </Provider>);

        expect(store.getState().categories.get("dummy").name).to.equal("Dummy");

        wrapper.find("Category").props().removeCategory("dummy");

        expect(store.getState().categories.get("dummy")).to.be.undefined;
    });

});