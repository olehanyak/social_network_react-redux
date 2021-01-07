import React from "react";
import { Redirect } from "react-router-dom";
import styles from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";

type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
  isAuth: boolean
  captchaUrl: string | null
}

export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export type FormDataTypeKeys = keyof FormDataType

const Login: React.FC<LoginPropsType> = ({ login, isAuth, captchaUrl }) => {
  const onSubmit = (formData: FormDataType) => {
    console.log(formData);
    const { email, password, rememberMe, captcha } = formData;
    login(email, password, rememberMe, captcha);
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={styles.formField}>
      <h1 className={styles.login}>Please log in</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

export default (Login);
