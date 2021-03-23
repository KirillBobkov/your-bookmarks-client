import _ from 'lodash';

export const getSearchValueSelector = (state: object): string => _
  .get(state, 'search.value');
