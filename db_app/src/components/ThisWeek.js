import React,{useState, useEffect} from 'react';
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
import Axios from 'axios';
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

function ThisWeek() {

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


  //Get history of items for this week
  const [pastItems, setPastItems] = useState([{}]);
  const makeURL = (net_id) => `http://3.219.93.142:8000/api/week_progress/${net_id}`;

  const getHistory = () => {
    const net_id = ReactSession.get("net_id");
    const url_to_query = makeURL(net_id);
     Axios.get(url_to_query).then((response) => {
      console.log(response.data);
      setPastItems(response.data);
    });
     
    }
      //Get sum of totals for weekly plan (progress)
    const [goals, setGoals] = useState([{}]);
    const goalURL = (net_id) => `http://3.219.93.142:8000/api/week_goal/${net_id}`;
    
      const getGoal = () => {
        const net_id = ReactSession.get("net_id");
        const url_to_query = goalURL(net_id);
         Axios.get(url_to_query).then((response) => {
          console.log(response.data);
          setGoals(response.data);
        });
         
        }

        //Get weekly plan goals
        const [sum, setSum] = useState([{}]);
        const sumURL = (net_id) => `http://3.219.93.142:8000/api/week_sum/${net_id}`;
      
        const getSum = () => {
          const net_id = ReactSession.get("net_id");
          const url_to_query = sumURL(net_id);
           Axios.get(url_to_query).then((response) => {
            console.log(response.data);
            setSum(response.data);
          });
           
          }


    const [cals, setCals] = useState([{}]);
    const [fat, setFat] = useState([{}]);
    const [trans, setTrans] = useState([{}]);

    //Run getSum, getHistory, and getPlan on page load
        useEffect(() => {
            getHistory()
            console.log('History in')
            getSum()
            console.log('Sum in')
            getGoal()
            console.log('Goal in')
          }, [])
       
  
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
<Toolbar>
<Button variant="h2" color="main" onClick={Home}>
        Plan for {net_id}
      </Button>
      <Button variant="h2" color="main" onClick={Log}>Log Meals</Button>
      <Button variant="h2" color="main" onClick={Progress} sx={{
          
          bgcolor: '#053B06', // theme.palette.primary.main
          color: 'main',
   
        }}>Plan Progress</Button>
     
  
     
</Toolbar>
  </AppBar>

    
    <div>
      <h1>
      &nbsp;
        So Far This Week:
      </h1>

      <h3>
        &nbsp; &nbsp;
        Foods Eaten
      </h3>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{margin: 5, maxHeight: 200, maxWidth:1400}}>
          <Table stickyHeader sx={{maxWidth:1400}}>
          <TableHead>
            <TableRow sx={{maxWidth:1400}}>
            
        
              <TableCell style={{ maxWidth: 110}}  align="left">Food</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Calories</TableCell>
              <TableCell style={{ maxWidth: 70 }} align="left">Fat&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Saturated Fat&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">TransFat&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 50 }} align="left">Carbs&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 70 }} align="left">Fiber&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Sugar&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Protein&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Sodium&nbsp;(mg)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Potassium&nbsp;(mg)</TableCell>
              <TableCell style={{ maxWidth: 80 }} align="left">Cholesterol&nbsp;(mg)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{maxWidth:1350}}>
            {pastItems.map((pastitem, i) => {
              console.log(i);
              return(
                <TableRow
                    key={pastitem.item_name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  
                    <TableCell>
                      {pastitem.item_name}
                    </TableCell>
        
              <TableCell> {pastitem.calories}</TableCell>
              <TableCell> {pastitem.fat_g}</TableCell>
              <TableCell> {pastitem.sat_fat_g}</TableCell>
              <TableCell> {pastitem.trans_fat_g}</TableCell>
              <TableCell> {pastitem.carbs_g}</TableCell>
              <TableCell> {pastitem.fiber_g}</TableCell>
              <TableCell>{pastitem.sugar_g} </TableCell>
              <TableCell> {pastitem.protein_g}</TableCell>
              <TableCell>{pastitem.sodium_mg} </TableCell>
              <TableCell> {pastitem.potassium_mg}</TableCell>
              <TableCell> {pastitem.cholesterol_mg}</TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>

    
      <h3>
        &nbsp; &nbsp;
        Weekly Totals
      </h3>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{margin: 5, maxHeight: 200, maxWidth:1400}}>
          <Table stickyHeader sx={{maxWidth:1400}}>
          <TableHead>
            <TableRow sx={{maxWidth:1400}}>
            
    
              <TableCell style={{ maxWidth: 90 }} align="left">Calories</TableCell>
              <TableCell style={{ maxWidth: 70 }} align="left">Fat&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Saturated Fat&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">TransFat&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 50 }} align="left">Carbs&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 70 }} align="left">Fiber&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Sugar&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Protein&nbsp;(g)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Sodium&nbsp;(mg)</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Potassium&nbsp;(mg)</TableCell>
              <TableCell style={{ maxWidth: 80 }} align="left">Cholesterol&nbsp;(mg)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{maxWidth:1350}}>
                <TableRow
                    key={sum.item_name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  
            
        
              <TableCell> {sum.calories}</TableCell>
              <TableCell> {sum.fat_g}</TableCell>
              <TableCell> {sum.sat_fat_g}</TableCell>
              <TableCell> {sum.trans_fat_g}</TableCell>
              <TableCell> {sum.carbs_g}</TableCell>
              <TableCell> {sum.fiber_g}</TableCell>
              <TableCell>{sum.sugar_g} </TableCell>
              <TableCell> {sum.protein_g}</TableCell>
              <TableCell>{sum.sodium_mg} </TableCell>
              <TableCell> {sum.potassium_mg}</TableCell>
              <TableCell> {sum.cholesterol_mg}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>

      <br></br>
      <h4>
        &nbsp; &nbsp;
        At a glance
      </h4>

      <Stack direction="row" spacing={2}>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Chip label="Calories" variant="outlined"/>
        <Chip label="Fat" variant="outlined"/>
        &nbsp; &nbsp;
        <Chip label="Saturated Fat" variant="outlined"/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Trans Fat" variant="outlined"/>
        &nbsp; &nbsp;
        <Chip label="Carbs" variant="outlined"/>
        &nbsp; &nbsp;
        <Chip label="Fiber" variant="outlined"/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Sugar" variant="outlined"/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Protein" variant="outlined"/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Sodium" variant="outlined"/>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Chip label="Potassium" variant="outlined"/>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Chip label="Cholesterol" variant="outlined"/>
      </Stack>
    </div>

    
    </ThemeProvider>
  
    );
  }
  
  export default ThisWeek;