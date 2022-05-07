import { action } from 'typesafe-actions'
import { UserActionTypes } from './types'
interface Modal {
    type: string,
    show: boolean
}
export const setAddress = (address: string) => action(UserActionTypes.SET_ADDRESS, address);
export const setProvider = (provider: any) => action(UserActionTypes.SET_PROVIDER, provider);
export const setModal = (modal: Modal) => action(UserActionTypes.SET_MODAL, modal);
export const setSelectedFund = (fund: string) => action(UserActionTypes.SET_FUND, fund);

