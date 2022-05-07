import { addressZero } from '../../helpers/index'
import { UserState, UserActionTypes } from "./types";
import { Reducer } from 'redux';
export const initialState: UserState = {
    address: addressZero,
    provider: null,
    modal: false,
    fund: ''
}
const reducer: Reducer<UserState> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        case UserActionTypes.SET_PROVIDER:
            return {
                ...state,
                provider: action.payload
            }
        case UserActionTypes.SET_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        case UserActionTypes.SET_FUND:
            return {
                ...state,
                fund: action.payload
            }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as userReducer }
