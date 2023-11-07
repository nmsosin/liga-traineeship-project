import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from '../reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger));
export const store = createStore(rootReducer, enhancer);
