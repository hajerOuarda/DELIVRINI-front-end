import { combineReducers } from "redux";
import authReducer from "./authReducer";
import SnackBarReducer from "./customizedSnackBarReducer";
import RestaurantReducer from "./restaurantReducer";
import RestaurantCategoryReducer from "./restaurantCategoryReducer"
import MealCategoryReducer from "./mealCategoryReducer"

export default combineReducers({
    authReducer,
    RestaurantReducer,
    RestaurantCategoryReducer,
    MealCategoryReducer,
    snackbar: SnackBarReducer
});

