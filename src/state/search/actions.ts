import { AnyAction } from 'redux';

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

export const setSearchValue = (value: string): AnyAction => ({
  type: SET_SEARCH_VALUE,
  payload: value,
});
