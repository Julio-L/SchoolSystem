import React from 'react';
import icon from '../assets/default.jpg';
import {useSelector} from 'react-redux';
import './GeneralInfo.css';
//extra: arr[heading, info]
const GeneralInfo = ({extra}) =>{

    const user = useSelector(state=>state);

    return (
        <div className = 'info-cont'>
            <img id='face-icon' src= {icon}></img>
            <div className='info'>
                <div className='general-info-cont'>
                    <h1>Name: {`${user.last_name}, ${user.first_name}`}</h1>
                    <h1>ID: {user.id}</h1>
                    <h1>Date Of Birth: {user.date_of_birth.substring(0, 10)}</h1>
                    {extra.map(([heading, info])=>
                        <h1>{heading}: {info}</h1>
                    )}
                </div>
                <div className='contact-info-cont'>
                    <h1>Contact Information</h1>
                    <h1>Email: {user.email}</h1>
                </div>


            </div>
        </div>
    )
}

export default GeneralInfo;