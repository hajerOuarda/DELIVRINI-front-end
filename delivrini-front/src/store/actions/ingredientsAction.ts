import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { ingredientsService } from "../services/ingredientsService";
import { ingredientsActions } from "./types";



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
export { createIngredientsAction }