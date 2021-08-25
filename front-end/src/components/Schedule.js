import React, {useEffect, useState} from 'react';
import './Schedule.css';
import ScheduleClass from './ScheduleClass';
import axios from 'axios';
import { useSelector } from 'react-redux';

const STUDENT_SCHEDULE = "http://localhost:3001/enrollment/enrolled";
const TEACHING_SCHEDULE = "http://localhost:3001/teaching/employee"

const Schedule = ()=>{
    console.log("SCHEDULE HERE");
    const user = useSelector(state => state);
    const [schedule, setSchedule] = useState([]);
    console.log(user.id);

    useEffect(()=>{
        let url = null; 
        let params= null;
        if(user.role == 'student'){
            url = STUDENT_SCHEDULE;
            params = {
                student_id:user.id
            }
        }else{
            url = TEACHING_SCHEDULE;
            params = {
                employee_id:user.id
            }
        }
        console.log(params)
        axios.get(url, {params})
        .then(res=>{
            let data = res.data
            if(data.successful){
                setSchedule(data.results);
                console.log(data.results);
            }
            console.log("not successful")
            console.log(data);
            
        }).catch(err=>{
            //TODO
            console.log(err);
        })
    }, [])



    return (
        <div className='schedule-cont'>
            <h1>Schedule</h1>
            {schedule.map(cls => 
            <ScheduleClass details = {cls}></ScheduleClass>
            )}
        </div>
    )

}

export default Schedule;