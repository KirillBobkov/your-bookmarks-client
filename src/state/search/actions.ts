import { AnyAction } from 'redux';

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';

export const setSearchValue = (value: string): AnyAction => ({
  type: SET_SEARCH_VALUE,
  payload: value,
});

export const setSearchFilter = (flag: boolean): AnyAction => ({
  type: SET_SEARCH_FILTER,
  payload: flag,
});
