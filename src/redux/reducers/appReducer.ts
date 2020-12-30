
import { authUserLogin } from "./authReducer";

export const SET_INITIALIZED = 'SET_INITIALIZED';

type InitialStateType = {
  initializedApp: boolean
};

const initialState: InitialStateType = {
  initializedApp: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type SetInitializingActionType = {
  type: typeof SET_INITIALIZED
};

export const setInitializing = (): SetInitializingActionType => {
  return {
    type: SET_INITIALIZED,
  }
};

export const initializing = () => {
  return async (dispatch: any) => {
    let promise = await dispatch(authUserLogin());
    Promise.all([promise])
    dispatch(setInitializing())
  }
};
