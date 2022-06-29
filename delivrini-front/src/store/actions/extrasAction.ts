import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { ingredientsService } from "../services/ingredientsService";
import { ingredientsActions } from "./types";

const listIngredientsAction =
    (element: any) =>
        (dispatch: any): Promise<void> => {
            return ingredientsService
                .getIngredientsList(element)
                .then((data) => {
                    dispatch({
                        type: ingredientsActions.LIST_INGREDIENTS_SUCCESS,
                        payload: data,
                    });
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: ingredientsActions.LIST_INGREDIENTS_FAILED,
                        payload: message,
                    });
                    return;
                });
        };

const createIngredientsAction =
    (values: any[], elementName: any) =>
        (dispatch: any): Promise<void> => {
            console.log("ingredients ", values);

            return ingredientsService
                .createIngredients(values, elementName)
                .then((data) => {
                    dispatch({
                        type: ingredientsActions.CREATE_INGREDIENTS_SUCCESS,
                        payload: data,
                    });

                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: ingredientsActions.CREATE_INGREDIENTS_FAILED,
                        payload: message,
                    });

                    return;
                });
        };

const editIngredientsAction =
    (values: any[], id: any, element: string) =>
        (dispatch: any): Promise<void> => {
            return ingredientsService
                .editIngredients(values, id, element)
                .then((data) => {
                    dispatch({
                        type: ingredientsActions.EDIT_INGREDIENTS_SUCCESS,
                        payload: data,
                    });

                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: ingredientsActions.EDIT_INGREDIENTS_FAILED,
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


export { createIngredientsAction, listIngredientsAction, editIngredientsAction }