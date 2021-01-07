import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators";
import styles from "./FormControl.module.css";

type FormWorkParamsType = {
  meta: WrappedFieldMetaProps
}

const FormWork: React.FC<FormWorkParamsType> = ({ meta, children }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {(hasError && <span className={styles.textColor}>{meta.error}</span>) ||
        (meta.warning && <span>{meta.warning}</span>)}
    </div>
  );
};

export const TextareaControl: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormWork {...props}>
      <textarea {...input} {...restProps} />
    </FormWork>
  );
};

export const InputControl: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormWork {...props}>
      <input className={styles.input} {...input} {...restProps} />
    </FormWork>
  );
};

export function createField<KeysTypes extends string>(InputControl: React.FC<WrappedFieldProps>,
  name: KeysTypes,
  placeholder: string | undefined,
  validate: Array<FieldValidatorType>,
  props = {},
  text = "") {

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
