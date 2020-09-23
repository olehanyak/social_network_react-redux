export const ADD_POST = 'ADD_POST';
export const UPDATE_NEW_TEXT = 'UPDATE_NEW_TEXT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET_USERS';

export const createNewPost = () => {
    return {
        type: ADD_POST,
    };
};

export const updateNewText = (newText) => {
    return {
        type: UPDATE_NEW_TEXT,
        newText: newText,
    };
};

export const createNewMessage = () => {
    return {
        type: ADD_MESSAGE,
    };
};

export const updateNewMessage = (newMessage) => {
    return {
        type: UPDATE_NEW_MESSAGE,
        newMessage: newMessage,
    };
};

export const followActionCreator = () => {
    return {
        type: FOLLOW,
    };
};

export const unfollowActionCreator = () => {
    return {
        type: UNFOLLOW,
    };
};