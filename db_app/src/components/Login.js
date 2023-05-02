import React,{useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import './Login.css';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {red, green, lightBlue, lightGreen} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactSession } from 'react-client-session';
import { CardMedia, CardContent } from '@mui/material';

const theme = createTheme({
    palette: {
      primary: {
        main: lightGreen[700],
      },
    },
  });



export function Login() {

  //Navigate functions
  const navigate = useNavigate();

	const navigateCreateAccount = () => {
		 navigate('/CreateAccount');
	}

  const navigateHome = () => {
    navigate('/Plan');
  }

  //State variable for login data
  const [data,setData] = useState({
    net_id:"",
    password:""
  })

  //Variable for login data
  const {net_id,password} = data;
  
  //Change handler for login form
  const changeHandler = e => {
    setData({...data,[e.target.name]:[e.target.value]});
  }
  
  //Submit handler for login form
  const submitHandler = e => {
    e.preventDefault();
    login();
    
  }

  //Set session variable for netid
  const setSession = () => {
  ReactSession.set("net_id", net_id[0]);
  }

//Send http request to log user in 
  const login = () => {
    Axios.post("http://3.219.93.142:8000/api/auth", {net_id: net_id[0], password: password[0],}).then((response) => {
      console.log(response);
      console.log(response.status);
      if (response.status === 200){
        setSession();
        navigateHome();
      }

    });
  };


   return (
    
    
        <ThemeProvider theme={theme}>
      <div className='bg' style={{backgroundImage: 'url(' + require('./images/back.jpg') + ')'}}>
      <div className='logbox'>
       <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">Log In</Typography>
        <div className='logbox2'>
        <Card sx={{ width:300, height:100 }}>
        <CardMedia
          component='Box'
          image={ require("./images/logo.jpg")}
          title="Logo"
          sx={{ width: 300, height:100}}
          alt="logo"

        />
        </Card>
        </div>
       
          
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
        
        
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In</Button>
        </form>
        <Button
        onClick={navigateCreateAccount}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, width:1/4 }}
        >Create Account</Button>
    
      </Box>

      </div>
      </div>
      </ThemeProvider>
  
    );
  }
  
  export default Login;


