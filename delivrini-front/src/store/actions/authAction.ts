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
  (formValue: { firstName: string, lastName: string, address: string, phone: string, zipCode: string, street: string, email: string, password: string, role: string }) =>
    (dispatch: any): Promise<void> => {
      return authenticationService
        .sendRegister(formValue.firstName, formValue.lastName, formValue.address, formValue.phone, formValue.zipCode, formValue.street, formValue.email, formValue.password, formValue.role)
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

const sendResetPasswordAction =
  (formValue: { email: string }) =>
    (dispatch: any): Promise<void> => {
      return authenticationService
        .sendResetPassword(formValue.email)
        .then((data) => {
          dispatch({
            type: userActions.RESET_SUCCESS,
            payload: data,
          });
          return data;
        })
        .catch((error) => {
          const message =
            (error.response) ||
            error.message ||
            error.toString();
          dispatch({
            type: userActions.RESET_FAIL,
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

export { sendLoginAction, sendLogoutAction, sendRegisterAction, sendResetPasswordAction };
