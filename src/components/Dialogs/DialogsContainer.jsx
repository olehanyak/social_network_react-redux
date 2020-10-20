import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewMessage, updateNewMessage } from "../../redux/actions/actions";
import Dialogs from "./Dialogs";

class DialogsContainer extends Component {
  render() {
    let { dialogs, messages, newMessageText, createNewMessage, updateNewMessage } = this.props;
    return (
      <>
        <Dialogs
          dialogs={dialogs}
          messages={messages}
          newMessageText={newMessageText}
          createNewMessage={createNewMessage}
          updateNewMessage={updateNewMessage}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  let { dialogs, messages, newMessageText } = state.dialogsPage;
  return {
    dialogs: dialogs,
    messages: messages,
    newMessageText: newMessageText,
  };
};

const mapDispatchToProps = {
  createNewMessage,
  updateNewMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
