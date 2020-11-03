import { ADD_POST, GET_USER_PROFILE_STATUS, SET_USER_PROFILE } from "../actions/actions";

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
    default: return state;
  }
};

export default profileReducer