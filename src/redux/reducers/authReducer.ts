import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/api";

export const SET_USER_DATA = 'SET_USER_DATA';

// type InitialStateType = {
//   userId: number | null,
//   email: string | null,
//   login: string | null,
//   isAuth: boolean,
// }

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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

export default authReducer;

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

export const authUserLogin = () => {
  return async (dispatch: any) => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      console.log(response.data.data)
      dispatch(setAuthUserData(id, email, login, true));
    }
  }
}

export const login = (email: string, password: string, rememberMe: string) => {
  return async (dispatch: any) => {
    const response = await authAPI.loginUser(email, password, rememberMe);
    if (response.data.resultCode === 0) {
      dispatch(authUserLogin());
      console.log(response.data)
    }
    else {
      const message = response.data.messages.length > 0 ? response.data.messages[0] : "error"
      dispatch(stopSubmit("login", { _error: message }))
    }
  }
}

export const logout = () => {
  return async (dispatch: any) => {
    const response = await authAPI.logoutUser();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }
}