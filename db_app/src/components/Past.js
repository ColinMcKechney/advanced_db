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

  //Get history of plans for this week
  const [pastPlans, setPastPlans] = useState([{}]);
  const makePastURL = (net_id) => `http://3.219.93.142:8000/api/${net_id}`;

  const getPastPlans = () => {
    const net_id = ReactSession.get("net_id");
    const url_to_query = makePastURL(net_id);
     Axios.get(url_to_query).then((response) => {
      console.log(response.data);
      setPastPlans(response.data);
    });
     
    }
      //Get history of actual totals for weekly plan (progress)
      const [past, setPast] = useState([{}]);
      const makeURL = (net_id) => `http://3.219.93.142:8000/api/${net_id}`;
    
      const getPast = () => {
        const net_id = ReactSession.get("net_id");
        const url_to_query = makeURL(net_id);
         Axios.get(url_to_query).then((response) => {
          console.log(response.data);
          setPast(response.data);
        });
         
        }

    //run getPast and pastPlans on page load
        useEffect(() => {
            getPast()
            console.log('Past actual in')
            getPastPlans()
            console.log('Past plans in')
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
    

    
    <div>
      <h1>
      &nbsp;
        Your History
      </h1>

      

      <h3>
        &nbsp; &nbsp;
        Past plans by week:
      </h3>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{margin: 5, maxHeight: 200, maxWidth:1400}}>
          <Table stickyHeader sx={{maxWidth:1400}}>
          <TableHead>
            <TableRow sx={{maxWidth:1400}}>
            
        
              <TableCell style={{ maxWidth: 110}}  align="left">Week</TableCell>
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
            {pastPlans.map((pastplan, i) => {
              console.log(i);
              return(
                <TableRow
                    key={pastplan.week}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  
                    <TableCell>
                      {pastplan.week}
                    </TableCell>
        
              <TableCell> {pastplan.calories}</TableCell>
              <TableCell> {pastplan.fat_g}</TableCell>
              <TableCell> {pastplan.sat_fat_g}</TableCell>
              <TableCell> {pastplan.trans_fat_g}</TableCell>
              <TableCell> {pastplan.carbs_g}</TableCell>
              <TableCell> {pastplan.fiber_g}</TableCell>
              <TableCell>{pastplan.sugar_g} </TableCell>
              <TableCell> {pastplan.protein_g}</TableCell>
              <TableCell>{pastplan.sodium_mg} </TableCell>
              <TableCell> {pastplan.potassium_mg}</TableCell>
              <TableCell> {pastplan.cholesterol_mg}</TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>

    
      <h3>
        &nbsp; &nbsp;
        Past actual by week:
      </h3>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{margin: 5, maxHeight: 200, maxWidth:1400}}>
          <Table stickyHeader sx={{maxWidth:1400}}>
          <TableHead>
            <TableRow sx={{maxWidth:1400}}>
            
        
              <TableCell style={{ maxWidth: 110}}  align="left">Week</TableCell>
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
            {past.map((progress, i) => {
              console.log(i);
              return(
                <TableRow
                    key={progress.week}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  
                    <TableCell>
                      {progress.week}
                    </TableCell>
        
              <TableCell> {progress.calories}</TableCell>
              <TableCell> {progress.fat_g}</TableCell>
              <TableCell> {progress.sat_fat_g}</TableCell>
              <TableCell> {progress.trans_fat_g}</TableCell>
              <TableCell> {progress.carbs_g}</TableCell>
              <TableCell> {progress.fiber_g}</TableCell>
              <TableCell>{progress.sugar_g} </TableCell>
              <TableCell> {progress.protein_g}</TableCell>
              <TableCell>{progress.sodium_mg} </TableCell>
              <TableCell> {progress.potassium_mg}</TableCell>
              <TableCell> {progress.cholesterol_mg}</TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      </div>

    
    </ThemeProvider>
  
    );
  }
  
  export default Past;