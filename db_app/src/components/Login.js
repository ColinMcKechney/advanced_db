import React,{useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

	const navigateCreateAccount = () => {
		 navigate('/CreateAccount');
	}

  const [data,setData] = useState({
    username:"",
    password:""
  })
  
  const {username,password} = data;
  
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
          <h1>Log In</h1>
          <p>Log in to your account</p>
        <form onSubmit={submitHandler}>
        <p>Username:</p>
        <input type="text" name="username" value={username} onChange={changeHandler}/>
        <p>Password:</p>
        <input type="password" name="password" value={password} onChange={changeHandler}/><br/>
        <input type="submit" name="submit"/>
        </form>
        <button onClick={navigateCreateAccount}>Create New Account</button>
        </center>
      </div>
  
    );
  }
  
  export default Login;
