import { connectRoutes } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHashHistory from 'history/createHashHistory';

import reducers from './index';
import options from '../routings/options';
import routesMap from '../routings/routesMap';

const { reducer, middleware, enhancer } = connectRoutes(routesMap, { ...options, createHistory: createHashHistory });

const rootReducer = combineReducers({ location: reducer, ...reducers });
const middlewares = applyMiddleware(thunk, middleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(enhancer, middlewares));

export default store;