import { extrasService } from "../services/extrasService";
import { extrasActions } from "./types";



const listExtrasAction =
    (element: any) =>
        (dispatch: any): Promise<void> => {
            return extrasService
                .getExtrasList(element)
                .then((data) => {
                    dispatch({
                        type: extrasActions.LIST_EXTRAS_SUCCESS,
                        payload: data,
                    });
                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: extrasActions.LIST_EXTRAS_FAILED,
                        payload: message,
                    });
                    return;
                });
        };

const createExtrasAction =
    (values: any[], elementName: any) =>
        (dispatch: any): Promise<void> => {
            console.log("extras ", values);

            return extrasService
                .createExtras(values, elementName)
                .then((data) => {
                    dispatch({
                        type: extrasActions.CREATE_EXTRAS_SUCCESS,
                        payload: data,
                    });

                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: extrasActions.CREATE_EXTRAS_FAILED,
                        payload: message,
                    });
                    
                    return;
                });
        };

const editExtrasAction =
    (values: any[], id: any, element: string) =>
        (dispatch: any): Promise<void> => {
            return extrasService
                .editExtras(values, id, element)
                .then((data) => {
                    dispatch({
                        type: extrasActions.EDIT_EXTRAS_SUCCESS,
                        payload: data,
                    });

                    return data;
                })
                .catch((error) => {
                    const message =
                        error.message ||
                        error.toString();
                    dispatch({
                        type: extrasActions.EDIT_EXTRAS_FAILED,
                        payload: message,
                    });

                    return;
                });
        };


export { createExtrasAction, listExtrasAction, }