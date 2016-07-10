
import { expect } from 'chai';
import * as actions from "../../src/constants/actionTypes"
import categories from "../../src/reducers/categories"

describe('Categories Reducer', () => {


    it('Should allow adding category', () => {
        let result = categories({}, {
            type: actions.ADD_CATEGORY,
            name: "New category"
        });

        expect(result.categories.size).to.equal(1);
        expect(result.categories.get(0).name).to.equal("New category");
    });

    it('Should not allow empty category names', () => {
        let result = categories({}, {
            type: actions.ADD_CATEGORY,
            name: "    "
        });

        expect(result.categories.size).to.equal(0);
    });

    it('Should not allow duplicate category names', () => {
        let result = categories({}, {
            type: actions.ADD_CATEGORY,
            name: "New category"
        });

        result = categories(result, {
            type: actions.ADD_CATEGORY,
            name: "new category"
        });

        expect(result.categories.size).to.equal(1);
        expect(result.categories.get(0).name).to.equal("New category");
    });
});