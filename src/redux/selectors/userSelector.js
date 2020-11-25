export const userSelector = (state) => {
  return state.usersPage.users;
};

export const totalPagesSelector = (state) => {
  return state.usersPage.totalPages;
};

export const currentPageSelector = (state) => {
  return state.usersPage.currentPage;
};

export const sizePageSelector = (state) => {
  return state.usersPage.sizePage;
};

export const isFetchingSelector = (state) => {
  return state.usersPage.isFetching;
};

export const followingProgressSelector = (state) => {
  return state.usersPage.followingProgress;
};