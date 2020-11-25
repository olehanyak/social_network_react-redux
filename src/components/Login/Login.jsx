import React from "react";
import { Redirect } from "react-router-dom";
import styles from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";

const Login = ({ login, isAuth }) => {
  const onSubmit = (formData) => {
    console.log(formData);
    const { email, password, rememberMe } = formData;
    login(email, password, rememberMe);
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={styles.formField}>
      <h1 className={styles.login}>Please log in</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
