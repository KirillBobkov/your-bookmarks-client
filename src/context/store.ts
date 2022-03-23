import { Store } from 'redux';
import configureStore from '../state/store';
import history from './history';

const store: Store = configureStore(history, {});

export default store;
