import configureStore from '../state/store';
import history from './history';

const store = configureStore(history, {});

// @ts-ignore
store.asyncReducers = {};

export default store;
