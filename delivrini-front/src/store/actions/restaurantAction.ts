import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { restaurantService } from "../services/restaurantService";
import { restaurantActions } from "./types";


const listRestaurantAction =
    (page: number, rowPerPage: number) =>
        (dispatch: any): Promise<void> => {
            return restaurantService
                .getRestaurantsList(page, rowPerPage)
                .then((data) => {
                    dispatch({
                        type: restaurantActions.LIST_RESTAURANT_SUCCESS,
                        payload: data,
                    });
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: restaurantActions.LIST_RESTAURANT_FAILED,
                        payload: message,
                    });
                    console.log("list data error ", message);
                    return;
                });
        };

// delete restaurant

const deleteRestaurantAction =
    (id: number) =>
        (dispatch: any): Promise<void> => {
            return restaurantService
                .deleteRestaurant(id)
                .then((data) => {
                    dispatch({
                        type: restaurantActions.DELETE_RESTAURANT_SUCCESS,
                        payload: data,
                    });
                    console.log("list data deletion ", data);
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: restaurantActions.DELETE_RESTAURANT_FAILED,
                        payload: message,
                    });
                    return;
                });
        };

export interface formikRestaurant {
    name: string,
    phone: string,
    email: string,
    address: string,
    zipCode: string,
    street: string
}

const createRestaurantAction =
    (values: formikRestaurant, category: string) =>
        (dispatch: any): Promise<void> => {
            return restaurantService
                .createRestaurant(values, category)
                .then((data) => {
                    dispatch({
                        type: restaurantActions.CREATE_RESTAURANT_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "Restaurant successfully created!"
                        ))
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: restaurantActions.CREATE_RESTAURANT_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while creating restaurant, email or name already exist!"
                        ))
                    return;
                });
        };

const editRestaurantAction =
    (values: formikRestaurant, id: number) =>
        (dispatch: any): Promise<void> => {
            return restaurantService
                .editRestaurant(values, id)
                .then((data) => {
                    dispatch({
                        type: restaurantActions.EDIT_RESTAURANT_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "Restaurant successfully updated!"
                        ))
                    console.log("list data  ", data);
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: restaurantActions.EDIT_RESTAURANT_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while updating restaurant, email or name already exists!"
                        ))
                    return;
                });
        };


export { listRestaurantAction, deleteRestaurantAction, createRestaurantAction, editRestaurantAction }