

export interface ConfirmationDeleteProps {
    name?: string;
    body?: JSX.Element;

}

export function DeleteRestaurantDialog(props: ConfirmationDeleteProps) {

    return (<label> are you sure you want to delete this item {props.name}?</label>)
}