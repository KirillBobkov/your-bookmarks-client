import createReducer from '../../helpers/reducer';
import { SET_EDIT_MODE, SET_CURRENT_ID } from './actions';

const initialState: Reducer = { 
  isActive: false,
  currentId: '',
};

const actionHandlers = {
  [SET_EDIT_MODE]: (state: any, isActive: boolean): any => ({ 
    ...state,
    isActive,
  }),

  [SET_CURRENT_ID]: (state: any, currentId: string): any => ({ 
    ...state,
    currentId,
  }),
};

interface Reducer {
  isActive: boolean;
  currentId: string;
}

export default createReducer(initialState, actionHandlers);
