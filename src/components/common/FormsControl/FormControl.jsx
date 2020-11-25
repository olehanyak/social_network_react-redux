import React from "react";
import { Field } from "redux-form";
import styles from "./FormControl.module.css";

const FormWork = ({ input, meta, children, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {(hasError && <span className={styles.textColor}>{meta.error}</span>) ||
        (meta.warning && <span>{meta.warning}</span>)}
    </div>
  );
};

export const TextareaControl = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormWork {...props}>
      <textarea {...input} {...restProps} />
    </FormWork>
  );
};

export const InputControl = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormWork {...props}>
      <input className={styles.input} {...input} {...restProps} />
    </FormWork>
  );
};

export const createField = (InputControl, name, placeholder, validate, props = {}, text = "") => {
  
  return (
    <div className={styles.inputField}>
      <Field 
          component={InputControl} 
          name={name} 
          placeholder={placeholder} 
          validate={validate} 
          {...props}
      />
          {text}
    </div>
  );
};
