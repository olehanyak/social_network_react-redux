import { dataAPI } from "../../api/api";
import { updateObjectInArr } from "../../utils/object.helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOTAL_COUNT_PAGE = 'TOTAL_COUNT_PAGE';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  totalPages: 0,
  currentPage: 1,
  sizePage: 10,
  isFetching: true,
  followingProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArr(state.users, action.userId, "id", { followed: true })
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArr(state.users, action.userId, "id", { followed: false })
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case TOTAL_COUNT_PAGE: {
      return {
        ...state,
        totalPages: action.total,
      };
    }
    case TOGGLE_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingProgress: action.isFollowing
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter(id => id !== action.userId)
      };
    }
    default: return state;
  }
};

export default usersReducer;


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


export const toggleIsFollowingProgress = (isFollowing, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFollowing,
    userId,
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

const followUnFollowFlow = (user, methodAPI, actionCreator) => {
  return async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, user.id));
    const response = await methodAPI(user);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(user.id));
    }
    dispatch(toggleIsFollowingProgress(false, user.id));
  }
};

export const unFollowUsers = (user) => {
  return (dispatch) => {
    followUnFollowFlow(dispatch, user, dataAPI.unFollowUser.bind(dataAPI), unfollow);
  }
}

export const followUsers = (user) => {
  return (dispatch) => {
    followUnFollowFlow(dispatch, user, dataAPI.followUser.bind(dataAPI), follow);
  }
}