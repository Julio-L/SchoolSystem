import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({children, ...rest})=>{
    const auth = useSelector(state=>state.auth);
    console.log(auth);
    return (
        <div className='auth-cont'>
            {auth ? <Route {...rest}>{children}</Route> : <Redirect to="/"></Redirect>}
        </div>
    )
}

export default AuthRoute;