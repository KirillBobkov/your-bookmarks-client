import {
  createStore, applyMiddleware, combineReducers, compose,
  Store, Reducer, CombinedState, StateFromReducersMapObject,
} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
export function createReducer(
): Reducer<CombinedState<StateFromReducersMapObject<any>>, never> {
  const reducers = require('./reducers').default;
    
  return combineReducers({ ...reducers });
}
  
export default function configureStore(initialState: object = {}): Store {
  const middlewares = [
    thunk,
  ];
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  
  if (module.hot) {
    module.hot.accept('./reducers', (): void => {
      store.replaceReducer(createReducer());
    });
  }
  
  return store;
}
