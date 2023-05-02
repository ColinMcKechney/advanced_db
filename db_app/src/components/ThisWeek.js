import React,{useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Login.css';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {red, green, lightBlue, lightGreen} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactSession } from 'react-client-session';
import Axios from 'axios';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
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
  var date_st = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var weekday = days[date_st.getDay()]

  if (weekday !== 'Sunday'){
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

function planDay(){
    var date_s = new Date();
    var index = date_s.getDay();
    return(index + 1)
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
    const goalURL = (net_id) => `http://3.219.93.142:8000/api/goal/${net_id}`;
    
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

          const [toDelete, setToDelete] = useState([]);

          const removeItem = (index) => {
            setToDelete([
                       ...toDelete.slice(0, index),
                       ...toDelete.slice(index + 1)
            ]);
          
          }
          
          function handleCheck (i) {
            console.log(i);
            if (toDelete.indexOf(i) > -1){
              //get index and delete
              var index = toDelete.indexOf(i)
              removeItem(index);
              console.log(`removed ${i}`);
              
            }
          
            else{
              setToDelete(toDelete => [...toDelete, i]);
              console.log(`added ${i}`);
            }
            
          }
    //Delete checked from plan
    const sendToPlan = () => {
        Axios.delete('http://3.219.93.142:8000/api/week_meals', {net_id: ReactSession.get("net_id"), item_list: toDelete,}).then((response) => {
         console.log(response);
       });
    }

    function planDay(){
      var date_s = new Date();
      var index = date_s.getDay();
      return(index + 1)
  }

   //Send sums to results if it is Saturday
   const sendResults = () => {
    var day = planDay();
    if (day === 7){
      Axios.post('http://3.219.93.142:8000/api/results', 
      {
        net_id: ReactSession.get("net_id"), 
        week_date: weekStart(),
        total_cal: Number(sum.total_cal),
        total_fat: Number(sum.total_fat),
        total_sat_fat: Number(sum.total_sat_fat),
        total_trans_fat: Number(sum.total_trans_fat),
        total_carbs: Number(sum.total_carbs),
        total_fiber: Number(sum.total_fiber),
        total_sugar: Number(sum.total_sugar),
        total_protein: Number(sum.total_protein),
        total_sodium: Number(sum.total_sodium),
        total_potassium: Number(sum.total_potassium),
        total_cholesterol: Number(sum.total_cholesterol),}
        ).then((response) => {
      console.log(response);
    });
  }
}



    //Set color variables for chips      
    const [cals, setCals] = useState(false);
    const [fat, setFat] = useState(false);
    const [trans, setTrans] = useState(false);
    const [carbs, setCarbs] = useState(false);
    const [sugar, setSugar] = useState(false);
    const [fiber, setFiber] = useState(false);
    const [cholesterol, setChol] = useState(false);
    const [sodium, setSodium] = useState(false);
    const [sat, setSat] = useState(false);
    const [protein, setProtein] = useState(false);
    const [potassium, setPotassium] = useState(false);
    
    const setColors = () => {

     

       var dayFactor = planDay() / 7;
       console.log(dayFactor)
       console.log('Sum calories:')
       console.log(sum.calories);
       console.log('Goals calories:')
       console.log(goals.calories);
       console.log(goals.calories*dayFactor);

        //set green
        if(sum.calories < (1.1*goals.total_cal*dayFactor) && sum.calories >= (0.9*goals.total_cal*dayFactor)){
            setCals(true)
        }
        else {
            setCals(false)
        }
        if(sum.fat_g < (1.1*goals.total_fat*dayFactor) && sum.fat_g >= (0.9*goals.total_fat*dayFactor)){
            setFat(true)
        }
        else {
            setFat(false)
        }
        
        if(sum.trans_fat_g < (1.1*goals.total_trans_fat*dayFactor) && sum.trans_fat_g >= (0.9*goals.total_trans_fat*dayFactor)){
            setTrans(true)
        }
        else {
            setTrans(false)
        }
        if(sum.carbs_g < (1.1*goals.total_carbs*dayFactor) && sum.carbs_g >= (0.9*goals.total_carbs*dayFactor)){
            setCarbs(true)
        }
        else {
            setCarbs(false)
        }
        if(sum.sugar_g < (1.1*goals.total_sugar*dayFactor) && sum.sugar_g >= (0.9*goals.total_sugar*dayFactor)){
            setSugar(true)
        }
        else {
            setSugar(false)
        }
        if(sum.protein_g < (1.1*goals.total_protein*dayFactor) && sum.protein_g >= (0.9*goals.total_protein*dayFactor)){
            setProtein(true)
        }
        else {
            setProtein(false)
        }
        if(sum.fiber_g < (1.1*goals.total_fiber*dayFactor) && sum.fiber_g >= (0.9*goals.total_fiber*dayFactor)){
            setFiber(true)
        }
        else {
            setFiber(false)
        }
        if(sum.cholesterol_mg < (1.1*goals.total_cholesterol*dayFactor) && sum.cholesterol_mg >= (0.9*goals.total_cholesterol*dayFactor)){
            setChol(true)
        }
        else {
            setChol(false)
        }
        if(sum.sodium_mg < (1.1*goals.total_sodium*dayFactor) && sum.sodium_mg >= (0.9*goals.total_sodium*dayFactor)){
            setSodium(true)
        }
        else {
            setSodium(false)
        }
        if(sum.sat_fat_g < (1.1*goals.total_sat_fat*dayFactor) && sum.sat_fat_g >= (0.9*goals.total_sat_fat*dayFactor)){
            setSat(true)
        }
        else {
            setSat(false)
        }
        if(sum.potassium_mg < (1.1*goals.total_potassium*dayFactor) && sum.potassium_mg >= (0.9*goals.total_potassium*dayFactor)){
            setPotassium(true)
        } else {
            setPotassium(false)
        }

    
    }




    //Run getSum, getHistory, and getPlan on page load
        useEffect(() => {
            getHistory()
            console.log('History in')
            getSum()
            console.log('Sum in')
            getGoal()
            console.log('Goal in')
            setColors()
            console.log('Colors set')
            console.log(planDay())
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
      <Button sx={{
        color: 'main',
    ':hover': {
      bgcolor: 'green',
      color: 'white',
    },
    marginLeft: 5
  }} onClick={sendToPlan}> Remove checked from log</Button>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{margin: 5, maxHeight: 200, maxWidth:1400}}>
          <Table stickyHeader sx={{maxWidth:1400}}>
          <TableHead>
            <TableRow sx={{maxWidth:1400}}>
            
            <TableCell style={{ maxWidth: 110}}  align="left">Remove?</TableCell>
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

<TableCell padding="checkbox">

                     
<Checkbox

color="primary"
onChange={() => handleCheck(pastitem.item_id)}
/>
</TableCell>
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
      <p> &nbsp; &nbsp; Each category will be red if you are more than 30% off track from your weekly goal for this point in the week.</p>
      <p> &nbsp; &nbsp; If it's green, you're pretty much on track!</p>

      <Stack direction="row" spacing={2}>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Chip label="Calories" variant="outlined" sx={{
          
          bgcolor: cals ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        <Chip label="Fat" variant="outlined" sx={{
          
          bgcolor: fat ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp;
        <Chip label="Saturated Fat" variant="outlined" sx={{
          
          bgcolor: sat ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Trans Fat" variant="outlined" sx={{
          
          bgcolor: trans ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp;
        <Chip label="Carbs" variant="outlined" sx={{
          
          bgcolor: carbs ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp;
        <Chip label="Fiber" variant="outlined" sx={{
          
          bgcolor: fiber ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Sugar" variant="outlined" sx={{
          
          bgcolor: sugar ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Protein" variant="outlined" sx={{
          
          bgcolor: protein ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp; &nbsp;
        <Chip label="Sodium" variant="outlined" sx={{
          
          bgcolor: sodium ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Chip label="Potassium" variant="outlined" sx={{
          
          bgcolor: potassium ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Chip label="Cholesterol" variant="outlined" sx={{
          
          bgcolor: cholesterol ? '#117E0F':'#D93030',
          color: 'white',
   
        }}/>
      </Stack>
    </div>

    
    </ThemeProvider>
  
    );
  }
  
  export default ThisWeek;