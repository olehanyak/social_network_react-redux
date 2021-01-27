import { GenericThunkType, InferActionsTypes } from './../redux_store';
import { PostType, UserProfileType } from './../../types/types';
import { ResultCodeEnum } from "../../api/api";
import { profileAPI } from "../../api/profile-api";

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof profileActions>
type ThunkType = GenericThunkType<ActionsTypes>

const initialState = {
  posts: [
    { id: 1, message: "hello", like: 12 },
    { id: 2, message: "I's my first post!", like: 5 },
  ] as Array<PostType>,

  userProfile: null as UserProfileType | null,
  status: "",
  newPostText: "",
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/ADD_POST": {
      return {
        ...state,
        posts: [...state.posts, { id: 3, message: action.newPostText, like: 0, }],
        newPostText: ""
      };
    }
    case "SN/SET_USER_PROFILE": {
      return {
        ...state,
        userProfile: action.userProfile,
      };
    }
    case "SN/GET_USER_PROFILE_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "SN/UPDATE_USER_PROFILE_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "SN/SET_PROFILE_PHOTO": {
      return {
        ...state,
        userProfile: {...state.userProfile, photos: action.photoFiles} as UserProfileType,
      };
    }
    default: return state;
  }
};

export const profileActions = {
  createNewPost: (newPostText: string) => {
    return {
      type: "SN/ADD_POST",
      newPostText,
    } as const
  },
  setUserProfile: (userProfile: UserProfileType) => {
    return {
      type: "SN/SET_USER_PROFILE",
      userProfile,
    } as const
  },
  getUserProfileStatus: (status: string) => {
    return {
      type: "SN/GET_USER_PROFILE_STATUS",
      status,
    } as const
  },
  updateUserProfileStatus: (status: string) => {
    return {
      type: "SN/UPDATE_USER_PROFILE_STATUS",
      status,
    } as const
  },
  setProfilePhoto: (photoFiles: any) => {
    return {
      type: "SN/SET_PROFILE_PHOTO",
      photoFiles,
    } as const
  },
}

export const getProfileUser = (userId: number): ThunkType => {
  return async (dispatch) => {
    const profileData = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(profileData));
  }
}

export const getProfileStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.getProfileStatus(userId);
    dispatch(profileActions.getUserProfileStatus(response.data));
  }
}

export const updateProfileStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    const updateData = await profileAPI.updateProfileStatus(status);
    if (updateData.resultCode === ResultCodeEnum.Success) {
      dispatch(profileActions.updateUserProfileStatus(status));
    }
  }
}

export const changeProfilePhoto = (photoFile: any): ThunkType => {
  return async (dispatch) => {
    const profilePhoto = await profileAPI.updateProfilePhoto(photoFile);
    if (profilePhoto.data.resultCode === ResultCodeEnum.Success) {
      dispatch(profileActions.setProfilePhoto(profilePhoto.data.photos));
    }
  }
}

export default profileReducer;