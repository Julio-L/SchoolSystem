import React from 'react';
import './Nav.css'
import { useDispatch } from 'react-redux';
import { setLocalStorage } from '../reduxStore';
import { logoutUser } from '../actions';

const Nav = ({title, links, buttonTitle, buttonAction})=>{

    let dispatch = useDispatch();

    function logout(){
        dispatch(logoutUser())
        setLocalStorage({});
    }

    return(
        <header className='nav-cont'>
        <h1>{title}</h1>
        <nav>
            <ul className="ul-cont">
                {links.map(link=>(
                    <li className='list-item'>
                        <h2>[{link.title}]</h2>
                    </li>
                ))}
               
            </ul>
        </nav>
        <button onClick = {buttonAction} id='logout-but'>{buttonTitle}</button>
        </header>
    )

}

export default Nav;