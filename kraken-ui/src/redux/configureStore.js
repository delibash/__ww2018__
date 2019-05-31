import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import * as reducers from './ducks';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers(reducers);

const middleware = [
  epicMiddleware
];

const logger = createLogger({
  level: 'info',
  duration: true,
  collapsed: (getState, action, logs) => !logs.error,
  diff: true
});

export default function configureStore(initialState) {

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  const composedStore = compose(
    applyMiddleware(
      ...middleware,
    )(createStore)(
      rootReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  epicMiddleware.run(rootEpic);

  return composedStore;
}