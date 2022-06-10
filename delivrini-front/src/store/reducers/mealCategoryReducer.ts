import { mealCategoryActions } from "../actions/types";




export interface MealCategoryInfo {
    id: number
    name: string,
    description: string,
    image: string,

}

interface RestaurantCategoryState {

    mealCategoryInfo: MealCategoryInfo[];
    error: string
}
const initialState: RestaurantCategoryState = {

    mealCategoryInfo: [] as MealCategoryInfo[],
    error: " "
};


export default function MealCategoryReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case mealCategoryActions.LIST_MEALCATEGORY_SUCCESS:
            return {
                ...state,
                mealCategoryInfo: payload
            };
        case mealCategoryActions.LIST_MEALCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        case mealCategoryActions.DELETE_MEALCATEGORY_SUCCESS:
            return {
                ...state,
                mealCategoryInfo: state.mealCategoryInfo.filter(({ id }) => id !== +payload.id)
            };
        case mealCategoryActions.DELETE_MEALCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        case mealCategoryActions.CREATE_MEALCATEGORY_SUCCESS:
            console.log(payload)
            return {
                ...state,
                mealCategoryInfo: [...state.mealCategoryInfo, payload.restaurant]
            };
        case mealCategoryActions.CREATE_MEALCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        case mealCategoryActions.EDIT_MEALCATEGORY_SUCCESS:
            const oldMealIndex = state.mealCategoryInfo.findIndex(resto => resto.id === payload.id)
            state.mealCategoryInfo[oldMealIndex] = payload
            return {
                ...state,
                mealCategoryInfo: [...state.mealCategoryInfo]
            };
        case mealCategoryActions.EDIT_MEALCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
