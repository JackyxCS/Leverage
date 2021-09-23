import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import apiReducer from './key';
import session from './session'
import searchReducer from './stocks';
import transactionsReducer from './transactions';
import transfersReducer from './transfer';

const rootReducer = combineReducers({
  session,
  key: apiReducer,
  transfers: transfersReducer,
  search: searchReducer,
  transactions: transactionsReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
