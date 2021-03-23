export default (
  initialState = {}, actionHandlers: any = {},
): any => (
  state: object = initialState, action: any,
): object => {
  const reduceFn = actionHandlers[action.type];

  return !reduceFn ? state : reduceFn(state, action.payload);
};
