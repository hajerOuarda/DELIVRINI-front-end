import { restaurantCategoryActions } from "../actions/types";


export interface RestaurantCategoryInfo {
    id: number
    name: string,
    description: string,
    image: string,

}

interface RestaurantCategoryState {

    restaurantCategoryInfo: RestaurantCategoryInfo[];
    error: string
}
const initialState: RestaurantCategoryState = {

    restaurantCategoryInfo: [] as RestaurantCategoryInfo[],
    error: " "
};


export default function RestaurantCategoryReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case restaurantCategoryActions.LIST_RESTAURANTCATEGORY_SUCCESS:
            return {
                ...state,
                restaurantCategoryInfo: payload
            };
        case restaurantCategoryActions.LIST_RESTAURANTCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        case restaurantCategoryActions.DELETE_RESTAURANTCATEGORY_SUCCESS:
            return {
                ...state,
                restaurantCategoryInfo: state.restaurantCategoryInfo.filter(({ id }) => id !== +payload.id)
            };
        case restaurantCategoryActions.DELETE_RESTAURANTCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        case restaurantCategoryActions.CREATE_RESTAURANTCATEGORY_SUCCESS:
            console.log(payload)
            return {
                ...state,
                restaurantCategoryInfo: [...state.restaurantCategoryInfo, payload.restaurantCategory]
            };
        case restaurantCategoryActions.CREATE_RESTAURANTCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        case restaurantCategoryActions.EDIT_RESTAURANTCATEGORY_SUCCESS:
            const oldRestoIndex = state.restaurantCategoryInfo.findIndex(resto => resto.id === payload.id)
            state.restaurantCategoryInfo[oldRestoIndex] = payload
            return {
                ...state,
                restaurantCategoryInfo: [...state.restaurantCategoryInfo]
            };
        case restaurantCategoryActions.EDIT_RESTAURANTCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
