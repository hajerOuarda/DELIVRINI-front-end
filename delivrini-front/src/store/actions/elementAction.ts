import { setSnackbar } from "../reducers/customizedSnackBarReducer";
import { elementService } from "../services/elementService";
import { elementActions } from "./types";


export interface formikElement {
    name: string,
    description: string,
    image: string,
    price: string,
    fk_Mealcategory:string

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
                    console.log("list data error ", message);
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
    (values: formikElement, restaurant: string) =>
        (dispatch: any): Promise<void> => {
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
                    console.log("list data  ", data);
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
    (values: formikElement, id: number) =>
        (dispatch: any): Promise<void> => {
            return elementService
                .editElement(values,  id)
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
                    console.log("element data  ", data);
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