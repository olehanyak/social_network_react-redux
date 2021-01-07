import { GenericThunkType, InferActionsTypes } from './../redux_store';
import { ResultCodeEnum } from './../../api/api';
import { UsersType } from './../../types/types';
import { dataAPI } from "../../api/users-api";
import { updateObjectInArr } from "../../utils/object.helpers";
import { Dispatch } from 'redux';

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = GenericThunkType<ActionsTypes>

const initialState = {
  users: [] as Array<UsersType>,
  totalPages: 0,
  currentPage: 1,
  sizePage: 10,
  isFetching: true,
  followingProgress: [] as Array<number>, //array of users ids
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/FOLLOW': {
      return {
        ...state,
        users: updateObjectInArr(state.users, action.userId, "id", { followed: true })
      };
    }
    case 'SN/UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArr(state.users, action.userId, "id", { followed: false })
      };
    }
    case 'SN/SET_USERS': {
      return {
        ...state,
        users: action.users,
      };
    }
    case 'SN/SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case 'SN/TOTAL_COUNT_PAGE': {
      return {
        ...state,
        totalPages: action.total,
      };
    }
    case 'SN/TOGGLE_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case 'SN/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {
  follow: (userId: number) => ({ type: 'SN/FOLLOW', userId } as const),
  unfollow: (userId: number) => {
    return {
      type: 'SN/UNFOLLOW',
      userId,
    } as const
  },

  setUsers: (users: Array<UsersType>) => {
    return {
      type: 'SN/SET_USERS',
      users,
    } as const
  },

  setCurrentPage: (currentPage: number) => {
    return {
      type: 'SN/SET_CURRENT_PAGE',
      currentPage,
    } as const
  },

  totalCountPage: (total: number) => {
    return {
      type: 'SN/TOTAL_COUNT_PAGE',
      total,
    } as const
  },

  setToggleIsFetching: (isFetching: boolean) => {
    return {
      type: 'SN/TOGGLE_FETCHING',
      isFetching,
    } as const
  },

  toggleIsFollowingProgress: (isFollowing: boolean, userId: number) => {
    return {
      type: 'SN/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFollowing,
      userId,
    } as const
  },
}

export const getUsers = (currentPage: number, sizePage: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setToggleIsFetching(true));
    const userData = await dataAPI.getUsers(currentPage, sizePage)
    dispatch(actions.setToggleIsFetching(false));
    dispatch(actions.setUsers(userData.items));
    dispatch(actions.totalCountPage(userData.totalCount));
  }
}

export const selectPages = (page: number, sizePage: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setToggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    const usersPageData = await dataAPI.getUsersPage(page, sizePage)

    dispatch(actions.setToggleIsFetching(false));
    dispatch(actions.setUsers(usersPageData.items));
  }
}

const followUnFollowFlow = async (dispatch: DispatchType, userId: number, methodAPI: any, actionCreator: (userId: number) => ActionsTypes) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId));
  const response = await methodAPI(userId);

  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export const unFollowUsers = (userId: number): ThunkType => {
  return async (dispatch) => {
    followUnFollowFlow(dispatch, userId, dataAPI.unFollowUser.bind(dataAPI), actions.unfollow);
  }
}

export const followUsers = (userId: number): ThunkType => {
  return async (dispatch) => {
    followUnFollowFlow(dispatch, userId, dataAPI.followUser.bind(dataAPI), actions.follow);
  }
}

export default usersReducer;