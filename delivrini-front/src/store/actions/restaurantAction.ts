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
                    // console.log("list data", data);

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
                    console.log("list data", data);
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

const createRestaurantAction =
    (formValue: { restaurantName: string, phone: string, email: string, address: string, zipCode: string, street: string }) =>
        (dispatch: any): Promise<void> => {
            return restaurantService
                .createRestaurant(formValue.restaurantName, formValue.phone, formValue.email, formValue.address, formValue.zipCode, formValue.street)
                .then((data) => {
                    dispatch({
                        type: restaurantActions.CREATE_RESTAURANT_SUCCESS,
                        payload: data,
                    });
                    console.log("list data deletion", data);
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
                    return;
                });
        };


export { listRestaurantAction, deleteRestaurantAction, createRestaurantAction }