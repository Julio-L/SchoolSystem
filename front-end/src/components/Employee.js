import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import GeneralInfo from './GenrealInfo';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Schedule from './Schedule';
import Updates from './Updates';
import { userLogout } from '../reduxStore';

const links = [
    {title:"Classes"},
    {title:"Schedule Manager"},
]

const EMPLOYEE_PATH="http://localhost:3001/user/employee/"

const Employee = ()=>{
    let id = useSelector(state=>state.id);
    const [employee, setEmployee]= useState({});
    const [extra, setExtra] = useState([])

    useEffect(()=>{
        axios.get(EMPLOYEE_PATH+id)
        .then(res=>{
            console.log(res);
            setEmployee(res.data.results)
            setExtra([["Job Title", res.data.results.job_title]]);
        }).catch(err=>{
            //TODO send back to login page
            console.log(err);
        })
    }, [])


    return(
        <div>
            <Nav title="Employee" links={links} buttonTitle="Logout" buttonAction={userLogout}></Nav>
            <GeneralInfo extra={extra}></GeneralInfo>
            <Updates></Updates>
            <Schedule></Schedule>
        </div>
    )

}

export default Employee;