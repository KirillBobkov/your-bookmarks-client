import _ from 'lodash';

export const getSearchValueSelector = (state: object): string => _
  .get(state, 'search.value');
export const getSearchFilterSelector = (state: object): boolean => _
  .get(state, 'search.filter');
