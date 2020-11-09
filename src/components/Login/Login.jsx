import React from "react";
import { Redirect } from "react-router-dom";
import styles from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
    const {email, password, rememberMe} = formData;
    props.login(email, password, rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />
  }

  return (
    <div>
      <h1 className={styles.login}>please log in</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
