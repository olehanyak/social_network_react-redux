import { FOLLOW, SET_CURRENT_PAGE, SET_USERS, TOGGLE_FETCHING, TOGGLE_IS_FOLLOWING_PROGRESS, TOTAL_COUNT_PAGE, UNFOLLOW } from "../actions/actions";

const initialState = {
  users: [],
  totalPages: 0,
  currentPage: 1,
  sizePage: 5,
  isFetching: false,
  followingProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        })
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        })
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