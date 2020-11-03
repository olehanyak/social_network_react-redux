import { dataAPI, profileAPI } from "../../api/api";

export const ADD_POST = 'ADD_POST';

export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET_USERS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const TOTAL_COUNT_PAGE = 'TOTAL_COUNT_PAGE';
export const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

export const SET_USER_DATA = 'SET_USER_DATA';

export const GET_USER_PROFILE_STATUS = 'GET_USER_PROFILE_STATUS';
export const UPDATE_USER_PROFILE_STATUS = 'UPDATE_USER_PROFILE_STATUS';

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

export const createNewMessage = (addMessage) => {
  return {
    type: ADD_MESSAGE,
    addMessage,
  };
};

export const follow = (userId) => {
  return {
    type: FOLLOW,
    userId,
  };
};

export const unfollow = (userId) => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const totalCountPage = (total) => {
  return {
    type: TOTAL_COUNT_PAGE,
    total,
  };
};

export const setToggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_FETCHING,
    isFetching,
  };
};

export const setAuthUserData = (userId, email, login) => {
  return {
    type: SET_USER_DATA,
    data: { userId, email, login },
  };
};

export const toggleIsFollowingProgress = (isFollowing, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFollowing,
    userId,
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

export const getUsers = (currentPage, sizePage) => {
  return (dispatch) => {
    dispatch(setToggleIsFetching(true));
    dataAPI.getUsers(currentPage, sizePage).then((data) => {
      dispatch(setToggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(totalCountPage(data.totalCount));
    });
  }
}

export const selectPages = (page, sizePage) => {
  return (dispatch) => {
    dispatch(setToggleIsFetching(true));
    dispatch(setCurrentPage(page));
    dataAPI.getUsersPage(page, sizePage).then((data) => {
      dispatch(setToggleIsFetching(false));
      dispatch(setUsers(data.items));
    });
  }
}

export const unFollowUsers = (user) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, user.id));
    dataAPI.unFollowUser(user).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollow(user.id));
      }
      dispatch(toggleIsFollowingProgress(false, user.id));
    });
  }
}

export const followUsers = (user) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, user.id));
    dataAPI.followUser(user).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(follow(user.id));
      }
      dispatch(toggleIsFollowingProgress(false, user.id));
    });
  }
}

export const authUserLogin = () => {
  return (dispatch) => {
    dataAPI.authUser().then((data) => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login));
      }
    });
  }
}

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
      console.log(response);
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

