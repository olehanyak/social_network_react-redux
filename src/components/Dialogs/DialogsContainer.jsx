import React from "react";
import { connect } from "react-redux";
import { createNewMessage, updateNewMessage } from "../../redux/actions/actions";
import Dialogs from "./Dialogs";

const mapStateToProps = (state) => {
    let { dialogs, messages, newMessageText } = state.dialogsPage;
    return {
        dialogs: dialogs,
        messages: messages,
        newMessageText: newMessageText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewMessage: () => {
            dispatch(createNewMessage());
        },
        updateNewMessage: (text) => {
            dispatch(updateNewMessage(text));
        },
    };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
