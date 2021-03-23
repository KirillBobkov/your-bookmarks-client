import { AnyAction } from 'redux';

export const SET_EDIT_MODE = 'SET_EDITION_MODE';
export const SET_CURRENT_ID = 'SET_CURRENT_ID';

export const setEditModeAction = (isActive: boolean): AnyAction => ({
  type: SET_EDIT_MODE,
  payload: isActive,
});

export const setCurrentId = (currentId: string): AnyAction => ({
  type: SET_CURRENT_ID,
  payload: currentId,
});
