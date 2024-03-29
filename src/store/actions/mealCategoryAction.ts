import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { mealCategoryService } from "../services/mealCategoryService";
import { mealCategoryActions } from "./types";


export interface formikMealCategory {
    name: string,
    description: string,
    image: string,

}

const listMealCategoryAction =
    (page: number, rowPerPage: number, restaurant: any) =>
        (dispatch: any): Promise<void> => {
            return mealCategoryService
                .getMealCategoryList(page, rowPerPage, restaurant)
                .then((data) => {
                    dispatch({
                        type: mealCategoryActions.LIST_MEALCATEGORY_SUCCESS,
                        payload: data,
                    });
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: mealCategoryActions.LIST_MEALCATEGORY_FAILED,
                        payload: message,
                    });
                    return;
                });
        };

// delete MealCategory

const deleteMealCategoryAction =
    (id: number) =>
        (dispatch: any): Promise<void> => {
            return mealCategoryService
                .deleteMealCategory(id)
                .then((data) => {
                    dispatch({
                        type: mealCategoryActions.DELETE_MEALCATEGORY_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "Meal Category successfully deleted!"
                        ))
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: mealCategoryActions.DELETE_MEALCATEGORY_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while deleting Meal Category !"
                        ))
                    return;
                });
        };


const createMealCategoryAction =
    (values: formikMealCategory, restaurant: string) =>
        (dispatch: any): Promise<void> => {
            return mealCategoryService
                .createMealCategory(values, restaurant)
                .then((data) => {
                    dispatch({
                        type: mealCategoryActions.CREATE_MEALCATEGORY_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "MealCategory successfully created!"
                        ))
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: mealCategoryActions.CREATE_MEALCATEGORY_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while creating MealCategory !"
                        ))
                    return;
                });
        };

const editMealCategoryAction =
    (values: formikMealCategory, id: number) =>
        (dispatch: any): Promise<void> => {
            return mealCategoryService
                .editMealCategory(values, id)
                .then((data) => {
                    dispatch({
                        type: mealCategoryActions.EDIT_MEALCATEGORY_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "MealCategory successfully updated!"
                        ))
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: mealCategoryActions.EDIT_MEALCATEGORY_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while updating MealCategory,  name already exists!"
                        ))
                    return;
                });
        };


export { listMealCategoryAction, deleteMealCategoryAction, createMealCategoryAction, editMealCategoryAction }