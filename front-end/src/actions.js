import {setUser, logout} from './action-types';

export function setAccount(payload){
    return {type:setUser, payload}
}

export function logoutUser(){
    return {type:logout}
}