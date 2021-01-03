
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux_store";
import { authUserLogin } from "./authReducer";

export const SET_INITIALIZED = 'SET_INITIALIZED';

type InitialStateType = {
  initializedApp: boolean
};

const initialState: InitialStateType = {
  initializedApp: false,
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetInitializingActionType

type SetInitializingActionType = {
  type: typeof SET_INITIALIZED
};

export const setInitializing = (): SetInitializingActionType => {
  return {
    type: SET_INITIALIZED,
  }
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializing = (): ThunkType => {
  return async (dispatch) => {
    let promise = await dispatch(authUserLogin());
    Promise.all([promise])
    dispatch(setInitializing())
  }
};

export default appReducer;