import React from "react";
import styles from "../Dialogs/Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageReduxForm from "./TextAreaForMessage/TextAreaForMessage";

const Dialogs = (props) => {
  let dialogsElements = props.dialogs.map((dialog) => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />);
  let messagesElements = props.messages.map((message) => <Message key={message.id} message={message.message} />);

  let sendMessage = () => {
    props.createNewMessage();
  };

  console.log(props);

  const addNewMessage = (value) => {
    props.createNewMessage(value.addMessage);
  };

  return (
    <div className={styles.dialogs}>
      <div>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>
      <AddMessageReduxForm
        onSubmit={addNewMessage}
        newMessageText={props.newMessageText}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Dialogs;
