/*import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { thunk } from 'redux-thunk';
import { bikesReducer } from './reducers/bikesReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  bikesReducer,
  alertsReducer,
  bookingsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;*/





import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk, withExtraArgument } from 'redux-thunk';

import logger from 'redux-logger'; // Import the logger middleware

import { bikesReducer } from './reducers/bikesReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';

const rootReducer = combineReducers({
  bikesReducer,
  alertsReducer,
  bookingsReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger) // Apply the logger middleware
);

export default store;
