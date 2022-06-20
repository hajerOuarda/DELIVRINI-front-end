import { restaurantActions, userActions } from "../actions/types";


interface UserInfo {
    id: number
    name: string,
    lastName: string,
    password: string,
    email: string,
    phone: string,
    address: string,
    zipCode: string,
    street: string,
    fk_role: string,
    fk_restaurant: string
}

interface UserState {

    userInfo: UserInfo[];
    error: string
}
const initialState: UserState = {

    userInfo: [] as UserInfo[],
    error: " "
};


export default function UserReducer(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case userActions.LIST_USER_SUCCESS:
            return {
                ...state,
                userInfo: payload
            };
        case userActions.LIST_USER_FAILED:
            return {
                ...state,
                error: payload
            };
        case userActions.DELETE_USER_SUCCESS:
            return {
                ...state,
                userInfo: state.userInfo.filter(({ id }) => id !== +payload.id)
            };
        case userActions.DELETE_USER_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
