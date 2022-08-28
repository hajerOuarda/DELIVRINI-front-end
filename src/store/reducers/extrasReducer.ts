import { extrasActions } from "../actions/types";



export interface ExtrasInfo {
    id: number
    name: string,
    price:string,
}

interface ExtrasState {

    extrasInfo: ExtrasInfo[];
    error: string
}
const initialState: ExtrasState = {

    extrasInfo: [] as ExtrasInfo[],
    error: " "
};


export default function ExtrasReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case extrasActions.LIST_EXTRAS_SUCCESS:
            return {
                ...state,
                extrasInfo: payload
            };
        case extrasActions.LIST_EXTRAS_FAILED:
            return {
                ...state,
                error: payload
            };
        case extrasActions.DELETE_EXTRAS_SUCCESS:
            return {
                ...state,
                extrasInfo: state.extrasInfo.filter(({ id }) => id !== +payload.id)
            };
        case extrasActions.DELETE_EXTRAS_FAILED:
            return {
                ...state,
                error: payload
            };
        case extrasActions.CREATE_EXTRAS_SUCCESS:
            return {
                ...state,
                extrasInfo: [...state.extrasInfo, payload.extras]
            };
        case extrasActions.CREATE_EXTRAS_FAILED:
            return {
                ...state,
                error: payload
            };
        case extrasActions.EDIT_EXTRAS_SUCCESS:
            const oldextrasIndex = state.extrasInfo.findIndex(extras => extras.id === payload.id)
            state.extrasInfo[oldextrasIndex] = payload
            return {
                ...state,
                extrasInfo: [...state.extrasInfo]
            };
        case extrasActions.EDIT_EXTRAS_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
