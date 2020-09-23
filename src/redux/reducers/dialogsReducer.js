import { ADD_MESSAGE, UPDATE_NEW_MESSAGE } from "../actions/actions";

const initialState = {
    dialogs: [
        { id: 1, name: "Leo" },
        { id: 2, name: "Mark" },
        { id: 3, name: "Alf" },
        { id: 4, name: "Bean" },
        { id: 5, name: "Bill" },
    ],
    messages: [
        { id: 1, message: "Yo" },
        { id: 2, message: "Hi" },
        { id: 3, message: "No way" },
        { id: 4, message: "No doubt" },
        { id: 5, message: "Wait for me!" },
    ],
    newMessageText: "",
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: state.newMessageText, }],
                newMessageText: '',
            };
        }
        case UPDATE_NEW_MESSAGE: {
            return {
                ...state,
                newMessageText: action.newMessage,
            };
        }
        default: return state;

    }
};

export default dialogsReducer