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

  Axios.post()
};
  
  return (
  <ThemeProvider theme={theme}>  
    <div>
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
    </div>

    <div>
      <h1>&nbsp; Your Plan</h1>
      <h2>&nbsp; &nbsp;Goal for the week of: </h2>

      <form onSubmit={submitGoalHandler}>
      &nbsp; &nbsp;
      <TextField
        sx={{ paddingBottom: 1 }}
        id="total_cal"
        label="Calories"
        name="total_cal"
        value={total_cal}
        size ="small"
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_fat"
        label="Fat (g)"
        name="total_fat"
        value={total_fat}
        size="small"
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_sat_fat"
        label="Saturated Fat (g)"
        size="small"
        name="total_sat_fat"
        value={total_sat_fat}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_trans_fat"
        label="Trans Fat (g)"
        size="small"
        name="total_trans_fat"
        value={total_trans_fat}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_carbs"
        label="Carbs (g)"
        size="small"
        name="total_carbs"
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
        value={total_fiber}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_sugar"
        label="Sugar (g)"
        size="small"
        name="total_sugar"
        value={total_sugar}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_protein"
        label="Protein (g)"
        size="small"
        name="total_protein"
        value={total_protein}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_sodium"
        label="Sodium (mg)"
        size="small"
        name="total_sodium"
        value={total_sodium}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_potassium"
        label="Potassium (mg)"
        size="small"
        name="total_potassium"
        value={total_potassium}
        onChange={changeGoalHandler}
      />
      &nbsp; &nbsp;
      <TextField
        id="total_cholesterol"
        label="Cholesterol (mg)"
        size="small"
        name="total_cholesterol"
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
    <br></br>
    
    <div>
      <h2>
        &nbsp; &nbsp;
        So Far This Week:
      </h2>

      <h3>
        &nbsp; &nbsp;
        Foods Eaten
      </h3>

      <TableContainer component={Paper}>
          <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 90 }}  align="lect">Food</TableCell>
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
    
      <h3>
        &nbsp; &nbsp;
        Weekly Totals
      </h3>

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Calories</TableCell>
              <TableCell align="left">Fat&nbsp;(g)</TableCell>
              <TableCell align="left">Saturated Fat&nbsp;(g)</TableCell>
              <TableCell align="left">TransFat&nbsp;(g)</TableCell>
              <TableCell align="left">Carbs&nbsp;(g)</TableCell>
              <TableCell align="left">Fiber&nbsp;(g)</TableCell>
              <TableCell align="left">Sugar&nbsp;(g)</TableCell>
              <TableCell align="left">Protein&nbsp;(g)</TableCell>
              <TableCell align="left">Sodium&nbsp;(mg)</TableCell>
              <TableCell align="left">Potassium&nbsp;(mg)</TableCell>
              <TableCell align="left">Cholesterol&nbsp;(mg)</TableCell>
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br></br>
      <Stack direction="row" spacing={2}>
        &nbsp; &nbsp;
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

    <div>
      <h2>
        &nbsp; &nbsp;
        Add to Food Journal
      </h2>
      <h3> &nbsp; &nbsp;
        On-Campus
      </h3>
      <form>
          &nbsp; &nbsp;
          <FormControl sx={{minWidth:170 }}>
            <InputLabel id="dining-location-select-label">Dining Location</InputLabel>
            <Select labelId="dining-location-select-label" id="dining-location-select" label="Dining Location">
              <MenuItem>DH</MenuItem>
              <MenuItem>Chick-fil-a</MenuItem>
              <MenuItem>Smashburger</MenuItem>
              <MenuItem>Flip Kitchen</MenuItem>
              <MenuItem>ABP</MenuItem>
              <MenuItem>Starbucks</MenuItem>
              <MenuItem>Modern Market</MenuItem>
              <MenuItem>Taco Bell</MenuItem>
            </Select>
          </FormControl>

          &nbsp; &nbsp;
          <TextField
            id="keywordsearch"
            label="Keyword"
            size="medium"
          />

          &nbsp; &nbsp;
          <Button sx={{ m: 1}}
            type="search"
            variant="contained"
            size="medium">
          Search</Button>
      </form>

      <h3> &nbsp; &nbsp;
        Off-Campus
      </h3>
        <form>
          &nbsp; &nbsp;
          <TextField
            sx={{ paddingBottom: 1 }}
            id="food-input"
            label="Food Item"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            sx={{ paddingBottom: 1 }}
            id="calorie-input"
            label="Calories"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="fat-input"
            label="Fat (g)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="saturated_fat-input"
            label="Saturated Fat (g)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="trans_fat-input"
            label="Trans Fat (g)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="carbs-input"
            label="Carbs (g)"
            size="small"
          />
          <br></br>
          &nbsp; &nbsp;
          <TextField
            id="fiber-input"
            label="Fiber (g)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="sugar-input"
            label="Sugar (g)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="protein-input"
            label="Protein (g)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="sodium-input"
            label="Sodium (mg)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="potassium-input"
            label="Potassium (mg)"
            size="small"
          />
          &nbsp; &nbsp;
          <TextField
            id="cholesterol-input"
            label="Cholesterol (mg)"
            size="small"
          />
          <br></br>
          <br></br>
          &nbsp; &nbsp;

          <Button
            type="submit"
            variant="contained"
            size="large">
            Submit</Button>
        </form>

    </div>
    </ThemeProvider>
  
    );
  }
  
  export default MyPlan;