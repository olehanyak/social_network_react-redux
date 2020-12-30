
export const ADD_MESSAGE = 'ADD_MESSAGE';

type DialogsType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  message: string
}

const initialState = {
  dialogs: [
    { id: 1, name: "Leo" },
    { id: 2, name: "Mark" },
    { id: 3, name: "Alf" },
    { id: 4, name: "Bean" },
    { id: 5, name: "Bill" },
  ] as Array<DialogsType>,
  messages: [
    { id: 1, message: "Yo" },
    { id: 2, message: "Hi" },
    { id: 3, message: "No way" },
    { id: 4, message: "No doubt" },
    { id: 5, message: "Wait for me!" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: action.addMessage, }],
      };
    }
    default: return state;
  }
};

export default dialogsReducer;

type CreateNewMessageActionType = {
  type: typeof ADD_MESSAGE
  addMessage: string
}

export const createNewMessage = (addMessage: string): CreateNewMessageActionType => {
  return {
    type: ADD_MESSAGE,
    addMessage,
  };
};