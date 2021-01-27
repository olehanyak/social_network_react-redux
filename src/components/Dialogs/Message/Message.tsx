import React from "react";
import styles from "../Message/Message.module.css";

type PropsType = {
  message: string
}

export const Message: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div className={styles.messageItem}>
        <div className={styles.message}>{props.message}</div>
        <div className={styles.message}>New message</div>
      </div>
    </div>
  );
};
