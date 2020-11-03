import React from "react";
import styles from "./Login.module.css";
import LoginReduxForm from "./LoginForm/LoginForm";
import LoginForm from "./LoginForm/LoginForm";

const Login = (props) => {

  const onSubmit = (formData) => {
    console.log(formData);
  }

  return (
    <div>
      <h1 className={styles.login}>please log in</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
