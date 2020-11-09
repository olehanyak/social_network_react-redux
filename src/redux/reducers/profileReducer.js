import { dataAPI, profileAPI } from "../../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_USER_PROFILE_STATUS = 'GET_USER_PROFILE_STATUS';
const UPDATE_USER_PROFILE_STATUS = 'UPDATE_USER_PROFILE_STATUS';

const initialState = {
  posts: [
    { id: 1, message: "hello", like: 12 },
    { id: 2, message: "I's my first post!", like: 5 },
  ],

  userProfile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, { id: 3, message: action.newPostText, like: 0, }],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.userProfile,
      };
    }
    case GET_USER_PROFILE_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case UPDATE_USER_PROFILE_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default: return state;
  }
};

export default profileReducer;

export const createNewPost = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

export const setUserProfile = (userProfile) => {
  return {
    type: SET_USER_PROFILE,
    userProfile,
  };
};

export const getUserProfileStatus = (status) => {
  return {
    type: GET_USER_PROFILE_STATUS,
    status,
  };
};

export const updateUserProfileStatus = (status) => {
  return {
    type: UPDATE_USER_PROFILE_STATUS,
    status,
  };
};

export const getProfileUser = (userId) => {
  return (dispatch) => {
    dataAPI.profileUser(userId).then((data) => {
      console.log(data);
      dispatch(setUserProfile(data));
    });
  }
}

export const getProfileStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getProfileStatus(userId).then((response) => {
      console.log(response.data);
      dispatch(getUserProfileStatus(response.data));
    });
  }
}

export const updateProfileStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateProfileStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        console.log(response.data);
        dispatch(updateUserProfileStatus(status));
      }
    });
  }
}