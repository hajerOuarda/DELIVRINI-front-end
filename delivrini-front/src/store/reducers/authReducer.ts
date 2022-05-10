import { userInfo } from "os";
import { userActions } from "../actions/types";

interface LoginState {
  isLoggedIn: boolean;
  userInfo: any;
  isRegistered: any
}
const initialState: LoginState = {
  isLoggedIn: false,
  isRegistered: false,
  userInfo: {},
};


export default function authReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case userActions.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: true,
        userInfo: payload
      };
    case userActions.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: payload
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
        userInfo: payload,
      };
    case userActions.RESET_SUCCESS:
      return {
        ...state,
        userInfo: payload
      };
    case userActions.RESET_FAIL:
      return {
        ...state,
        userInfo: payload
      };
    case userActions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    default:
      return state;
  }
}
