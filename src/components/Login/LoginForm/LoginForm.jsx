import React from "react";
import { reduxForm } from "redux-form";
import { required } from "../../../utils/validators";
import { createField, InputControl } from "../../common/FormsControl/FormControl";
import styles from "./LoginForm.module.css";

const LoginForm = ({handleSubmit, error}) => {
  return (
    <>
      <form className={styles.formBlock} onSubmit={handleSubmit}>
        {createField(InputControl, "email", "Email", [required])}
        {createField(InputControl, "password", "Password", [required], {type: "password"})}
        {createField(InputControl, "rememberMe", null, null, {type: "checkbox"}, "remember me")}
        {error && <span className={styles.formError}>{error}</span>}
        <div>
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
