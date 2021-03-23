import axios from 'axios';
import ICard from '../interfaces/ICard';

const url = 'https://your-bookmarks.herokuapp.com/cards';

export const fetchCards = (): Promise<any> => { console.log('fetch'); return axios.get(url); };
export const createCard = (card: Partial<ICard>): Promise<any> => { console.log('create'); return axios.post(url, card); };
export const updateCard = (id: string, updatedCard: Partial<ICard>): Promise<any> => axios.patch(`${url}/${id}`, updatedCard);
export const deleteCard = (id: string): Promise<any> => axios.delete(`${url}/${id}`);
export const addToFavorite = (id: string): Promise<any> => axios.patch(`${url}/${id}/addToFavorite`);
