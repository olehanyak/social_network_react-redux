
import { UsersType } from './../../types/types';
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
  users: [] as Array<UsersType>,
  totalPages: 0,
  currentPage: 1,
  sizePage: 10,
  isFetching: true,
  followingProgress: [] as Array<number>, //array of users ids
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

type FollowActionType = {
  type: typeof FOLLOW
  userId: number
}

export const follow = (userId: number): FollowActionType => {
  return {
    type: FOLLOW,
    userId,
  };
};

type UnfollowActionType = {
  type: typeof UNFOLLOW
  userId: number
}

export const unfollow = (userId: number): UnfollowActionType => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UsersType>
}

export const setUsers = (users: Array<UsersType>): SetUsersActionType => {
  return {
    type: SET_USERS,
    users,
  };
};

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

type TotalCountPageActionType = {
  type: typeof TOTAL_COUNT_PAGE
  total: number
}

export const totalCountPage = (total: number): TotalCountPageActionType => {
  return {
    type: TOTAL_COUNT_PAGE,
    total,
  };
};

type SetToggleIsFetchingActionType = {
  type: typeof TOGGLE_FETCHING
  isFetching: boolean
}

export const setToggleIsFetching = (isFetching: boolean): SetToggleIsFetchingActionType => {
  return {
    type: TOGGLE_FETCHING,
    isFetching,
  };
};

type ToggleIsFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFollowing: boolean
  userId: number
}

export const toggleIsFollowingProgress = (isFollowing: boolean, userId: number): ToggleIsFollowingProgressActionType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFollowing,
    userId,
  };
};

export const getUsers = (currentPage: number, sizePage: number) => {
  return (dispatch: any) => {
    dispatch(setToggleIsFetching(true));
    dataAPI.getUsers(currentPage, sizePage).then((data: any) => {
      dispatch(setToggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(totalCountPage(data.totalCount));
    });
  }
}

export const selectPages = (page: number, sizePage: number) => {
  return (dispatch: any) => {
    dispatch(setToggleIsFetching(true));
    dispatch(setCurrentPage(page));
    dataAPI.getUsersPage(page, sizePage).then((data: any) => {
      dispatch(setToggleIsFetching(false));
      dispatch(setUsers(data.items));
    });
  }
}

const followUnFollowFlow = async (dispatch: any, userId: number, methodAPI: any, actionCreator: any) => {
  dispatch(toggleIsFollowingProgress(true, userId));
  const response = await methodAPI(userId);
  console.log(response)
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgress(false, userId));

};

export const unFollowUsers = (userId: number) => {
  return (dispatch: any) => {
    followUnFollowFlow(dispatch, userId, dataAPI.unFollowUser.bind(dataAPI), unfollow);
  }
}

export const followUsers = (userId: number) => {
  return (dispatch: any) => {
    followUnFollowFlow(dispatch, userId, dataAPI.followUser.bind(dataAPI), follow);
  }
}