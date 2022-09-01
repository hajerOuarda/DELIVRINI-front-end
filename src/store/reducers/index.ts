import { combineReducers } from "redux";
import authReducer from "./authReducer";
import SnackBarReducer from "./customizedSnackBarReducer";
import RestaurantReducer from "./restaurantReducer";
import RestaurantCategoryReducer from "./restaurantCategoryReducer"
import MealCategoryReducer from "./mealCategoryReducer"
import ElementReducer from './elementReducer'
import UserReducer from './userReducer'
import IngredientsReducer from './ingredientsReducer'
import productReducer from '../slices/product';

export default combineReducers({
    authReducer,
    UserReducer,
    RestaurantReducer,
    RestaurantCategoryReducer,
    MealCategoryReducer,
    ElementReducer,
    IngredientsReducer,
    snackbar: SnackBarReducer,
    product: productReducer,
});

