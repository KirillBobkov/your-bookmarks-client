import { Dispatch } from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../../api';
import { ICard, IPartialCard } from '../../interfaces/ICard';

type Action<T>  = {
  type: string;
  payload: T;
};

export const FETCH_CARDS = 'FETCH_CARDS';
export const FETCH_CARDS_ASYNC = 'FETCH_CARDS_ASYNC';
export const CREATE_CARD_ASYNC = 'CREATE_CARDS_ASYNC';
export const DELETE_CARD_ASYNC = 'DELETE_CARD_ASYNC';
export const UPDATE_CARD_ASYNC = 'UPDATE_CARD_ASYNC';
export const ADD_TO_FAVORITE_CARD_ASYNC = 'ADD_TO_FAVORITE_CARD_ASYNC';
export const SET_CARDS = 'SET_CARDS';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const DELETE = 'DELETE';
export const SET_FETCHING = 'SET_FETCHING';

// saga triggers
export const fetchCards = () => ({ type: FETCH_CARDS_ASYNC });
export const createCard = (value: IPartialCard) => ({ type: CREATE_CARD_ASYNC, payload: value });
export const deleteCard = (id: string) => ({ type: DELETE_CARD_ASYNC, payload: id });
export const updateCard = (id: string, updatedCard: IPartialCard) => ({ type: UPDATE_CARD_ASYNC, payload: { id, card: updatedCard } });
export const addToFavorite = (id: string) => ({ type: ADD_TO_FAVORITE_CARD_ASYNC, payload: id });

// Action creators
export const setCardsFetchingAction = (isFetching: boolean): Action<boolean> => ({
  type: SET_FETCHING,
  payload: isFetching,
});

export const setCardsAction = (cards: ICard[]): Action<ICard[]> => ({
  type: SET_CARDS,
  payload: cards,
});

export const createCardAction = (createdCard: ICard): Action<ICard> => ({
  type: CREATE,
  payload: createdCard,
});

export const deleteCardAction = (id: string): Action<string> => ({
  type: DELETE,
  payload: id,
});

export const updateCardAction = (updatedCard: ICard): Action<ICard> => ({
  type: UPDATE,
  payload: updatedCard,
});

export const addToFavoriteAction = (id: string): Action<string> => ({
  type: ADD_TO_FAVORITE,
  payload: id,
});

// Workers 
export function* fetchCardsAsync() {
  yield put(setCardsFetchingAction(true));

  const { data } = yield call(api.fetchCards);

  yield put(setCardsAction(data));
  yield put(setCardsFetchingAction(false));
}

export function* createCardAsync(action: Action<IPartialCard>) {
  const { data } = yield call(api.createCard, action.payload);

  yield put(createCardAction(data));
}

export function* deleteCardAsync(action: Action<string>) {
  yield call(api.deleteCard, action.payload);

  yield put(deleteCardAction(action.payload));
}

export function* updateCardAsync(action: Action<{ id: string, card: IPartialCard }>) {
  const { data } = yield call(api.updateCard, action.payload.id, action.payload.card);

  yield put(updateCardAction(data));
}

export function* addToFavoriteAsync(action: Action<string>) {
  const { data } = yield call(api.addToFavorite, action.payload);

  yield put(addToFavoriteAction(data));
}

// Watchers
export function* watchCards() {
  yield takeEvery(FETCH_CARDS_ASYNC, fetchCardsAsync);
  yield takeEvery(CREATE_CARD_ASYNC, createCardAsync);
  yield takeEvery(DELETE_CARD_ASYNC, deleteCardAsync);
  yield takeEvery(UPDATE_CARD_ASYNC, updateCardAsync);
  yield takeEvery(ADD_TO_FAVORITE_CARD_ASYNC, addToFavoriteAsync);
}
