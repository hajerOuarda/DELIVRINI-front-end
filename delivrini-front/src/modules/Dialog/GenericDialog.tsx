import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';



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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"

            open={open}
            onClose={handleCancel}
            {...other}
        >
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                {body}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

