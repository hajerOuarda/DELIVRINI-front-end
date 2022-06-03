import { combineReducers } from "redux";
import authReducer from "./authReducer";
import SnackBarReducer from "./customizedSnackBarReducer";
import RestaurantReducer from "./restaurantReducer";

export default combineReducers({
    authReducer,
    RestaurantReducer,
    snackbar: SnackBarReducer
});

