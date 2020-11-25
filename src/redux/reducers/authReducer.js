import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/api";

export const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userId, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  };
};

export const authUserLogin = () => {
  return (dispatch) => {
    authAPI.me().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, email, login } = response.data;
        console.log(response.data)
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  }
}

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.loginUser(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(authUserLogin());
        console.log(response.data)
      }
      else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "error"
        dispatch(stopSubmit("login", { _error: message }))
      }
    });
  }
}

export const logout = () => {
  return (dispatch) => {
    authAPI.logoutUser().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  }
}