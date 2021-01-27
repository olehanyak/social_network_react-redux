import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selectors/authSelector";
import { Login } from "./Login";

type LoginPropsType = {}

export const LoginPage: React.FC<LoginPropsType> = (props) => {

  const isAuth = useSelector(authSelector);
  const dispatch = useDispatch();

  const login = (email: string, password: string, rememberMe: boolean, captcha: string): void => {
    dispatch(login(email, password, rememberMe, captcha));
  }

  return (
    <div>
      <Login login={login} isAuth={isAuth} />
    </div>
  );
};