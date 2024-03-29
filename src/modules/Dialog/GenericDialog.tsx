import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';



export interface ConfirmationDialogRawProps {

    title?: string;
    open: boolean;
    onClose: (value?: string) => void;
    body?: JSX.Element;
    action?: () => void
}

export default function GenericDialog(props: ConfirmationDialogRawProps) {
    const { onClose, title, open, action = () => { }, body = null, ...other } = props;
    const [value, setValue] = React.useState(title);
    const radioGroupRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (!open) {
            setValue(title);
        }
    }, [title, open]);


    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        action()
        onClose(value);
    };


    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 690, maxHeight: 470 } }}
            maxWidth="xs"

            open={open}
            onClose={handleCancel}
            {...other}
        >
            <DialogTitle >

                {title}
            </DialogTitle>

            <DialogContent>
                {body}
            </DialogContent>
            <DialogActions>
                <Button autoFocus variant='outlined' onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant='outlined' onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

