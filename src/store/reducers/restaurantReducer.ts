import { restaurantActions } from "../actions/types";


interface RestaurantInfo {
    id: number
    name: string,
    email: string,
    address: string,
    zipCode: string,
    street: string,
    phone: string,
}

interface RestaurantState {

    restaurantInfo: RestaurantInfo[];
    error: string
}
const initialState: RestaurantState = {

    restaurantInfo: [] as RestaurantInfo[],
    error: " "
};


export default function RestaurantReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case restaurantActions.LIST_RESTAURANT_SUCCESS:
            return {
                ...state,
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
                restaurantInfo: state.restaurantInfo.filter(({ id }) => id !== +payload.id)
            };
        case restaurantActions.DELETE_RESTAURANT_FAILED:
            return {
                ...state,
                error: payload
            };
        case restaurantActions.CREATE_RESTAURANT_SUCCESS:
             return {
                ...state,
                restaurantInfo: [...state.restaurantInfo, payload.restaurant] //otherwise it will only return the current new restaurant hence the map function in list will cause error
            };
        case restaurantActions.CREATE_RESTAURANT_FAILED:
            return {
                ...state,
                error: payload
            };
        case restaurantActions.EDIT_RESTAURANT_SUCCESS:
            const oldRestoIndex = state.restaurantInfo.findIndex(resto => resto.id === payload.id)
            state.restaurantInfo[oldRestoIndex]=payload
            return {
                ...state,
                restaurantInfo: [...state.restaurantInfo]
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
