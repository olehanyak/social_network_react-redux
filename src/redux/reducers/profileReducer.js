import { ADD_POST, UPDATE_NEW_TEXT } from "../actions/actions";

const initialState = {
    posts: [
        { id: 1, message: "hello", like: 12 },
        { id: 2, message: "I's my first post!", like: 5 },
    ],
    newPostText: "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, { id: 3, message: state.newPostText, like: 0, }],
                newPostText: '',
            };
        }
        case UPDATE_NEW_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
            };
        }
        default: return state;
    }
};

export default profileReducer