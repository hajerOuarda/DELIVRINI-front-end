import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { elementService } from "../services/elementService";
import { createExtrasAction } from "./extrasAction";
import { createIngredientsAction, editIngredientsAction, listIngredientsAction } from "./ingredientsAction";
import { elementActions } from "./types";


export interface formikElement {
    name: string,
    description: string,
    image: string,
    price: string,
    fk_Mealcategory: string

}

const listElementAction =
    (page: number, rowPerPage: number, restaurant: any) =>
        (dispatch: any): Promise<void> => {
            return elementService
                .getElementList(page, rowPerPage, restaurant)
                .then((data) => {
                    dispatch({
                        type: elementActions.LIST_ELEMENT_SUCCESS,
                        payload: data,
                    });

                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: elementActions.LIST_ELEMENT_FAILED,
                        payload: message,
                    });
                    return;
                });
        };

// delete Element

const deleteElementAction =
    (id: number) =>
        (dispatch: any): Promise<void> => {
            return elementService
                .deleteElement(id)
                .then((data) => {
                    dispatch({
                        type: elementActions.DELETE_ELEMENT_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "Element successfully deleted!"
                        ))
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: elementActions.DELETE_ELEMENT_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while deleting Element !"
                        ))
                    return;
                });
        };


const createElementAction =
    (values: formikElement, restaurant: string, ingredients: any[], listExtras: any[]) =>
        (dispatch: any): Promise<void> => {
            console.log("ingredients ", ingredients);

            return elementService
                .createElement(values, restaurant)
                .then((data) => {
                    dispatch({
                        type: elementActions.CREATE_ELEMENT_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "Element successfully created!"
                        ))
                    dispatch(
                        createIngredientsAction(ingredients, data.element.name)
                    )
                    //TODO dispatch extras too 
                    dispatch(
                        createExtrasAction(listExtras, data.element.name)
                    )
                    return data;

                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: elementActions.CREATE_ELEMENT_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while creating Element,  name already exist!"
                        ))
                    return;
                });
        };

const editElementAction =
    (values: formikElement, id: number, ingredients: any[], listExtras: any[]) =>
        (dispatch: any): Promise<void> => {
            return elementService
                .editElement(values, id)
                .then((data) => {
                    dispatch({
                        type: elementActions.EDIT_ELEMENT_SUCCESS,
                        payload: data,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            "Element successfully updated!"
                        ))
                    dispatch(
                        editIngredientsAction(ingredients, data.element.name)
                    )
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: elementActions.EDIT_ELEMENT_FAILED,
                        payload: message,
                    });
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            "error while updating Element !"
                        ))
                    return;
                });
        };


export { listElementAction, deleteElementAction, createElementAction, editElementAction }