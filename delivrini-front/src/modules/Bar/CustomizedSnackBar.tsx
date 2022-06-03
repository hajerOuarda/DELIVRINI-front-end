import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSnackbar } from "../../store/reducers/customizedSnackBarReducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CustomizedSnackbars = () => {

    const dispatch = useAppDispatch();
    const snackbarOpen = useAppSelector(state => state.snackbar.snackbarOpen);
    const snackbarType = useAppSelector(state => state.snackbar.snackbarType);
    const snackbarMessage = useAppSelector(state => state.snackbar.snackbarMessage);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSnackbar(false, snackbarType, snackbarMessage));
    };

    return (

        <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                color={snackbarType}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>

    );
};

export default CustomizedSnackbars;
