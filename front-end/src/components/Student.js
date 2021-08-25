import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import { useSelector } from 'react-redux';
import './Student.css'
import axios from 'axios';
import GeneralInfo from './GenrealInfo';
import Schedule from './Schedule';
import Updates from './Updates';
import { userLogout } from '../reduxStore';

const STUDENT_PATH = "http://localhost:3001/user/student/"

let links = [
    {title:"Classes"},
    {title: "Grades"},
    {title:"Schedule Manager"}
]

const Student = ()=>{
    const id = useSelector(state=>state.id);
    const [student, setStudent] = useState({});
    const [extra, setExtra] = useState([]);

    useEffect(()=>{
        axios.get(STUDENT_PATH+id)
        .then(student=>{
            let info = student.data.results;
            let gpa = info.gpa.toFixed(2);
            setStudent({...info,gpa});
            setExtra([["Standing", info.standing], ["GPA", gpa], ["Interests", info.interests]])
        }).catch(err=>{
            console.log("Could not get student info")
        })
    }, [])


    return (
        <div>
            <Nav links={links} title={"Student"} buttonTitle="Logout" buttonAction={userLogout}></Nav>
            <GeneralInfo extra={extra}></GeneralInfo>
            <Updates></Updates>
            <Schedule></Schedule>
        </div>
       

    )

}

export default Student;