import { AppStateType } from "../redux_store";

export const authSelector = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const authUserIdSelector = (state: AppStateType) => {
  return state.auth.userId;
};

export const captchaUrlSelector = (state: AppStateType) => {
  return state.auth.captchaUrl;
};



