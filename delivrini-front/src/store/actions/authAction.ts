import { AnyAction, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authenticationService } from "../services";
import { RootState } from "../store";
import { userActions } from "./types";

const sendLoginAction =
  (formValue: {
    email: string;
    password: string;
  }): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  (dispatch: ThunkDispatch<RootState, unknown, AnyAction>):Promise<void>=> {
    return authenticationService
      .sendLogin(formValue.email, formValue.password)
      .then(
        (data) => {
          dispatch({
            type: userActions.LOGIN_SUCCESS,
            payload: data,
          });
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          dispatch({
            type: userActions.LOGIN_FAIL,
            payload: message,
          });

          return Promise.reject();
        }
      );
  };

// function success(user: any) {
//   return { type: userActions.LOGIN_SUCCESS, user: user };
// }
// function failure(error: any) {
//   return { type: userActions.LOGIN_FAIL, error };
// }

const sendLogoutAction = () => (dispatch: Dispatch) => {
  authenticationService.sendLogout();
  dispatch({
    type: userActions.LOGOUT,
  });
};

export {
  sendLoginAction,
  sendLogoutAction
}