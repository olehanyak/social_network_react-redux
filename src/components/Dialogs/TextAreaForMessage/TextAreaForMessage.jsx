import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators";
import { TextareaControl } from "../../common/FormsControl/FormControl";
import styles from "./TextAreaForMessage.module.css";

const maxLength20 = maxLengthCreator(20);

const TextAreaForMessage = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={TextareaControl}
          name={"addMessage"}
          placeholder="Write your message"
          className={styles.dialogText}
          validate={[required, maxLength20]}
        />
        <button className="btn btn-outline-primary">Push</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({
  form: "textAreaForMessageForm",
})(TextAreaForMessage);

export default AddMessageReduxForm;
