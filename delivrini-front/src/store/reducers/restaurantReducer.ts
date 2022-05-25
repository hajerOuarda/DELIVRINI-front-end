import { restaurantActions } from "../actions/types";


interface RestaurantInfo {
    id: number
    name: string,
    email: string,
    address: string,
    zipCode: string,
    street: string
}

interface RestaurantState {
    isLoading: boolean;
    restaurantInfo: RestaurantInfo[];
    error: string
}
const initialState: RestaurantState = {
    isLoading: false,
    restaurantInfo: [] as RestaurantInfo[],
    error: " "
};


export default function RestaurantReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case restaurantActions.LIST_RESTAURANT_SUCCESS:
            return {
                ...state,
                isLoading: true,
                restaurantInfo: payload
            };
        case restaurantActions.LIST_RESTAURANT_FAILED:
            return {
                ...state,
                error: payload
            };
        case restaurantActions.DELETE_RESTAURANT_SUCCESS:

            return {
                ...state,
                isLoading: true,
                restaurantInfo: state.restaurantInfo.filter(({ id }) => id !== +payload.id)
            };
        case restaurantActions.DELETE_RESTAURANT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case restaurantActions.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                isLoading: true,
                userInfo: payload
            };
        case restaurantActions.CREATE_RESTAURANT_FAILED:
            return {
                ...state,
                error: payload
            };
        case restaurantActions.EDIT_RESTAURANT_SUCCESS:
            return {
                ...state,
                isLoading: true,
                restaurantInfo: payload
            };
        case restaurantActions.EDIT_RESTAURANT_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
