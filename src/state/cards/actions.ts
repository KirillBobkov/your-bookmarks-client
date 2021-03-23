import { AnyAction, Dispatch } from 'redux';
import * as api from '../../api';
import ICard from '../../interfaces/ICard';

export const SET_CARDS = 'SET_CARDS';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const ADD_TO_FAVORITE = 'LIKE';
export const DELETE = 'DELETE';
export const SET_FETCHING = 'SET_FETCHING';

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


export const getCards = (): any => async (dispatch: Dispatch): Promise<any> => {
  try {
    dispatch(setCardsFetching(true));
    const { data } = await api.fetchCards();
    dispatch(setCardsAction(data));
    dispatch(setCardsFetching(false));
  } catch (error) {
    console.log(error.message);
  }
};

export const createCard = (card: Partial<ICard>): any => async (
  dispatch: Dispatch,
): Promise<any> => {
  try {
    const { data } = await api.createCard(card);
    dispatch(createCardAction(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCard = (id: string, card: Partial<ICard>): any => async (
  dispatch: Dispatch,
): Promise<any> => {
  try {
    const { data } = await api.updateCard(id, card);
    dispatch(updateCardAction(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const addToFavorite = (id: string): any => async (dispatch: Dispatch): Promise<any> => {
  try {
    const { data } = await api.addToFavorite(id);
    dispatch(addToFavoriteAction(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCard = (id: string): any => async (dispatch: Dispatch): Promise<any> => {
  try {
    await api.deleteCard(id);
    dispatch(deleteCardAction(id));
  } catch (error) {
    console.log(error.message);
  }
};
