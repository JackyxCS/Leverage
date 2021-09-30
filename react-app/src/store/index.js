import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentsReducer from './comments';
import friendRequestReducer from './friendrequests';
import friendRequestFromReducer from './friendrequestsfrom';
import friendsReducer from './friends';
import apiReducer from './key';
import ownedStockReducer from './ownedstocks';
import session from './session'
import searchReducer from './stocks';
import transactionsReducer from './transactions';
import transfersReducer from './transfer';
import usersReducer from './users';
import watchlistsReducer from './watchlists';
import watchliststocksReducer from './watchliststocks';

const rootReducer = combineReducers({
  session,
  key: apiReducer,
  transfers: transfersReducer,
  search: searchReducer,
  transactions: transactionsReducer,
  owned: ownedStockReducer, 
  lists: watchlistsReducer,
  stocks: watchliststocksReducer,
  friends: friendsReducer,
  friendrequests: friendRequestReducer,
  friendrequestsfrom: friendRequestFromReducer,
  users: usersReducer,
  comments: commentsReducer,
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
