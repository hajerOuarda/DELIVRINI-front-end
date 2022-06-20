import { combineReducers } from "redux";
import authReducer from "./authReducer";
import SnackBarReducer from "./customizedSnackBarReducer";
import RestaurantReducer from "./restaurantReducer";
import RestaurantCategoryReducer from "./restaurantCategoryReducer"
import MealCategoryReducer from "./mealCategoryReducer"
import ElementReducer from './elementReducer'
import UserReducer from './userReducer'

export default combineReducers({
    authReducer,
    RestaurantReducer,
    RestaurantCategoryReducer,
    MealCategoryReducer,
    ElementReducer,
    UserReducer,
    snackbar: SnackBarReducer
});

