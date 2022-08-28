import { ReactElement, useEffect } from "react";
import { listRestaurantAction } from "../store/actions/restaurantAction";
import { listRestaurantCategoryAction } from "../store/actions/restaurantCategoryAction";
import { useAppDispatch } from "../store/hooks";

interface Props {
    children: React.ReactNode | ReactElement[];
}
const ReducerLayout = (props: Props) => {
    const dispatch = useAppDispatch();
    // const restaurant = useAppSelector((state) => state.authReducer.userInfo.fk_restaurant);

    useEffect(() => {
        dispatch<any>(listRestaurantAction(0, 50))
        dispatch<any>(listRestaurantCategoryAction(0, 50))
    }, [dispatch]);
    return (
        < >
            {props.children}
        </>
    );
};

export default ReducerLayout;
