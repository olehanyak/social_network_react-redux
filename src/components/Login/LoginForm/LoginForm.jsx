import React from "react";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../utils/validators";
import { InputControl } from "../../common/FormsControl/FormControl";
import styles from "./LoginForm.module.css";

const LoginForm = (props) => {
  return (
    <>
      <form className={styles.formBlock} onSubmit={props.handleSubmit}>
        <div className={styles.input}>
          <Field component={InputControl} name={"email"} placeholder={"email"} validate={[required]} />
        </div>
        <div className={styles.input}>
          <Field component={InputControl} name={"password"} placeholder={"password"} validate={[required]} />
        </div>
        <div className={styles.input}>
          <Field component={InputControl} name={"rememberMe"} type={"checkbox"} />
        </div>
        <div className={styles.btn}>
          <button className="btn btn-outline-primary">login</button>
        </div>
      </form>
    </>
  );
};

let LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

export default LoginReduxForm;
