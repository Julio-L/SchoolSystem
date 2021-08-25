import './App.css';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import {setAccount} from './actions';
import {useEffect, useState} from 'react';
import AuthRoute from './components/AuthRoute'
import Login from './components/Login';
import {useDispatch} from 'react-redux';
import Admin from './components/Admin';
import {getLocalStorage} from './reduxStore';
import Student from './components/Student';
import Employee from './components/Employee';

function App() {
  const history = useHistory(); 
  const dispatch = useDispatch();



  useEffect(()=>{
    //Currenlty trying to simulate auth, but will add jwt later
    let user = getLocalStorage();

    if(user.auth){
      dispatch(setAccount(user));
      history.push(`/${user.role}`)
    }
}, [])


  return (

    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <AuthRoute path="/student">
          <Student></Student>
        </AuthRoute>

        <AuthRoute path="/teacher">
         <Employee></Employee>
        </AuthRoute>

        <AuthRoute path="/admin">
         <Admin></Admin>
        </AuthRoute>

      </Switch>
    </div>
  );
}

export default App;
