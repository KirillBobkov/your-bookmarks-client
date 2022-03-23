import { AnyAction, Dispatch } from 'redux';
import * as api from '../../api';
import ICard from '../../interfaces/ICard';

export const SET_CARDS = 'SET_CARDS';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const ADD_TO_FAVORITE = 'LIKE';
export const DELETE = 'DELETE';
export const SET_FETCHING = 'SET_FETCHING';

type IPartialCard = Omit<ICard, '_id' | 'isFavorite'>; 

export const setCardsAction = (cards: ICard[]): AnyAction => ({
  type: SET_CARDS,
  payload: cards,
});

export const createCardAction = (createdCard: ICard): AnyAction => ({
  type: CREATE,
  payload: createdCard,
});

export const updateCardAction = (updatedCard: ICard): AnyAction => ({
  type: UPDATE,
  payload: updatedCard,
});

export const addToFavoriteAction = (id: string): AnyAction => ({
  type: ADD_TO_FAVORITE,
  payload: id,
});

export const deleteCardAction = (id: string): AnyAction => ({
  type: DELETE,
  payload: id,
});

export const setCardsFetching = (isFetching: boolean): AnyAction => ({
  type: SET_FETCHING,
  payload: isFetching,
});


export const getCards = (): Function => async (dispatch: Dispatch): Promise<any> => {
  dispatch(setCardsFetching(true));
  const { data } = await api.fetchCards();
  dispatch(setCardsAction(data));
  dispatch(setCardsFetching(false)); 
};

export const createCard = (card: IPartialCard): Function => async (
  dispatch: Dispatch,
): Promise<any> => {
  const { data } = await api.createCard(card);
  dispatch(createCardAction(data));
};

export const updateCard = (id: string, card: IPartialCard): Function => async (
  dispatch: Dispatch,
): Promise<any> => {
  const { data } = await api.updateCard(id, card);
  dispatch(updateCardAction(data));
};

export const addToFavorite = (id: string): Function => async (dispatch: Dispatch): Promise<any> => {
  const { data } = await api.addToFavorite(id);
  dispatch(addToFavoriteAction(data));
};

export const deleteCard = (id: string): Function => async (dispatch: Dispatch): Promise<any> => {
  await api.deleteCard(id);
  dispatch(deleteCardAction(id));
};
