import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from 'src/services/reducers/store';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));
export const store = createStore(rootReducer, enhancer);
