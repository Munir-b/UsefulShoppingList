import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import { List, OrderedMap } from "immutable"


import Category from '../../src/components/category'
import { expect } from 'chai';

import reducer from "../../src/reducers/categories"

import { createStore, compose } from 'redux';
import * as TestUtils from "../test_utils"


describe('Category', () => {

    const categoryId = "dummy";
    const defaultInitialStore = {
        categories: OrderedMap({
            [categoryId]: {
                id: categoryId,
                name: "Dummy",
                items: OrderedMap()
            }
        })
    };

    it('Should render', () => {
        let store = TestUtils.getMockStore(defaultInitialStore);
        const wrapper = render(<Provider store={store}>
            <Category id={"dummy"} name={"Dummy"}/>
        </Provider>);
    });

    it("Should have a delete button", () => {

        let store = TestUtils.getMockStore(defaultInitialStore);
        const wrapper = render(<Provider store={store}>
            <Category id={categoryId} name={"Dummy"}/>
        </Provider>);

        expect(wrapper.find(".glyphicon-remove").length).to.equal(1);

    });

    it("Should allow removing category", () => {
        let store = TestUtils.getMockStore(defaultInitialStore);
        const wrapper = mount(<Provider store={store}>
            <Category id={categoryId} name={"Dummy"}/>
        </Provider>);

        expect(store.getState().categories.get(categoryId).name).to.equal("Dummy");

        wrapper.find("Category").props().removeCategory(categoryId);

        expect(store.getState().categories.get(categoryId)).to.be.undefined;
    });

    it("Should allow adding item", () => {
        let store = TestUtils.getMockStore(defaultInitialStore);
        const wrapper = mount(<Provider store={store}>
            <Category id={categoryId} name={"Dummy"}/>
        </Provider>);

        const categories = store.getState().categories;
        expect(categories.get(categoryId).items.size).to.equal(0);

        wrapper.find("Category").props().addItem(categoryId, "Dummy item");

        expect(categories.get(categoryId).items.size).to.equal(1);
    });

    it("Should clear new item name after adding item", () => {
        let store = TestUtils.getMockStore({
            categories: OrderedMap({
                [categoryId]: {
                    id: categoryId,
                    name: "Dummy",
                    items: OrderedMap()
                }
            })
        });
        const wrapper = mount(<Provider store={store}>
            <Category id={categoryId} name={"Dummy"}/>
        </Provider>);

        const categories = store.getState().categories;
        expect(categories.get(categoryId).newItemName).to.be.empty;

        const categoryProps = wrapper.find("Category").props();
        categoryProps.storeNewItemName(categoryId, {target: {value: "Dummy item"}});
        expect(categories.get(categoryId).newItemName).to.equal("Dummy item");
        categoryProps.addItem(categoryId, categories.get(categoryId).newItemName);

        expect(categories.get(categoryId).newItemName).to.equal("");
    });

    it("Should close new item name after adding item", () => {
        let store = TestUtils.getMockStore({
            categories: OrderedMap({
                [categoryId]: {
                    id: categoryId,
                    name: "Dummy",
                    items: OrderedMap()
                }
            })
        });
        const wrapper = mount(<Provider store={store}>
            <Category id={categoryId} name={"Dummy"}/>
        </Provider>);

        expect(wrapper.find("InputWithOkCancel").length).to.equal(0);
        expect(wrapper.find("AddButton").length).to.equal(1);

        wrapper.find("Category").props().startAddingItem(categoryId);

        expect(store.getState().categories.get(categoryId).adding).to.be.true;
        expect(wrapper.find("InputWithOkCancel").length).to.equal(1);
        expect(wrapper.find("AddButton").length).to.equal(0);

        wrapper.find("Category").props().addItem(categoryId, "Dummy item");

        console.log(store.getState().categories.get(categoryId).adding);
        expect(wrapper.find("InputWithOkCancel").length).to.equal(0);
        expect(wrapper.find("AddButton").length).to.equal(1);
    });


    it("Should block adding item with empty name", () => {
        let store = TestUtils.getMockStore({
            categories: OrderedMap({
                [categoryId]: {
                    id: categoryId,
                    name: "Dummy",
                    items: OrderedMap()
                }
            })
        });

        const wrapper = mount(<Provider store={store}>
            <Category id={categoryId} name={"Dummy"}/>
        </Provider>);

        const categories = store.getState().categories;
        expect(categories.get("dummy").items.size).to.equal(0);

        wrapper.find("Category").props().addItem(categoryId, "  ");

        expect(categories.get("dummy").items.size).to.equal(0);
    });

    it("Should block adding item with same name", () => {
        let store = TestUtils.getMockStore(defaultInitialStore);

        const wrapper = mount(<Provider store={store}>
            <Category id={categoryId} name={"Dummy"}/>
        </Provider>);
        const categoryProps = wrapper.find("Category").props();
        const categories = store.getState().categories;

        categoryProps.addItem(categoryId, "Dummy item");
        expect(categories.get(categoryId).items.size).to.equal(1);
        categoryProps.addItem(categoryId, "dummy Item");
        expect(categories.get(categoryId).items.size).to.equal(1);
    });

});