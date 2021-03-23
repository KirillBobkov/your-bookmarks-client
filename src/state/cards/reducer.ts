import createReducer from '../../helpers/reducer';
import {
  SET_CARDS,
  SET_FETCHING,
  CREATE,
  UPDATE,
  ADD_TO_FAVORITE,
  DELETE,
} from './actions';
import ICard from '../../interfaces/ICard';

const initialState: Reducer = {
  data: [],
  isFetching: true,
};

const actionHandlers = {
  [SET_CARDS]: (state: Reducer, cards: ICard[]): Reducer => ({
    ...state,
    data: cards, 
  }),

  [SET_FETCHING]: (state: Reducer, isFetching: boolean): Reducer => ({
    ...state,
    isFetching,
  }),

  [CREATE]: (state: Reducer, card: ICard): Reducer => ({
    ...state,
    data: [...state.data, card],
  }),

  [UPDATE]: (state: Reducer, updatedCard: ICard): Reducer => {
    const newState = { ...state, data: [...state.data] };

    return {
      ...newState,
      data: newState.data
          .map((card: ICard): ICard => (card._id === updatedCard._id ? updatedCard : card)),
    };
  },

  [ADD_TO_FAVORITE]: (state: Reducer, favoriteCard: ICard): Reducer => {
    const newState = { ...state, data: [...state.data] };

    return {
      ...newState,
      data: newState.data
        .map((card: ICard): ICard => (card._id === favoriteCard._id ? favoriteCard : card)),
    };
  },
   
  [DELETE]: (state: Reducer, deleteId: string): Reducer => {
    const newState = { ...state, data: [...state.data] };

    return {
      ...newState,
      data: newState.data.filter((card: ICard): boolean => card._id !== deleteId),
    };
  },
};

interface Reducer {
  data: ICard[];
  isFetching: boolean;
}

export default createReducer(initialState, actionHandlers);
