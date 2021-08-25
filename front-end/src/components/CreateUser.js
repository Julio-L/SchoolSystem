import React, {useState} from 'react';
import Nav from './Nav';
import { useHistory } from 'react-router';
import './CreateUser.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {createUser} from '../AdminCreate'


const CreateUser = ()=>{
    const history = useHistory();

    function back(){
        history.push("/admin");
    }

    const [role, setRole] = useState('admin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [date, setDate] = useState("yyyy-mm-dd");
    const [email, setEmail] = useState('');
    const [standing, setStanding] = useState('FRESHMAN');
    const [interests, setInterests] = useState("None");
    const [job_title, setJobTitle] = useState('None');

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("NOT SUBMITTED");

    function afterRegistration(msg){
        if(msg.successful){
            setStatus(`SUCCESSFUL REGISTRATION FOR USER: ${username}`);
        }else{
            if(msg.duplicate){
                setStatus("REGISTRAION FAILED: DUPLICATE USERNAME");
            }else{
                setStatus("REGISTRATION FAILED: DATABASE FAILURE [TRY AGAIN]")
            }
        }
        setLoading(false);
    }

    function register(){
        setLoading(true);
        setTimeout(()=>{
            let user = {
                username, password, first_name,
                last_name, date, email, role
            }
            if(role === 'student'){
                user.standing = standing;
                user.interests = interests;
            }else if(role === 'smployee'){
                user.job_title =  job_title
            }
            createUser(user, afterRegistration);
        }, 5000);
    }

    return (
        <div className = "create-user-outer-cont">
            <Nav title="Admin" links={[{title:"CREATE USER"}]} buttonTitle="Back" buttonAction = {back}></Nav>
            <div className="user-info-cont">
                <h1 id="reg-title-basic">Registration Details</h1>
                <div className="first-info-cont">
                    <table className='user-table'>
                    <tr className='user-row'>
                        <td>Username: </td>
                        <td><input onChange={(e)=>{
                            setUsername(e.target.value)
                        }} type="text"></input></td>
                    </tr>
                    <tr className='user-row'>
                        <td>Password: </td>
                        <td><input onChange={(e)=>{
                            setPassword(e.target.value)
                        }}  type="text"></input></td>
                    </tr>
                    <tr className='user-row'>
                        <td>First Name: </td>
                        <td><input onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}  type="text"></input></td>
                    </tr>
                    <tr className='user-row'>
                        <td>Last Name: </td>
                        <td><input onChange={(e)=>{
                            setLastName(e.target.value)
                        }}  type="text"></input></td>
                    </tr>
                    <tr className='user-row'>
                        <td>Date of Birth: </td>
                        <td><input value={date} id= "date-of-birth"onChange={(e)=>{
                            if(e.target.value.length ===0){
                                setDate("yyyy-mm-dd")
                            }else{
                                setDate(e.target.value)
                            }
                          
                        }}  type="text"></input></td>
                    </tr>
                    <tr className='user-row'>
                        <td>Email: </td>
                        <td><input onChange={(e)=>{
                            setEmail(e.target.value)
                        }}  type="text"></input></td>
                    </tr>
                    
                    <tr className='user-row'>
                        <td>Role: </td>
                        <td>
                            <select onChange={(e)=>{
                                setRole(e.target.value);
                            }} name="roles" id="role">
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                            <option value="student">Student</option>
                            </select>
                        </td>
                    </tr>
                    </table>
                    {role === 'student' ? 
                    (<table className='user-table'>
                        <tr className='user-row'>
                            <td>Standing</td>
                            <select onChange={(e)=>{
                                setStanding(e.target.value);
                            }} name="standings" id="standing">
                            <option value="FRESHMAN">Freshman</option>
                            <option value="SOPHOMORE">Sophomore</option>
                            <option value="JUNIOR">Junior</option>
                            <option value="SENIOR">Senior</option>
                            </select>
                        </tr>
                        <tr className='user-row'>
                            <td>Interests</td>
                            <td><input onChange={(e)=>{
                            setInterests(e.target.value)
                        }}   type='text'></input></td>
                        </tr>
                    </table>):null}

                    {role === 'employee' ? 
                    (<table className='user-table'>
                        <tr className='user-row'>
                            <td>Job Title</td>
                            <td><input onChange={(e)=>{
                            setJobTitle(e.target.value)
                        }}   type='text'></input></td>
                        </tr>
                    </table>):null}

                </div>
                {loading?  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    />:  <button onClick = {register} id='first-form-but'>Register</button>}
                <div className='registration-status'>
                    <h1>Registration Status: {status}</h1>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;