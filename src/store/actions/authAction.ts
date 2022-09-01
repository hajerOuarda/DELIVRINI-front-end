import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { authenticationService } from "../services";
import { authenticationActions } from "./types";

//

const sendLoginAction =
  (formValue: { email: string; password: string }) =>
    (dispatch: any): Promise<void> => {
      return authenticationService
        .sendLogin(formValue.email, formValue.password)
        .then((data) => {
          dispatch({
            type: authenticationActions.LOGIN_SUCCESS,
            payload: data,
          });
          dispatch(
            setSnackbar(
              true,
              "success",
              "you successfully Logged in!"
            ))
          return data;
        })
        .catch((error) => {
          const message = (error && error.message) || error || 'Auth errors';
          dispatch({
            type: authenticationActions.LOGIN_FAIL,
            payload: message,
          });

          return;
        });
    };

const sendRegisterAction =
  (formValue: { firstName: string, lastName: string, address: string, phone: string, zipCode: string, street: string, email: string, password: string }, role: string, restaurant: string) =>
    (dispatch: any): Promise<void> => {
      return authenticationService
        .sendRegister(formValue.firstName, formValue.lastName, formValue.address, formValue.phone, formValue.zipCode, formValue.street, formValue.email, formValue.password, role, restaurant)
        .then((data) => {
          dispatch({
            type: authenticationActions.REGISTER_SUCCESS,
            payload: data,
          });
          dispatch(
            setSnackbar(
              true,
              "success",
              "you successfully signed up !"
            ))
          return data;
        })
        .catch((error) => {
          const message = (error && error.message) || error || 'Auth errors';
          dispatch({
            type: authenticationActions.REGISTER_FAIL,
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
            type: authenticationActions.RESET_SUCCESS,
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
            type: authenticationActions.RESET_FAIL,
            payload: message,
          });
          return;
        });
    };


const sendLogoutAction = () => (dispatch: any) => {
  authenticationService.sendLogout();
  dispatch({
    type: authenticationActions.LOGOUT,
  });

};

export { sendLoginAction, sendLogoutAction, sendRegisterAction, sendResetPasswordAction };
