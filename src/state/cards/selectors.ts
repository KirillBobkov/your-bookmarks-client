import _ from 'lodash';
import { createSelector } from 'reselect';

import { ICard } from '../../interfaces/ICard';

import { getCurrentIdSelector } from '../editMode/selectors';

export const getCardsSelector = (state: object): ICard[] => _
  .get(state, 'cards.data');
export const isCardsEmptySelector = (state: object): boolean => !!_
  .get(state, 'cards.data.length');
export const isFetchingCardsSelector = (state: object): boolean => !!_
  .get(state, 'cards.isFetching');

export const getCurrentIdCardSelector = createSelector(
  getCardsSelector,
  getCurrentIdSelector,
  (cards: ICard[], currentId: string): ICard | undefined => (currentId 
    ? _.find(cards, (card): boolean => card._id === currentId) 
    : undefined),
);
