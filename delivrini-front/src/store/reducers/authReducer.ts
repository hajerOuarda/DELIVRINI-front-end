import { userActions } from "../actions/types";

interface LoginState {
  error: string;
  isLoggedIn: boolean;
  userInfo: null;
}

// interface Action {
//   type:string
//   payload?:any
// }
const user = localStorage.getItem("user");
const initialState: LoginState = user
  ? { isLoggedIn: true, error: "", userInfo: JSON.parse(user || "{}") }
  : {
      isLoggedIn: false,
      error: "",
      userInfo: null,
    };

export default function authReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case userActions.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case userActions.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error,
      };
    case userActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: payload.user,
      };
    case userActions.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.error,
      };
    case userActions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
