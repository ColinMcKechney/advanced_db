import React,{useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Login.css';

function Menus() {

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
          <h1>Menus</h1>
        
    
        </center>
      </div>
  
    );
  }
  
  export default Menus;