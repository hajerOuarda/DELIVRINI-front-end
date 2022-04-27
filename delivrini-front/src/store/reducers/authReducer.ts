import { userActions } from "../actions/types";

interface LoginState {
  isLoggedIn: boolean;
  userInfo: any;
}
const initialState: LoginState = {
  isLoggedIn: false,
  userInfo: {},
};

// const user = JSON.parse(localStorage.getItem("user") || "{}");
// console.log("test user", user);

// const initialState: LoginState = user
//   ? { isLoggedIn: true,  userInfo: user }
//   : {
//       isLoggedIn: false,
//       userInfo: null,
//     };

// console.log("test userInfo", initialState.userInfo);

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
        // error: "FAIL_TO_REGISTER",
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
        userInfo: null,

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
