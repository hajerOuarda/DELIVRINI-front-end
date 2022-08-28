import { Typography } from "@mui/material";

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export function GenericErrorDialog(props: any) {

    return (<Typography color="red">  {props.message}  <ErrorOutlineIcon> </ErrorOutlineIcon> </Typography>)
}