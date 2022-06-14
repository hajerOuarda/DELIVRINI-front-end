import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { mealCategoryService } from "../services/mealCategoryService";
import { mealCategoryActions } from "./types";


export interface formikMealCategory {
    name: string,
    description: string,
    image: string,

}

const listMealCategoryAction =
    (page: number, rowPerPage: number) =>
        (dispatch: any): Promise<void> => {
            return mealCategoryService
                .getMealCategoryList(page, rowPerPage)
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
                    console.log("list data error ", message);
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
                            "Meal Category successfully created!"
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
    (values: formikMealCategory) =>
        (dispatch: any): Promise<void> => {
            return mealCategoryService
                .createMealCategory(values)
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
                    console.log("list data  ", data);
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
                            "error while creating MealCategory,  name already exist!"
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
                    console.log("list data  ", data);
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