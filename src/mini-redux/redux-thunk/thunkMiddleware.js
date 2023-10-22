// 返回以 dispatch 和 getState 作为参数的action
export function thunkMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}