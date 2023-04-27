import React,{useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Login.css';

function CreateAccount() {

    const navigate = useNavigate();

	const navigateLogin = () => {
		 navigate('/');
	}

  const [data,setData] = useState({
    username:"",
    password:"",
    email:"",
  })
  
  const {username,password,email} = data;
  
  const changeHandler = e => {
    setData({...data,[e.target.name]:[e.target.value]});
  }
  
  const submitHandler = e => {
    e.preventDefault();
    console.log(data);
  }
 
  
    return (
      <div>
        <center>
          <h1>Create Account</h1>
          <p>Enter your account information</p>
        <form onSubmit={submitHandler}>
        <p>Username:</p>
        <input type="text" name="username" value={username} onChange={changeHandler}/><br/>
        <p>Password:</p>
        <input type="password" name="password" value={password} onChange={changeHandler}/><br/>
        <p>Email:</p>
        <input type="email" name="email" value={email} onChange={changeHandler}/><br/>
        <input type="submit" name="submit"/>
        </form>
    
        </center>
      </div>
  
    );
  }
  
  export default CreateAccount;
