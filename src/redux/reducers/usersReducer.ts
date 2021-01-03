import { ResultCodeEnum } from './../../api/api';
import { UsersType } from './../../types/types';
import { dataAPI } from "../../api/api";
import { updateObjectInArr } from "../../utils/object.helpers";
import { AppStateType } from '../redux_store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

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

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType | TotalCountPageActionType | SetToggleIsFetchingActionType | ToggleIsFollowingProgressActionType

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

// type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, sizePage: number): ThunkType => {
  return async (dispatch) => {
    dispatch(setToggleIsFetching(true));
    const userData = await dataAPI.getUsers(currentPage, sizePage)
    dispatch(setToggleIsFetching(false));
    dispatch(setUsers(userData.items));
    dispatch(totalCountPage(userData.totalCount));
  }
}

export const selectPages = (page: number, sizePage: number): ThunkType => {
  return async (dispatch) => {
    dispatch(setToggleIsFetching(true));
    dispatch(setCurrentPage(page));
    const usersPageData = await dataAPI.getUsersPage(page, sizePage)

    dispatch(setToggleIsFetching(false));
    dispatch(setUsers(usersPageData.items));
  }
}

const followUnFollowFlow = async (dispatch: DispatchType, userId: number, methodAPI: any, actionCreator: (userId: number) => FollowActionType | UnfollowActionType) => {
  dispatch(toggleIsFollowingProgress(true, userId));
  const response = await methodAPI(userId);

  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgress(false, userId));
};

export const unFollowUsers = (userId: number): ThunkType => {
  return async (dispatch) => {
    followUnFollowFlow(dispatch, userId, dataAPI.unFollowUser.bind(dataAPI), unfollow);
  }
}

export const followUsers = (userId: number): ThunkType => {
  return async (dispatch) => {
    followUnFollowFlow(dispatch, userId, dataAPI.followUser.bind(dataAPI), follow);
  }
}