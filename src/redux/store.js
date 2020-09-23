import dialogsReducer from "./reducers/dialogsReducer";
import profileReducer from "./reducers/profileReducer";

const store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "hello", like: 12 },
                { id: 2, message: "I's my first post!", like: 5 },
            ],
            newPostText: "",
        },

        dialogsPage: {
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
        },
    },

    _callSubscribe() {
        console.log('state changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscribe = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscribe = this._state;
    }
};

export default store;
