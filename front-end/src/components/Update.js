import React from 'react';
import new_assignment from '../assets/new-assignment.png';
import './Update.css';

const Update = ({title})=>{


    return (
        <div className = 'update-cont'>
            <h1 className="update-text">TEST [ANNOUNCEMENT]</h1>
            <img id = "update-icon" src = {new_assignment}></img>
            <button id="more-info-but">More Info</button>
            <button id = "dismiss-but">Dismiss</button>
        </div>
    )


}

export default Update;
