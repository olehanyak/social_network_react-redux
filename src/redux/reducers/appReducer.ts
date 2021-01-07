
import { GenericThunkType, InferActionsTypes } from "../redux_store";
import { authUserLogin } from "./authReducer";

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof appActions>
type ThunkType = GenericThunkType<ActionsTypes>

const initialState = {
  initializedApp: false,
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/APP/SET_INITIALIZED": {
      return {
        ...state,
        initializedApp: true,
      }
    }
    default: return state;
  }
};

export const appActions = {
  setInitializing: () => ({ type: "SN/APP/SET_INITIALIZED" } as const)
};

export const initializing = (): ThunkType => {
  return async (dispatch) => {
    let promise = await dispatch(authUserLogin());
    Promise.all([promise])
    dispatch(appActions.setInitializing())
  }
};

export default appReducer;