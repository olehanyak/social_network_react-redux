import React from "react";
import styles from "./FormControl.module.css";

const FormWork = ({ input, meta, element, ...props }) => {
  
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>
        {`${element} ${input} ${props}`}
      </div>
      {meta.touched &&
        ((meta.error && <span className={styles.textColor}>{meta.error}</span>) ||
          (meta.warning && <span>{meta.warning}</span>))}
    </div>
  );
}

const TA = <textarea></textarea>;

export const FormControl = (props) => {
  return <FormWork {...props} element={TA}/>
};
export const Input = () => {};

// export const FormControl = ({ input, meta, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   return (
//     <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//       <div>
//         <textarea {...input} {...props} />
//       </div>
//       {meta.touched &&
//         ((meta.error && <span className={styles.textColor}>{meta.error}</span>) ||
//           (meta.warning && <span>{meta.warning}</span>))}
//     </div>
//   );
// };

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
