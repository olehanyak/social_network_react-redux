import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { required } from "../../../utils/validators";
import { createField, InputControl } from "../../common/FormsControl/FormControl";
import { FormDataTypeKeys, FormDataType } from "../Login";
import styles from "./LoginForm.module.css";

type PropsType = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = ({ handleSubmit, error, captchaUrl }) => {

  return (
    <>
      <form className={styles.formBlock} onSubmit={handleSubmit}>
        {createField<FormDataTypeKeys>(InputControl, "email", "Email", [required])}
        {createField<FormDataTypeKeys>(InputControl, "password", "Password", [required], { type: "password" })}
        {createField<FormDataTypeKeys>(InputControl, "rememberMe", undefined, [], { type: "checkbox" }, "remember me")}
        {captchaUrl && <img src={captchaUrl} />}
        {error && <span className={styles.formError}>{error}</span>}
        {createField<FormDataTypeKeys>(InputControl, "captcha", "enter from image", [required])}
        <div>
          <button className="btn btn-outline-primary">login</button>
        </div>
      </form>
    </>
  );
};

let LoginReduxForm = reduxForm<FormDataType, PropsType>({
  form: "login",
})(LoginForm);

export default LoginReduxForm;
