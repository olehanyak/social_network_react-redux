import { ResultCodeEnum } from './../../api/api';
import { AppStateType } from './../redux_store';
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI } from "../../api/api";

export const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: return state;
  }
};

type ActionsTypes = SetAuthUserDataActionType

type SetAuthUserDataPayloadActionType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataPayloadActionType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
  return {
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  };
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authUserLogin = (): ThunkType => {
  return async (dispatch) => {
    const meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
      let { id, email, login } = meData.data;
      console.log(meData.data)
      dispatch(setAuthUserData(id, email, login, true));
    }
  }
}

export const login = (email: string, password: number, rememberMe: boolean): ThunkType => {
  return async (dispatch) => {
    const loginData = await authAPI.loginUser(email, password, rememberMe);

    if (loginData.resultCode === ResultCodeEnum.Success) {
      dispatch(authUserLogin());
      console.log(loginData.data)
    }
    else {
      const message = loginData.messages.length > 0 ? loginData.messages[0] : "error"
      // dispatch(stopSubmit("login", { _error: message }))
    }
  }
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    const logoutData = await authAPI.logoutUser();

    if (logoutData.data.resultCode === ResultCodeEnum.Success) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }
}

export default authReducer;