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
import { ReactSession } from 'react-client-session';
import { Axios } from 'axios';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper} from '@mui/material';


const theme = createTheme({
    palette: {
      primary: {
        main: lightGreen[700],
        apple: red[500],
      },

    },
  });

function Past() {

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

const Log = () => {
    navigate('/LogMeals')
  }
  
  const Progress = () => {
    navigate('/ThisWeek')
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

const net_id = ReactSession.get("net_id");

//to set nutritional goal for the week
const [goalInput, setGoalInput] = useState({
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

const{total_cal, total_fat, total_sat_fat, total_trans_fat, total_carbs, total_fiber, 
  total_sugar, total_protein, total_sodium, total_potassium, total_cholesterol} = goalInput

const changeGoalHandler = evt =>{
  setGoalInput({...goalInput, [evt.target.name]: [evt.target.value] })
}

const submitGoalHandler = evt => {
  evt.preventDefault();
  console.log(goalInput)
  Axios.post("http://3.219.93.142:8000/api/",
    {
      total_cal: total_cal[0],
      total_fat: total_fat[0],
      total_sat_fat: total_sat_fat[0],
      total_trans_fat: total_trans_fat[0],
      total_carbs: total_carbs[0],
      total_fiber: total_fiber[0],
      total_sugar: total_sugar[0],
      total_protein: total_protein[0],
      total_sodium: total_sodium[0],
      total_potassium: total_potassium[0],
      total_cholesterol: total_cholesterol[0]
    }).then((response) => {
      console.log(response);
      console.log(response.status);
    })
};


//to add an off campus food item or meal to your weekly journal
  const [offCampusInput, setOffCampusInput] = useState({
    calories: "",
    fat_g: "",
    sat_fat_g: "",
    trans_fat_g: "",
    carbs_g: "",
    fiber_g: "",
    sugar_g: "",
    protein_g: "",
    sodium_g: "",
    potassium_g: "",
    cholesterol_g: "",
  }
  );

  const { calories, fat_g, sat_fat_g, trans_fat_g, carbs_g, fiber_g,sugar_g, protein_g,
    sodium_g, potassium_g, cholesterol_g, } = offCampusInput

  const changeoffCampusHandler = evt => {
    setOffCampusInput({ ...offCampusInput, [evt.target.name]: [evt.target.value] })
  }

  const submitoffCampusHandler = evt => {
    evt.preventDefault();
  };


  

  
  return (
  <ThemeProvider theme={theme}>  
 
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button  variant="h6" color="main" position="right" onClick={Home}>
            Home
          </Button> 
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
    

    
    <div>
      <h1>
      &nbsp;
        Past plans:
      </h1>

      

      <TableContainer component={Paper}>
          <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 90 }}  align="left">Food</TableCell>
              <TableCell style={{ width: 90 }} align="left">Calories</TableCell>
              <TableCell style={{ width: 90 }} align="left">Fat&nbsp;(g)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Saturated Fat&nbsp;(g)</TableCell>
              <TableCell style={{ width: 90 }} align="left">TransFat&nbsp;(g)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Carbs&nbsp;(g)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Fiber&nbsp;(g)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Sugar&nbsp;(g)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Protein&nbsp;(g)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Sodium&nbsp;(mg)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Potassium&nbsp;(mg)</TableCell>
              <TableCell style={{ width: 90 }} align="left">Cholesterol&nbsp;(mg)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    
      </div>

    
    </ThemeProvider>
  
    );
  }
  
  export default Past;