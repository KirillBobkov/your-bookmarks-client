import _ from 'lodash';

export const getIsActiveEditModeSelector = (state: object): boolean => _
  .get(state, 'editMode.isActive');
export const getCurrentIdSelector = (state: object): string => _
  .get(state, 'editMode.currentId');
