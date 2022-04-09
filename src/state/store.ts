import {
  createStore, applyMiddleware, combineReducers, compose,
  Store, Reducer, CombinedState, StateFromReducersMapObject,
} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { History } from 'history';
  
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
export function createReducer(
  history: History,
): Reducer<CombinedState<StateFromReducersMapObject<any>>, never> {
  const reducers = require('./reducers').default;
    
  return combineReducers({
    ...reducers,
    router: connectRouter(history),
  });
}
  
export default function configureStore(history: History, initialState: object = {}): Store {
  const middlewares = [
    routerMiddleware(history),
    thunk,
  ];
  const store = createStore(
    createReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  
  if (module.hot) {
    module.hot.accept('./reducers', (): void => {
      store.replaceReducer(createReducer(history));
    });
  }
  
  return store;
}
