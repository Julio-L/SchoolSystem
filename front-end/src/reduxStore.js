import {createStore} from 'redux';
import { setUser, logout } from './action-types';
import { logoutUser } from './actions';


const init = {
    auth:false,
    id: -1,
    username:"",
    first_name:"",
    last_name:"",
    date_of_birth:"",
    role:"",
    email:""
}

export function setLocalStorage(items){
    if(Object.keys(items).length == 0){
        items = init;
    }
    Object.entries(items).forEach(([key, value])=>{
        localStorage.setItem(key, value.toString());
    })
}

export function getLocalStorage(){
    let user = {};
    Object.entries(localStorage).forEach(([key, value])=>{
        if(key === "auth"){
            user[key] = value==="true";
        }else{
            user[key] = value;
        }
    })
    return user;
}

function reducer(state=init, action){
    switch(action.type){
        case setUser:
            let payload = action.payload;
            if(payload.auth){
                return {auth:payload.auth, role:payload.role,
                     id:payload.id, first_name:payload.first_name,
                    last_name:payload.last_name, date_of_birth:payload.date_of_birth,
                    username:payload.username, email:payload.email
                    }
            }
            return state;
        case logout:
            return init;

        default:
            return state;
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export function userLogout(){
    store.dispatch(logoutUser())
    setLocalStorage({});
}


export default store;