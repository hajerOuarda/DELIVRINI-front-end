import { authenticationActions } from "../actions/types";

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
    case authenticationActions.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: true,
        userInfo: payload
      };
    case authenticationActions.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: false,
        userInfo: payload
      };
    case authenticationActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: payload.user,
      };
    case authenticationActions.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: payload,
      };
    case authenticationActions.RESET_SUCCESS:
      return {
        ...state,
        userInfo: payload
      };
    case authenticationActions.RESET_FAIL:
      return {
        ...state,
        userInfo: payload
      };
    case authenticationActions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    default:
      return state;
  }
}
