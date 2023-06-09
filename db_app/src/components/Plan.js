import React,{useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Login.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {red, green, lightBlue, lightGreen} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactSession } from 'react-client-session';
import Axios from 'axios';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper,Checkbox} from '@mui/material';


const theme = createTheme({
    palette: {
      primary: {
        main: lightGreen[700],
        apple: red[500],
      },

    },
});

function MyPlan() {

  //Navigation functions
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

const [week, setWeek] = useState();
const displayWeek = () => {
  setWeek(() => weekStart());
}


//get start of week (sunday)
function getLastSunday() {
  const date = new Date();
  const today = date.getDate();
  const currentDay = date.getDay();
  const newDate = date.setDate(today - (currentDay || 7));
  return new Date(newDate);
}

//get the Sunday of each week and reformat to Oracle date type
function weekStart(){
  
  var date_str = getLastSunday();
  var curr_day = String(date_str.getDate()).padStart(2, '0');
  console.log(curr_day);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  var curr_month = months[date_str.getMonth()];
  var curr_year = String(date_str.getFullYear());
  var db_date = curr_day + '-' + curr_month + '-' + curr_year.slice(2);
   console.log(db_date)
  return db_date;
}

//Get netid session variable
const net_id = ReactSession.get("net_id");

//To set nutritional goal for the week
const [goalInput, setGoalInput] = useState({
      total_cal: 0,
      total_fat: 0,
      total_sat_fat: 0,
      total_trans_fat: 0,
      total_carbs: 0,
      total_fiber: 0,
      total_sugar: 0,
      total_protein: 0,
      total_sodium: 0,
      total_potassium: 0,
      total_cholesterol: 0,
    }
);

//Variable to hold the goal input from the form
const{total_cal, total_fat, total_sat_fat, total_trans_fat, total_carbs, total_fiber, 
  total_sugar, total_protein, total_sodium, total_potassium, total_cholesterol} = goalInput

//Change handler for form submit to send the goal info to the server
const changeGoalHandler = evt =>{
  setGoalInput({...goalInput, [evt.target.name]: [evt.target.value] })
}

//Variable to hold the success state of submit
const [success, setSuccess] = useState("");

//Sends http request to submit goal
const submitGoalHandler = evt => {
  evt.preventDefault();
  console.log(goalInput)
  console.log(net_id)
  console.log(weekStart())
  Axios.post("http://3.219.93.142:8000/api/goal",
    {
      net_id: net_id,
      week_date: weekStart(),
      total_cal: Number(total_cal[0])*7,
      total_fat: Number(total_fat[0])*7,
      total_sat_fat: Number(total_sat_fat[0])*7,
      total_trans_fat: Number(total_trans_fat[0])*7,
      total_carbs: Number(total_carbs[0])*7,
      total_fiber: Number(total_fiber[0])*7,
      total_sugar: Number(total_sugar[0])*7,
      total_protein: Number(total_protein[0])*7,
      total_sodium: Number(total_sodium[0])*7,
      total_potassium: Number(total_potassium[0])*7,
      total_cholesterol: Number(total_cholesterol[0])*7
    }).then((response) => {
      console.log(response);
      console.log(response.status);
    })
    setSuccess('Plan saved!');
};


  useEffect(() => {
    displayWeek()
    console.log('week calculated')
  }, []);
   
  
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


    <AppBar className='bar' position="static">
<Toolbar >
<Button variant="h2" color="main" onClick={Home}sx={{

            bgcolor: '#053B06', // theme.palette.primary.main
            color: 'main',
     
          }}>
        Plan for {net_id}
      </Button>
      <Button variant="h2" color="main" onClick={Log}>Log Meals</Button>
      <Button variant="h2" color="main" onClick={Progress}>Plan Progress</Button>
     
</Toolbar>
  </AppBar>

    <div>
      <h1>&nbsp; Your Plan</h1>
      <h2>&nbsp; &nbsp;Goal for the week of: {week}</h2>

      <form onSubmit={submitGoalHandler}>
      &nbsp; &nbsp;
      <TextField
        sx={{ paddingBottom: 1 }}
        id="total_cal"
        label="Calories"
        name="total_cal"
        size="small"
        type="number"
        value={total_cal}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_fat"
        label="Fat (g)"
        size="small"
        name="total_fat"
        type="number"
        value={total_fat}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_sat_fat"
        label="Saturated Fat (g)"
        size="small"
        name="total_sat_fat"
        type="number"
        value={total_sat_fat}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_trans_fat"
        label="Trans Fat (g)"
        size="small"
        name="total_trans_fat"
        type="number"
        value={total_trans_fat}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_carbs"
        label="Carbs (g)"
        size="small"
        name="total_carbs"
        type="number"
        value={total_carbs} 
        onChange={changeGoalHandler}
      />
      <br></br>
      &nbsp; &nbsp;
      <TextField
        id="total_fiber"
        label="Fiber (g)"
        size="small"
        name="total_fiber"
        type="number"
        value={total_fiber}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_sugar"
        label="Sugar (g)"
        size="small"
        name="total_sugar"
        type="number"
        value={total_sugar}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_protein"
        label="Protein (g)"
        size="small"
        name="total_protein"
        type="number"
        value={total_protein}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_sodium"
        label="Sodium (mg)"
        size="small"
        name="total_sodium"
        type="number"
        value={total_sodium}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_potassium"
        label="Potassium (mg)"
        size="small"
        name="total_potassium"
        type="number"
        value={total_potassium}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_cholesterol"
        label="Cholesterol (mg)"
        size="small"
        name="total_cholesterol"
        type="number"
        value={total_cholesterol}
        onChange={changeGoalHandler}
      />
      <br></br>
      <br></br>
      &nbsp; &nbsp;

      <Button 
      type="submit" 
      variant="contained"
      size = "large">
      Submit</Button>
      </form>
    </div>
    <h2> &nbsp; &nbsp; {success}</h2>
    <br></br>
    
   

    
    </ThemeProvider>
  
    );
  }
  
  export default MyPlan;