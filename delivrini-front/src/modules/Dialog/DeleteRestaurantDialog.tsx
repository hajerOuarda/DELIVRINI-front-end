import { Typography } from "@mui/material";


export interface ConfirmationDeleteProps {
    name?: string;
    body?: JSX.Element;

}

export function DeleteRestaurantDialog(props: ConfirmationDeleteProps) {

    return (<Typography   color="textSecondary">are you sure you want to delete this item {props.name}?</Typography>)
}