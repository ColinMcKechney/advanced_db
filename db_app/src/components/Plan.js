import React,{useState, useReducer} from 'react';
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
import { ReactSession } from 'react-client-session';


import { Axios } from 'axios';

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

const logout = () => {
    ReactSession.set("net_id", "");
    navigateLogin();

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

const [goalInput, setGoalInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      total_cal: "",
      total_fat: "",
      total_sat_fat: "",
      total_trans_fat: "",
      total_carbs: "",
      total_fiber: "",
      total_sugar: "",
      total_protein: "",
      total_sodium: "",
      total_potassium: "",
      total_cholesterol: "",
    }
);

const net_id = ReactSession.get("net_id");

const handleSubmit = evt => {
  let data = {goalInput}

  Axios.post()
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
    <Button variant="h6" color="main" component="div" onClick={logout} sx={{
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
      <div>
        <h1>&nbsp; Your Plan</h1>
        <h2>&nbsp; &nbsp;Goal for the week of: </h2>

        <form>
        <>&nbsp; &nbsp;</>
        <TextField
          sx={{ paddingBottom: 1 }}
          id="calorie-input"
          label="Calories"
          size ="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="fat-input"
          label="Fat (g)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="saturated_fat-input"
          label="Saturated Fat (g)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="trans_fat-input"
          label="Trans Fat (g)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="carbs-input"
          label="Carbs (g)"
          size="small" 
        />
        <br></br>
        <>&nbsp; &nbsp;</>
        <TextField
          id="fiber-input"
          label="Fiber (g)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="sugar-input"
          label="Sugar (g)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="protein-input"
          label="Protein (g)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="sodium-input"
          label="Sodium (mg)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="potassium-input"
          label="Potassium (mg)"
          size="small"
        />
        <>&nbsp; &nbsp;</>
        <TextField
          id="cholesterol-input"
          label="Cholesterol (mg)"
          size="small"
        />
        <br></br>
        <br></br>
        <>&nbsp; &nbsp;</>
        <Button 
        type="submit" 
        variant="contained"
        size = "large">
        Submit</Button>
        </form>
      </div>
      <br></br>
      
      <div>
        <h2>
          &nbsp; &nbsp;
          So Far This Week:
        </h2>
      </div>

      <div>
        <h2>
          &nbsp; &nbsp;
          Add to Food Journal
        </h2>
        <h3> &nbsp; &nbsp; &nbsp;
          On-Campus
        </h3>
        <h3> &nbsp; &nbsp; &nbsp;
          Off-Campus
        </h3>
      </div>

    </ThemeProvider>
  
    );
  }
  
  export default MyPlan;