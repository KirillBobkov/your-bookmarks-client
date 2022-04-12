import {
  createStore, applyMiddleware, combineReducers, compose,
  Store, Reducer, CombinedState, StateFromReducersMapObject,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

function createReducer(
): Reducer<CombinedState<StateFromReducersMapObject<any>>, never> {
  const reducers = require('./reducers').default;
      
  return combineReducers({ ...reducers });
}
  
function configureStore(initialState: object = {}): Store {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [sagaMiddleware];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);
  
  if (module.hot) {
    module.hot.accept('./reducers', (): void => {
      store.replaceReducer(createReducer());
    });
  }
  
  return store;
}

export default configureStore({});