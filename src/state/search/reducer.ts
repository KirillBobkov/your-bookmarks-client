import { ActionHandlerType, createReducer } from '../../helpers/reducer';
import { SET_SEARCH_VALUE, SET_SEARCH_FILTER } from './actions';

interface Reducer {
  value: string;
  filter: boolean;
}

const initialState: Reducer = { 
  value: '',
  filter: false,
};

const actionHandlers: ActionHandlerType<Reducer> = {
  [SET_SEARCH_VALUE]: (state: Reducer, value: string): Reducer => ({ 
    ...state,
    value,
  }),

  [SET_SEARCH_FILTER]: (state: Reducer, filter: boolean): Reducer => ({ 
    ...state,
    filter,
  }),
};

export default createReducer(initialState, actionHandlers);
