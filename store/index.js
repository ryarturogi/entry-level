import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

// Initial states here
const initialState = {};

// Middleware
const middleware = [thunk];

// Creating store
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
