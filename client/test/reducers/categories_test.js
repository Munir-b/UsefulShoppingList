
import { expect } from 'chai';
import * as actions from "../../src/constants/actionTypes"
import categories from "../../src/reducers/categories"

import {OrderedMap} from "immutable"

describe('Categories Reducer', () => {


    it('Should allow adding category', () => {
        let result = categories({categories: OrderedMap()}, {
            type: actions.ADD_CATEGORY,
            name: "New category"
        });

        expect(result.categories.size).to.equal(1);
        expect(result.categories.first().name).to.equal("New category");
    });

    it('Should not allow empty category names', () => {
        let result = categories({categories: OrderedMap()}, {
            type: actions.ADD_CATEGORY,
            name: "    "
        });

        expect(result.categories.size).to.equal(0);
    });

    it('Should not allow null category names', () => {
        let result = categories({categories: OrderedMap()}, {
            type: actions.ADD_CATEGORY,
            name: null
        });

        expect(result.categories.size).to.equal(0);
    });

    it('Should not allow undefined category names', () => {
        let result = categories({categories: OrderedMap()}, {
            type: actions.ADD_CATEGORY
        });

        expect(result.categories.size).to.equal(0);
    });

    it('Should not allow duplicate category names', () => {
        let result = categories({categories: OrderedMap()}, {
            type: actions.ADD_CATEGORY,
            name: "New category"
        });

        result = categories(result, {
            type: actions.ADD_CATEGORY,
            name: "new category"
        });

        expect(result.categories.size).to.equal(1);
        expect(result.categories.first().name).to.equal("New category");
    });
});