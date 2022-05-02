import { action } from 'typesafe-actions'
import { UserActionTypes } from './types'

export const setAddress = () => action(UserActionTypes.SET_ADDRESS)

