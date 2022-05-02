export enum UserActionTypes {
    SET_ADDRESS = '@@user/SET_ADDRESS',

}

export interface UserState {
    address: string;
}
