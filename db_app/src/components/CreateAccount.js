import React,{useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import './CreateAccount.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {red, green, lightBlue, lightGreen} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
});


function CreateAccount() {

  //Navigate to login
  const navigate = useNavigate();

	const navigateLogin = () => {
		 navigate('/');
	}

  //State variable for account data
  const [data,setData] = useState({
    net_id:"",
    password:"",
    first_name:"",
    last_name:"",
  })
  
  //Variable for account data
  const {net_id, password, first_name, last_name} = data;
  
  //Change handler for form
  const changeHandler = e => {
    setData({...data,[e.target.name]:[e.target.value]});
  }
  
  //Submit handler for form
  const submitHandler = e => {
    e.preventDefault();
    createAccount();
    navigateLogin();
  }
 
  //Sends post request with account credentials to server
  const createAccount = () => {
    Axios.post("http://3.219.93.142:8000/api/signup", {net_id: net_id[0], password: password[0], first_name: first_name[0], last_name: last_name[0]}).then((response) => {
       console.log(response);
    });
  };
  
    return (

      <ThemeProvider theme={theme}>
      <div className='bg' style={{backgroundImage: 'url(' + require('./images/main_background.jpg') + ')'}}>
      <div className='logbox'>
        <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
           <Typography component="h1" variant="h5">Create Account</Typography>
       
          
        <form className='formbox' onSubmit={submitHandler}>
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
      </div>
      </ThemeProvider>
  
    );
  }
  
  export default CreateAccount;
