import { AppStateType } from "../redux_store";

export const profileSelector = (state: AppStateType) => {
  return state.profilePage.posts;
};

export const userProfileSelector = (state: AppStateType) => {
  return state.profilePage.userProfile;
};

export const userProfileStatusSelector = (state: AppStateType) => {
  return state.profilePage.status;
};
