import React from 'react';
import './Tool.css';
import {Link} from 'react-router-dom';

const Tool = ({info})=>{

    return (
        <div className = "tool-cont">
            <h1 className='tool-heading'>{info.toolName}</h1>
            <Link className='tool-but' to = {`/admin/${info.page}`}>
                GO TO
            </Link>
        </div>
    )

}

export default Tool;