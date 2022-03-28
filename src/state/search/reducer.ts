import { ActionHandlerType, createReducer } from '../../helpers/reducer';
import { SET_SEARCH_VALUE } from './actions';

interface Reducer {
  value: string;
}

const initialState: Reducer = { 
  value: '',
};

const actionHandlers: ActionHandlerType<Reducer> = {
  [SET_SEARCH_VALUE]: (state: Reducer, value: string): any => ({ 
    value,
  }),
};

export default createReducer(initialState, actionHandlers);
