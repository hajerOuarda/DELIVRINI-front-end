import { authenticationService } from "../services";
import { userActions } from "./types";

//

const sendLoginAction =
  (formValue: { email: string; password: string }) =>
    (dispatch: any): Promise<void> => {
      return authenticationService
        .sendLogin(formValue.email, formValue.password)
        .then((data) => {
          dispatch({
            type: userActions.LOGIN_SUCCESS,
            payload: data,
          });

          return data;
        })
        .catch((error) => {
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

          return;
        });
    };

const sendLogoutAction = () => (dispatch: any) => {
  authenticationService.sendLogout();
  dispatch({
    type: userActions.LOGOUT,
  });
};

export { sendLoginAction, sendLogoutAction };
