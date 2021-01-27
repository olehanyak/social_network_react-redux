import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators";
import { createField, TextareaControl } from "../../common/FormsControl/FormControl";
import { NewMessageType } from "../Dialogs";
import styles from "./TextAreaForMessage.module.css";

const maxLength20 = maxLengthCreator(20);

type NewMessageFormTypeKeys = Extract<keyof NewMessageType, string>

const TextAreaForMessage: React.FC<InjectedFormProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.dialogText}>
        {createField<NewMessageFormTypeKeys>(TextareaControl, "addMessage", "Write your message", [required, maxLength20])}
        <button className="btn btn-outline-primary">Push</button>
      </div>
    </form>
  );
};

export const AddMessageReduxForm = reduxForm({
  form: "textAreaForMessageForm",
})(TextAreaForMessage);


