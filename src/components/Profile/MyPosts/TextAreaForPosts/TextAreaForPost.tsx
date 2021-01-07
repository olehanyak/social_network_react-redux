import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { maxLengthCreator, required } from "../../../../utils/validators";
import { TextareaControl } from "../../../common/FormsControl/FormControl";
import styles from "./TextAreaForPost.module.css";

const maxLength15 = maxLengthCreator(15);

const TextAreaForPost: React.FC<InjectedFormProps> = ({ handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.formBlock}>
          <div>
            <Field
              component={TextareaControl}
              name={"newPost"}
              className={styles.textArea}
              placeholder="Write a new post"
              validate={[required, maxLength15]}
            />
          </div>
          <div>
            <button className="btn btn-outline-primary">Add post</button>
          </div>
        </div>
      </form>
    </>
  );
};

let TextAreaReduxForm = reduxForm({
  form: "textAreaForPostForm",
})(TextAreaForPost);

export default TextAreaReduxForm;
