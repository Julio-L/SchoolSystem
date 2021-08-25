import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import './Login.css'
import Footer from './Footer'
import axios from 'axios'
import {setAccount, logoutUser} from '../actions';
import {useHistory} from 'react-router-dom';
import { setLocalStorage } from '../reduxStore';

const Login = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    async function getAuthorization(){
        try{
            let userInfo = await axios.post("http://localhost:3001/auth", {username, password})
            const data = userInfo.data;
            if(data.auth){
                let auth = data.auth;
                let {id, role, username, first_name, last_name, date_of_birth, email} = data.results;
                console.log(`GOT: ${auth}, ${id}`)
                setLocalStorage({auth, id, role, username, first_name, last_name, date_of_birth, email})
                dispatch(setAccount({auth, id, role, auth, username, first_name, last_name, date_of_birth, email}))
                history.push(`/${role}`);
                console.log(userInfo);
            }else{
                setMsg("INVALID USERNAME OR PASSWORD.")
            }
          
        }catch(err){
            setLocalStorage({});
            dispatch(logoutUser());
            console.log(err);
            console.log("Could not authenticate user")
        }
     
    }

    return(
        <div className="outer-login">
            <div className="title-container">
                <h1 id="title">School Portal</h1>
            </div>
            
            <div className="login-container">
                <h1>Login</h1>
                <div className="input-cont">
                    <table className="table-cont">
                    <tr className='row-cont'>
                        <td>
                        <label>Username: </label>
                        </td>
                        <td>
                        <input onChange = {(e)=>{
                            setUsername(e.target.value);
                        }} type="text"></input>
                        </td>
                    </tr>
                   
                    <tr className='row-cont'>
                        <td>
                        <label>Password: </label>
                        </td>
                        <td>
                        <input onChange= {(e)=>{
                        setPassword(e.target.value)
                        }} type="password"></input>
                        </td>
                    </tr>  
                    </table>
                </div>
                <div className="login-cont">
                    <button onClick = {getAuthorization} id="login-but">LOGIN</button>
                </div>
                <h1>{msg}</h1>
                
            </div>
            <Footer></Footer>
        </div>
    )

}


export default Login;