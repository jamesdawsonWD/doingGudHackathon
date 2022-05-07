import { combineReducers } from 'redux'

import { UserState } from './users/types'
import { userReducer } from './users/reducer'


// The top-level state object
export interface ApplicationState {
    user: UserState

}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers({ user: userReducer })
