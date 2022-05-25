import { combineReducers } from "redux";
import authReducer from "./authReducer";
import RestaurantReducer from "./restaurantReducer";

export default combineReducers({
    authReducer,
    RestaurantReducer,
});

