import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { restaurantCategoryService } from "../services/restaurantCategoryService";
import { restaurantCategoryActions } from "./types";

export interface formikRestaurantCategory {
    name: string,
    description: string,
    image: string,

}


const listRestaurantCategoryAction =
    (page: number, rowPerPage: number) =>
        (dispatch: any): Promise<void> => {
            return restaurantCategoryService
                .getRestaurantCategoryList(page, rowPerPage)
                .then((data) => {
                    dispatch({
                        type: restaurantCategoryActions.LIST_RESTAURANTCATEGORY_SUCCESS,
                        payload: data,
                    });
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: restaurantCategoryActions.LIST_RESTAURANTCATEGORY_FAILED,
                        payload: message,
                    });
                    console.log("list data error ", message);
                    return;
                });
        };

// delete RestaurantCategory

const deleteRestaurantCategoryAction =
    (id: number) =>
        (dispatch: any): Promise<void> => {
            return restaurantCategoryService
                .deleteRestaurantCategory(id)
                .then((data) => {
                    dispatch({
                        type: restaurantCategoryActions.DELETE_RESTAURANTCATEGORY_SUCCESS,
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
                        type: restaurantCategoryActions.DELETE_RESTAURANTCATEGORY_FAILED,
                        payload: message,
                    });
                    return;
                });
        };


const createRestaurantCategoryAction =
    (values: formikRestaurantCategory) =>
        (dispatch: any): Promise<void> => {
            return restaurantCategoryService
                .createRestaurantCategory(values)
                .then((data) => {
                    dispatch({
                        type: restaurantCategoryActions.CREATE_RESTAURANTCATEGORY_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "RestaurantCategory successfully created!"
                        ))
                    console.log("list data  ", data);
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: restaurantCategoryActions.CREATE_RESTAURANTCATEGORY_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while creating RestaurantCategory,  name already exist!"
                        ))
                    return;
                });
        };

const editRestaurantCategoryAction =
    (values: formikRestaurantCategory, id: number) =>
        (dispatch: any): Promise<void> => {
            return restaurantCategoryService
                .editRestaurantCategory(values, id)
                .then((data) => {
                    dispatch({
                        type: restaurantCategoryActions.EDIT_RESTAURANTCATEGORY_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "RestaurantCategory successfully updated!"
                        ))
                    console.log("list data  ", data);
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: restaurantCategoryActions.EDIT_RESTAURANTCATEGORY_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while updating RestaurantCategory,  name already exists!"
                        ))
                    return;
                });
        };


export { listRestaurantCategoryAction, deleteRestaurantCategoryAction, createRestaurantCategoryAction, editRestaurantCategoryAction }