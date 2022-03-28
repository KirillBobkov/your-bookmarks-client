import { ActionHandlerType, createReducer } from '../../helpers/reducer';
import { SET_EDIT_MODE, SET_CURRENT_ID } from './actions';

interface Reducer {
  isActive: boolean;
  currentId: string;
}

const initialState: Reducer = { 
  isActive: false,
  currentId: '',
};

const actionHandlers: ActionHandlerType<Reducer> = {
  [SET_EDIT_MODE]: (state: Reducer, isActive: boolean): Reducer => ({ 
    ...state,
    isActive,
  }),

  [SET_CURRENT_ID]: (state: Reducer, currentId: string): Reducer => ({ 
    ...state,
    currentId,
  }),
};

export default createReducer(initialState, actionHandlers);
