import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
export type RootState = ReturnType<typeof reducers>;

export const configuredStore = (initialState?: RootState) => {
  // Create Store
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagas);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(require('./reducers').default)
    );
  }
  return store;
};
export type Store = ReturnType<typeof configuredStore>;
