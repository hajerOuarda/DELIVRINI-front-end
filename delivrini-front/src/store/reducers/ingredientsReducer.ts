import { ingredientsActions } from "../actions/types";



export interface IngredientsInfo {
    id: number
    name: string,

}

interface IngredientsState {

    ingredientsInfo: IngredientsInfo[];
    error: string
}
const initialState: IngredientsState = {

    ingredientsInfo: [] as IngredientsInfo[],
    error: " "
};


export default function IngredientsReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case ingredientsActions.LIST_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsInfo: payload
            };
        case ingredientsActions.LIST_INGREDIENTS_FAILED:
            return {
                ...state,
                error: payload
            };
        case ingredientsActions.DELETE_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsInfo: state.ingredientsInfo.filter(({ id }) => id !== +payload.id)
            };
        case ingredientsActions.DELETE_INGREDIENTS_FAILED:
            return {
                ...state,
                error: payload
            };
        case ingredientsActions.CREATE_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsInfo: [...state.ingredientsInfo, payload.ingredients]
            };
        case ingredientsActions.CREATE_INGREDIENTS_FAILED:
            return {
                ...state,
                error: payload
            };
        case ingredientsActions.EDIT_INGREDIENTS_SUCCESS:
            const oldingredientsIndex = state.ingredientsInfo.findIndex(ingredients => ingredients.id === payload.id)
            state.ingredientsInfo[oldingredientsIndex] = payload
            return {
                ...state,
                ingredientsInfo: [...state.ingredientsInfo]
            };
        case ingredientsActions.EDIT_INGREDIENTS_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
