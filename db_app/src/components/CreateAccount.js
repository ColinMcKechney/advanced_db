import React,{useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import './Login.css';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function CreateAccount() {

    const navigate = useNavigate();

	const navigateLogin = () => {
		 navigate('/');
	}

  const [data,setData] = useState({
    net_id:"",
    password:"",
    first_name:"",
    last_name:"",
  })
  
  const {net_id, password, first_name, last_name} = data;
  
  const changeHandler = e => {
    setData({...data,[e.target.name]:[e.target.value]});
  }
  
  const submitHandler = e => {
    e.preventDefault();
    console.log(data);
    console.log(net_id[0])
    console.log(password[0])
    console.log(first_name[0])
    console.log(last_name[0])
    createAccount();
  }
 
  const createAccount = () => {
    Axios.post("http://3.219.93.142:8000/api/signup", {net_id: net_id[0], password: password[0], first_name: first_name[0], last_name: last_name[0]}).then((response) => {
       console.log(response);
    });
  };
  
    return (
      <div>
        <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
           <Typography component="h1" variant="h5">Create Account</Typography>
       
          
        <form onSubmit={submitHandler}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="net_id"
            label="net_id"
            name="net_id"
            autoComplete="net_id"
            autoFocus
            value={net_id} 
            onChange={changeHandler}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            value={password} 
            onChange={changeHandler}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First name"
            name="first_name"
            autoComplete="first_name"
            autoFocus
            value={first_name} 
            onChange={changeHandler}
          />

<TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last name"
            name="last_name"
            autoComplete="last_name"
            autoFocus
            value={last_name} 
            onChange={changeHandler}
          />
        
        
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        
          >
            Submit</Button>
        </form>
        <Button
        onClick={navigateLogin}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, width:1/4 }}
        >Back to Login</Button>
    
      </Box>
      
      </div>
  
    );
  }
  
  export default CreateAccount;
