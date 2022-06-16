import { ReactElement, useEffect } from "react";
import RestaurantCategoryPage from "../pages/RestaurantCategory";
import RestaurantPage from "../pages/RestaurantPage";
import SignUpPage from "../pages/SignUpPage";
import { listMealCategoryAction } from "../store/actions/mealCategoryAction";
import { listRestaurantAction } from "../store/actions/restaurantAction";
import { listRestaurantCategoryAction } from "../store/actions/restaurantCategoryAction";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface Props {
    children: React.ReactNode | ReactElement[];
}
const ReducerLayout = (props: Props) => {
    const dispatch = useAppDispatch();
    // const restaurant = useAppSelector((state) => state.authReducer.userInfo.fk_restaurant);

    useEffect(() => {
        dispatch<any>(listRestaurantAction(0, 50))
        dispatch<any>(listRestaurantCategoryAction(0, 50))
        dispatch<any>(listMealCategoryAction(0, 50, ""))
    }, []);
    return (
        < >
            {props.children}
        </>
    );
};

export default ReducerLayout;
