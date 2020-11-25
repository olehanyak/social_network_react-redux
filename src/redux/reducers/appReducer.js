
import { authUserLogin } from "./authReducer";

export const SET_INITIALIZED = 'SET_INITIALIZED';

const initialState = {
  initializedApp: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED: {
      return {
        ...state,
        initializedApp: true,
      }
    }
    default: return state;
  }
};

export default appReducer;

export const setInitializing = () => {
  return {
    type: SET_INITIALIZED,
  }
};

export const initializing = () => {
  return (dispatch) => {
    let promise = dispatch(authUserLogin())
    Promise.all([promise])
      .then(() => {
        dispatch(setInitializing())
      })
  }
};