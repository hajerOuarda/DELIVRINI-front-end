import { snackBarActions } from "../actions/types";

const initialState = {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: ""
};

export default function SnackBarReducer(state = initialState, action: any) {
    switch (action.type) {
        case snackBarActions.SET_SNACKBAR:
            const { snackbarOpen, snackbarMessage, snackbarType } = action;
            return {
                ...state,
                snackbarOpen,
                snackbarType,
                snackbarMessage
            };
        default:
            return state;
    }
};

export const setSnackbar = (
    snackbarOpen: any,
    snackbarType = "success",
    snackbarMessage = ""
) => ({
    type: snackBarActions.SET_SNACKBAR,
    snackbarOpen,
    snackbarType,
    snackbarMessage
});
