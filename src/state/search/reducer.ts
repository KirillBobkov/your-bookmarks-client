import createReducer from '../../helpers/reducer';
import { SET_SEARCH_VALUE } from './actions';

const initialState: Reducer = { 
  value: '',
};

const actionHandlers = {
  [SET_SEARCH_VALUE]: (state: any, value: string): any => ({ 
    value,
  }),
};

interface Reducer {
  value: string;
}

export default createReducer(initialState, actionHandlers);
