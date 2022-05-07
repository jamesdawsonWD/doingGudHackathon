export enum UserActionTypes {
    SET_ADDRESS = '@@user/SET_ADDRESS',
    SET_PROVIDER = '@@user/SET_PROVIDER',
    SET_MODAL = '@@user/SET_MODAL',
    SET_FUND = '@@user/SET_FUND',

}

export interface UserState {
    address: string;
    provider: any;
    modal: boolean;
    fund: string;
}
