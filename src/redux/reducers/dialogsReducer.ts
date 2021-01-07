import { InferActionsTypes } from "../redux_store";

type DialogsType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  message: string
}
type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof dialogsActions>

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

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/ADD_MESSAGE": {
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: action.addMessage, }],
      };
    }
    default: return state;
  }
};

export const dialogsActions = {
  createNewMessage: (addMessage: string) => {
    return {
      type: "SN/ADD_MESSAGE",
      addMessage,
    } as const
  }
};

export default dialogsReducer;