import React from "react";
import { useSelector } from "react-redux";
import { dialogsSelector, messagesSelector } from "../../redux/selectors/dialogsSelector";
import { Dialogs } from "./Dialogs";

type PropsType = {}

export const DialogsPage: React.FC<PropsType> = (props) => {
  const dialogs = useSelector(dialogsSelector);
  const messages = useSelector(messagesSelector);

  return (
    <>
      <Dialogs
        dialogs={dialogs}
        messages={messages}
      />
    </>
  );
};