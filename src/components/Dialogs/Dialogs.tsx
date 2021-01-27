import React from "react";
import { useDispatch } from "react-redux";
import { dialogsActions, DialogsType, MessageType } from "../../redux/reducers/dialogsReducer";
import styles from "../Dialogs/Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { AddMessageReduxForm } from "./TextAreaForMessage/TextAreaForMessage";

type PropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessageType>
}

export type NewMessageType = {
  addMessage: string
}

export const Dialogs: React.FC<PropsType> = (props) => {
  const dialogsElements = props.dialogs.map((dialog) => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />);
  const messagesElements = props.messages.map((message) => <Message key={message.id} message={message.message} />);

  const dispatch = useDispatch();

  interface ValueType {
    addMessage: string
  }

  const addNewMessage = <T extends ValueType>(value: T) => {
    dispatch(dialogsActions.createNewMessage(value.addMessage));
  };

  return (
    <div className={styles.dialogs}>
      <div>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>
      <AddMessageReduxForm
        onSubmit={addNewMessage}
      // newMessageText={props.newMessageText}
      // sendMessage={sendMessage}
      />
    </div>
  );
};
