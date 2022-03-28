import { AnyAction } from 'redux';

export type ActionHandlerType<S> = Record<string, (state: S, payload: any) => S>;

export const createReducer = <T>(
  initialState: T | {} = {}, actionHandlers: ActionHandlerType<T> = {},
): Function => (state: T | {} = initialState, action: AnyAction): T | {} => {
    const reduceFn = actionHandlers[action.type];

    return !reduceFn ? state : reduceFn(state as T, action.payload);
  };
