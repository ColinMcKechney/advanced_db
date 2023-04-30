import React,{useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import {red, green, lightBlue, lightGreen} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';




const theme = createTheme({
    palette: {
      primary: {
        main: lightGreen[700],
        apple: red[500],
      },

    },
  });

function MyPlan() {

    const navigate = useNavigate();

	const Home = () => {
        navigate('/Plan');
   }
   const Menus = () => {
       navigate('/Menus');
  }
  const Past = () => {
   navigate('/Past');
}
const navigateLogin = () => {
    navigate('/');
}
  
    return (

    

        <ThemeProvider theme={theme}>  
      <div>
         <AppBar position="static">
  <Toolbar variant="dense">
  <Button  variant="h6" color="main" position="right" onClick={Home}>
   Home</Button> 
    <Button variant="h6" color="main" component="div" onClick={Menus}>
      Menus
    </Button>
    <Button  variant="h6"onClick={Past} >
    Past Plans</Button> 
    <Button variant="h6" color="main" component="div" onClick={navigateLogin} sx={{
    ':hover': {
      bgcolor: '#ffc6c4', // theme.palette.primary.main
      color: 'red',
    },
  }}>
        Log out
    </Button>
   
  </Toolbar>
</AppBar>
      </div>
    </ThemeProvider>
  
    );
  }
  
  export default MyPlan;