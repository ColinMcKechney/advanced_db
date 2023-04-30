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

	const navigateLogin = () => {
		 navigate('/');
	}

//get the start of each week and reformat to Oracle date type
function weekStart(){
  var date_str = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var weekday = days[date_str.getDay()]

  if (weekday != 'Sunday'){
    return;
  }

  var date_str = new Date();
  var curr_day = String(date_str.getDate()).padStart(2, '0');
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  var curr_month = months[date_str.getMonth()];
  var curr_year = String(date_str.getFullYear());
  var db_date = curr_day + '-' + curr_month + '-' + curr_year.slice(2);

  return db_date;
}

  
  return (
        <ThemeProvider theme={theme}>  
      <div>
         <AppBar position="static">
  <Toolbar variant="dense">
  <Button  variant="h6" color="main" position="right">
   Home</Button> 
    <Button variant="h6" color="main" component="div">
      Menus
    </Button>
    <Button  variant="h6" >
    Past Plans</Button> 
    <Button variant="h6" color="main" component="div" sx={{
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
        <h1>&nbsp; Your Plan</h1>

        <form>
        <TextField
          id="calorie-input"
          label="Calories"
        />
        <TextField
          id="fat-input"
          label="Fat (g)"
        />
        <TextField
          id="saturated_fat-input"
          label="Fat (g)"
        />
        <TextField
          id="trans_fat-input"
          label="Fat (g)"
        />
        <TextField
          id="carbs-input"
          label="Fat (g)"
        />
        <TextField
          id="fiber-input"
          label="Fat (g)"
        />
        <TextField
          id="sugar-input"
          label="Fat (g)"
        />
        <TextField
          id="protein-input"
          label="Fat (g)"

        />
        <TextField
          id="sodium-input"
          label="Fat (g)"
        />
        <TextField
          id="potassium-input"
          label="Fat (g)"
        />
        <TextField
          id="cholesterol-input"
          label="Fat (g)"
          defaultValue="0"
        />
        </form>


    </ThemeProvider>
  
    );
  }
  
  export default MyPlan;