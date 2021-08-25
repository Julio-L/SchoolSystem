import React from 'react';
import ongoing from '../assets/ongoing.svg.png';
import './ScheduleClass.css';

const ScheduleClass = ({details})=>{

    const {name, first_name, last_name, time_start, time_end, end_period, start_period, status, days} = details

    return (
        <div className="schedule-class-cont">
            <h1>{name}</h1>
            <h1>Professor: {`${last_name}, ${first_name}`}</h1>
            <div className='time-cont'>
                <h1>TIME: {`${time_start + start_period}-${time_end + end_period}`}</h1>
                <h1>Days: {days}</h1>
            </div>
            <div className="status-cont">
                <h1>Status: {status}</h1>
                <img id="status-icon" src = {ongoing}></img>
            </div>
           
        </div>
    )

}

export default ScheduleClass;