import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import { List, OrderedMap } from "immutable"


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
        let initialStore = {
            categories: OrderedMap({
                "dummy": {
                    id: "Dummy".toLowerCase(),
                    name: "Dummy",
                    items: OrderedMap({
                        "some_item": {
                            id: 1,
                            name: "Some item",
                            have: false
                        },
                        "other_item": {
                            id: 2,
                            name: "Other item",
                            have: true
                        }
                    })
                }
            }),
            newCategoryName: "new category"
        };
        // Mock store
        let store = createStore((function mockInitialStore(initialStore) {
            let i = 0;
            return function (...args) {

                if (i++ == 0) {
                    return reducer(initialStore, ...args)
                }
                else {
                    return reducer(...args)
                }
            }
        }(initialStore)));


        let wrapper = mount(<Provider store={store}>
            <Item name = {"Some item"} have = {false} />
        </Provider>);

        let firstCategory = store.getState().categories.get("dummy");
        let firstItem = firstCategory.items.first();
        let lastItem = firstCategory.items.last();
        expect(firstItem.name).to.equal("Some item");
        expect(firstItem.have).to.equal(false);
        expect(lastItem.name).to.equal("Other item");
        expect(lastItem.have).to.equal(true);

        wrapper.find("Item").props().toggleItem("dummy", "some_item");

        firstItem = firstCategory.items.first();
        lastItem = firstCategory.items.last();

        expect(firstItem.name).to.equal("Other item");
        expect(firstItem.have).to.equal(true);
        expect(lastItem.name).to.equal("Some item");
        expect(lastItem.have).to.equal(true);

    });

});