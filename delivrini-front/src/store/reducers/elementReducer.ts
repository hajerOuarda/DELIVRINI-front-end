import { elementActions } from "../actions/types";


export interface ElementInfo {
    id: number
    name: string,
    description: string,
    image: string,

}

interface ElementState {

    elementInfo: ElementInfo[];
    error: string
}
const initialState: ElementState = {

    elementInfo: [] as ElementInfo[],
    error: " "
};


export default function ElementReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case elementActions.LIST_ELEMENT_SUCCESS:
            return {
                ...state,
                elementInfo: payload
            };
        case elementActions.LIST_ELEMENT_FAILED:
            return {
                ...state,
                error: payload
            };
        case elementActions.DELETE_ELEMENT_SUCCESS:
            return {
                ...state,
                elementInfo: state.elementInfo.filter(({ id }) => id !== +payload.id)
            };
        case elementActions.DELETE_ELEMENT_FAILED:
            return {
                ...state,
                error: payload
            };
        case elementActions.CREATE_ELEMENT_SUCCESS:
            console.log(payload)
            return {
                ...state,
                elementInfo: [...state.elementInfo, payload.element]
            };
        case elementActions.CREATE_ELEMENT_FAILED:
            return {
                ...state,
                error: payload
            };
        case elementActions.EDIT_ELEMENT_SUCCESS:
            const oldElementIndex = state.elementInfo.findIndex(element => element.id === payload.id)
            state.elementInfo[oldElementIndex] = payload
            return {
                ...state,
                elementInfo: [...state.elementInfo]
            };
        case elementActions.EDIT_ELEMENT_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
