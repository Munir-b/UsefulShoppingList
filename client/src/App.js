import React, { Component } from 'react';

import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import categoriesReducer from './reducers/categories';

import { createStore, compose } from 'redux';

import ShoppingList from './components/shoppingList'

import {List} from "immutable";

const store = createStore(categoriesReducer);
//const store = createStore(categoriesReducer);

export default class App extends Component {
  render() {
    return (
        <div>
          <Provider store={store}>
            <ShoppingList />
          </Provider>
        </div>
    );
  }
}
