import React, {useState, useEffect} from 'react';
import GeneralInfo from './GenrealInfo.js';
import Nav from './Nav.js'
import {useSelector} from 'react-redux';
import './Admin.css';
import ToolManager from './ToolsManager.js';
import {Route, Switch} from 'react-router-dom';
import CreateUser from './CreateUser';
import {userLogout} from '../reduxStore';

let links = [
   {title:"Users"},
   {title:"Classes"}
]



const Admin = ()=>{
    let privileges = useSelector(state=>state.role);
    const [extra, setExtra] = useState([["Privileges", privileges]])


    return(
        <div className='admin-outer'>
            <Switch>
                <Route exact path="/admin">
                    <Nav title={"Admin"} links={links} buttonTitle="Logout" buttonAction={userLogout}></Nav>
                    <GeneralInfo extra={extra}></GeneralInfo>
                    <div className="admin-tools">
                        <h1>Tools</h1>
                        <ToolManager></ToolManager>
                    </div>
                </Route>
                <Route path="/admin/users">
                    <CreateUser></CreateUser>
                </Route>
            </Switch>
        </div>
      
    )

}

export default Admin;