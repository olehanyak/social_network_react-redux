import React from "react";
import styles from "../Dialogs/Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.dialogs.map((dialog) => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />);
  let messagesElements = props.messages.map((message) => <Message key={message.id} message={message.message} />);

  let sendMessage = () => {
    props.createNewMessage();
  };

  let onChangeMessage = (e) => {
    const text = e.target.value;
    props.updateNewMessage(text);
  };

  return (
    <div className={styles.dialogs}>
      <div>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>
      <div>
        <textarea
          placeholder="Write your message"
          onChange={onChangeMessage}
          className={styles.dialogText}
          value={props.newMessageText}
        ></textarea>
        <button onClick={sendMessage} className={styles.dialogBtn}>
          Push
        </button>
      </div>
    </div>
  );
};

export default Dialogs;
