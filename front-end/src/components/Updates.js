import React, {useRef} from 'react';
import Update from './Update';
import './Updates.css';


const Updates = ({update_list})=>{
    const slider = useRef(null);
 
    update_list = [1, 2, 3, 4, 6];

    return(
        <div ref = {slider} className = "updates-cont">
            <h1>Updates</h1>
            <div className = "updates-content">
                {update_list.map(update => (
                    <Update></Update>
                ))}
            </div>
        </div>
    )

}

export default Updates;