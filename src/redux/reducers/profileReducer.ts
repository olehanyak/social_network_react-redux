import { PostType, UserProfileType } from './../../types/types';
import { dataAPI, profileAPI } from "../../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_USER_PROFILE_STATUS = 'GET_USER_PROFILE_STATUS';
const UPDATE_USER_PROFILE_STATUS = 'UPDATE_USER_PROFILE_STATUS';

const initialState = {
  posts: [
    { id: 1, message: "hello", like: 12 },
    { id: 2, message: "I's my first post!", like: 5 },
  ] as Array<PostType>,

  userProfile: null as UserProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
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

type CreateNewPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}

export const createNewPost = (newPostText: string): CreateNewPostActionType => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  userProfile: UserProfileType
}

export const setUserProfile = (userProfile: UserProfileType): SetUserProfileActionType => {
  return {
    type: SET_USER_PROFILE,
    userProfile,
  };
};

type GetUserProfileStatusActionType = {
  type: typeof GET_USER_PROFILE_STATUS
  status: string
}

export const getUserProfileStatus = (status: string): GetUserProfileStatusActionType => {
  return {
    type: GET_USER_PROFILE_STATUS,
    status,
  };
};

type UpdateUserProfileStatusActionType = {
  type: typeof UPDATE_USER_PROFILE_STATUS
  status: string
}

export const updateUserProfileStatus = (status: string): UpdateUserProfileStatusActionType => {
  return {
    type: UPDATE_USER_PROFILE_STATUS,
    status,
  };
};

export const getProfileUser = (userId: number) => {
  return async (dispatch: any) => {
    const data = await dataAPI.profileUser(userId);
    console.log(data);
    dispatch(setUserProfile(data));
  }
}

export const getProfileStatus = (userId: number) => {
  return async (dispatch: any) => {
    const response = await profileAPI.getProfileStatus(userId);
    console.log(response.data);
    dispatch(getUserProfileStatus(response.data));

  }
}

export const updateProfileStatus = (status: string) => {
  return async (dispatch: any) => {
    const response = await profileAPI.updateProfileStatus(status);
    if (response.data.resultCode === 0) {
      console.log(response.data);
      dispatch(updateUserProfileStatus(status));
    }
  }
}