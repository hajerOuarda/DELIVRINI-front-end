import { combineReducers } from "redux";
import authReducer from "./authReducer";
import SnackBarReducer from "./customizedSnackBarReducer";
import RestaurantReducer from "./restaurantReducer";
import RestaurantCategoryReducer from "./restaurantCategoryReducer"
export default combineReducers({
    authReducer,
    RestaurantReducer,
    RestaurantCategoryReducer,
    snackbar: SnackBarReducer
});

