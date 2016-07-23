import { createStore, compose } from 'redux';

import reducer from "../src/reducers/categories"

/**
 *
 * @param initialStore
 * @returns {*}
 */
export function getMockStore(initialStore) {
    return createStore((function mockInitialStore(initialStore) {
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
}