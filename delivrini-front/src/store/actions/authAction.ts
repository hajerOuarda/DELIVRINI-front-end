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

const sendRegisterAction =
  (formValue: { firstName: string, lastName: string, address: string, phone: string, zipCode: string, email: string, password: string, role: string }) =>
    (dispatch: any): Promise<void> => {
      return authenticationService
        .sendRegister(formValue.firstName, formValue.lastName, formValue.address, formValue.phone, formValue.zipCode, formValue.email, formValue.password, formValue.role)
        .then((data) => {
          dispatch({
            type: userActions.REGISTER_SUCCESS,
            payload: data,
          });
          return data;
        })
        .catch((error) => {
          const message =
            error.message ||
            error.toString();
          dispatch({
            type: userActions.REGISTER_FAIL,
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

export { sendLoginAction, sendLogoutAction, sendRegisterAction };
