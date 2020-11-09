import React from "react";
import styles from "./FormControl.module.css";

const FormWork = ({ input, meta, children, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{props.children}</div>
      {(hasError && <span className={styles.textColor}>{meta.error}</span>) ||
        (meta.warning && <span>{meta.warning}</span>)}
    </div>
  );
};

// export const TextareaControl = (props) => {
//   const { input, meta, children, ...restProps } = props;
//   return (
//     <FormWork {...props}>
//       <textarea {...input} {...restProps} />
//     </FormWork>
//   );
// };

// export const InputControl = (props) => {
//   const { input, meta, children, ...restProps } = props;
//   return (
//     <FormWork {...props}>
//       <input {...input} {...restProps} />
//     </FormWork>
//   );
// };

export const TextareaControl = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {meta.touched &&
        ((meta.error && <span className={styles.textColor}>{meta.error}</span>) ||
          (meta.warning && <span>{meta.warning}</span>))}
    </div>
  );
};

export const InputControl = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.inputControl + " " + (hasError ? styles.error : "")}>
      <div>
        <input className={styles.input} {...input} {...props} />
      </div>
      {meta.touched &&
        ((meta.error && <span className={styles.textColor}>{meta.error}</span>) ||
          (meta.warning && <span>{meta.warning}</span>))}
    </div>
  );
};
