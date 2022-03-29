import axios from 'axios';

import { ICard, IPartialCard } from '../interfaces/ICard';

const url = 'https://your-bookmarks.herokuapp.com/cards';

export const fetchCards = (): Promise<{ data: ICard[] }> => axios.get(url);

export const createCard = (card: IPartialCard): Promise<{ data: ICard }> => axios.post(url, card);

export const updateCard = (id: string, updatedCard: IPartialCard): Promise<{ data: ICard }> => axios.patch(`${url}/${id}`, updatedCard);

export const deleteCard = (id: string): Promise<void> => axios.delete(`${url}/${id}`);

export const addToFavorite = (id: string): Promise<{ data: string }> => axios.patch(`${url}/${id}/addToFavorite`);
