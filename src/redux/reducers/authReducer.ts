import { ResultCodeEnum } from './../../api/api';
import { InferActionsTypes, GenericThunkType } from './../redux_store';
import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/auth-api";
import { captchaAPI } from '../../api/captcha-api';

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof authActions>
type ThunkType = GenericThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/SET_USER_DATA":
      {
        return {
          ...state,
          ...action.payload,
        }
      }
    case "SN/GET_CAPTCHA_URL_SUCCESS":
      {
        return {
          ...state,
          captchaUrl: action.payload,
        }
      }
    default: return state;
  }
};

export const authActions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
      type: "SN/SET_USER_DATA",
      payload: { userId, email, login, isAuth },
    } as const
  },
  getCaptchaUrlSuccess: (captchaUrl: string | null) => {
    return {
      type: "SN/GET_CAPTCHA_URL_SUCCESS",
      payload: captchaUrl,
    } as const
  }
};

export const authUserLogin = (): ThunkType => {
  return async (dispatch) => {
    const meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
      let { id, email, login } = meData.data;
      console.log(meData.data)
      dispatch(authActions.setAuthUserData(id, email, login, true));
    }
  }
}

export const getDataCaptchaUrl = (): ThunkType => {
  return async (dispatch) => {
    const data = await captchaAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    console.log(captchaUrl)
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
  return async (dispatch) => {
    const loginData = await authAPI.loginUser(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodeEnum.Success) {
      dispatch(authUserLogin());
    }
    else {
      if (loginData.resultCode === ResultCodeEnum.Error) {
        dispatch(getDataCaptchaUrl())
      }
      const message = loginData.messages.length > 0 ? loginData.messages[0] : "error"
      dispatch(stopSubmit("login", { _error: message }))
    }
  }
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    const logoutData = await authAPI.logoutUser();

    if (logoutData.data.resultCode === ResultCodeEnum.Success) {
      dispatch(authActions.setAuthUserData(null, null, null, false));
    }
  }
}

export default authReducer;