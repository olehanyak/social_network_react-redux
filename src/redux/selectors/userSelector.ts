import { AppStateType } from "../redux_store";

export const userSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const totalPagesSelector = (state: AppStateType) => {
  return state.usersPage.totalPages;
};

export const currentPageSelector = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const sizePageSelector = (state: AppStateType) => {
  return state.usersPage.sizePage;
};

export const isFetchingSelector = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const followingProgressSelector = (state: AppStateType) => {
  return state.usersPage.followingProgress;
};