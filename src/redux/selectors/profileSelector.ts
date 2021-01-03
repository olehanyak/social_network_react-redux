import { AppStateType } from "../redux_store";

export const profileSelector = (state: AppStateType) => {
  return state.profilePage.posts;
};
