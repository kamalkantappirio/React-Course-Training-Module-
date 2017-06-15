import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

/**
 * hot swap root reducer
 */
const handleHotModule = (store) => {
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
};

export default (initialState) => {
  const enhancers = compose(
    baselineMiddleware()
  );

  const store = createStore(rootReducer,
    initialState,
    enhancers
  );

  handleHotModule(store);
  return store;
}

function baselineMiddleware() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const router = routerMiddleware(history);

  if (process.env.REDUX_LOGGING_ENABLED === 'false') {
    return applyMiddleware(thunkMiddleware, router);
  }

  return composeEnhancers(applyMiddleware(thunkMiddleware, createLogger(), router));
}

