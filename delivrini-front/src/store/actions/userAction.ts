import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { userService } from "../services/userService";
import { userActions } from "./types";


const listUserAction =
    (page: number, rowPerPage: number) =>
        (dispatch: any): Promise<void> => {
            return userService
                .getUserList(page, rowPerPage)
                .then((data) => {
                    dispatch({
                        type: userActions.LIST_USER_SUCCESS,
                        payload: data,
                    });
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: userActions.LIST_USER_FAILED,
                        payload: message,
                    });
                    console.log("list user error ", message);
                    return;
                });
        };

const deleteUserAction =
    (id: number) =>
        (dispatch: any): Promise<void> => {
            return userService
                .deleteUser(id)
                .then((data) => {
                    dispatch({
                        type: userActions.DELETE_USER_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "User successfully deleted!"
                        ))
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: userActions.DELETE_USER_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while deleting user !"
                        ))
                    return;
                });
        };

export { listUserAction, deleteUserAction } 