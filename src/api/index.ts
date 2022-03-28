import axios from 'axios';

import { ICard, IPartialCard } from '../interfaces/ICard';

const url = 'https://your-bookmarks.herokuapp.com/cards';

export const fetchCards = (): Promise<{ data: ICard[] }> => axios.get(url);
export const createCard = (card: IPartialCard): Promise<any> => axios.post(url, card);
export const updateCard = (id: string, updatedCard: IPartialCard): Promise<any> => axios.patch(`${url}/${id}`, updatedCard);
export const deleteCard = (id: string): Promise<any> => axios.delete(`${url}/${id}`);
export const addToFavorite = (id: string): Promise<any> => axios.patch(`${url}/${id}/addToFavorite`);
