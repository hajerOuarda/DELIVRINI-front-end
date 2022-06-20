import { mealCategoryActions } from "../actions/types";




export interface MealCategoryInfo {
    id: number
    name: string,
    description: string,
    image: string,

}

interface MealCategoryState {

    mealCategoryInfo: MealCategoryInfo[];
    error: string
}
const initialState: MealCategoryState = {

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
             return {
                ...state,
                mealCategoryInfo: [...state.mealCategoryInfo, payload.mealCategory]
            };
        case mealCategoryActions.CREATE_MEALCATEGORY_FAILED:
            return {
                ...state,
                error: payload
            };
        case mealCategoryActions.EDIT_MEALCATEGORY_SUCCESS:
            const oldMealCategoryIndex = state.mealCategoryInfo.findIndex(mealCategory => mealCategory.id === payload.id)
            state.mealCategoryInfo[oldMealCategoryIndex] = payload
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
