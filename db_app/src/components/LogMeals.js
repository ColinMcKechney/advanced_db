import React,{useState} from 'react';
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

const{total_cal, total_fat, total_sat_fat, total_trans_fat, total_carbs, total_fiber, 
  total_sugar, total_protein, total_sodium, total_potassium, total_cholesterol} = goalInput

const changeGoalHandler = evt =>{
  setGoalInput({...goalInput, [evt.target.name]: [evt.target.value] })
}

const submitGoalHandler = evt => {
  evt.preventDefault();
  console.log(goalInput)
  console.log(net_id)
  console.log(weekStart())
  Axios.post("http://3.219.93.142:8000/api/goal",
    {
      net_id: net_id,
      week_date: weekStart(),
      total_cal: Number(total_cal[0]),
      total_fat: Number(total_fat[0]),
      total_sat_fat: Number(total_sat_fat[0]),
      total_trans_fat: Number(total_trans_fat[0]),
      total_carbs: Number(total_carbs[0]),
      total_fiber: Number(total_fiber[0]),
      total_sugar: Number(total_sugar[0]),
      total_protein: Number(total_protein[0]),
      total_sodium: Number(total_sodium[0]),
      total_potassium: Number(total_potassium[0]),
      total_cholesterol: Number(total_cholesterol[0])
    }).then((response) => {
      console.log(response);
      console.log(response.status);
    })
};

//to find a food item from an on campus location to your weekly journal
const [keyword, setKeyword] = useState({
  search_term:""
})

const [searchItems, setSearchItems] = useState([{}]);

const{search_term} = keyword

const removeItem = (index) => {
  setSearchItems([
             ...searchItems.slice(0, index),
             ...searchItems.slice(index + 1)
  ]);

}

function handleCheck (i) {
  console.log(i);
  if (searchItems.indexOf(i) > -1){
    //get index and delete
    var index = searchItems.indexOf(i)
    removeItem(index);
    console.log(`removed ${i}`);
    
  }

  else{
    setSearchItems(searchItems => [...searchItems, i]);
    console.log(`added ${i}`);
  }
  
}


const changeSearchHandler = evt => {
  setKeyword({ ...keyword, [evt.target.name]: [evt.target.value] })
}

const submitSearchHandler = evt => {
  evt.preventDefault();
  console.log(search_term)
  console.log(net_id)
  Axios.post("http://3.219.93.142:8000/api/menu_search",
    {
      search_term:search_term[0]
    }).then((response) => {
      console.log(response);
      console.log(response.status);
      console.log(response.data);
      setSearchItems(response.data);
    })
};


//to add an off campus food item or meal to your weekly journal
  const [offCampusInput, setOffCampusInput] = useState({
    item_name:"",
    amount: 0,
    calories: 0,
    fat_g: 0,
    sat_fat_g: 0,
    trans_fat_g: 0,
    carbs_g: 0,
    fiber_g: 0,
    sugar_g: 0,
    protein_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    cholesterol_mg: 0,
  }
  );

  const {item_name, amount, calories, fat_g, sat_fat_g, trans_fat_g, carbs_g, fiber_g,sugar_g, protein_g,
    sodium_mg, potassium_mg, cholesterol_mg} = offCampusInput

  const changeOffCampusHandler = evt => {
    setOffCampusInput({ ...offCampusInput, [evt.target.name]: [evt.target.value] })
  }

  const submitOffCampusHandler = evt => {
    evt.preventDefault();
    console.log(offCampusInput)
    console.log(net_id)
    Axios.post("http://3.219.93.142:8000/api/week_plan",
      {
        net_id: net_id,
        item_name: item_name[0],
        amount: Number(amount[0]),
        calories: Number(calories[0]),
        fat_g: Number(fat_g[0]),
        sat_fat_g: Number(sat_fat_g[0]),
        trans_fat_g: Number(trans_fat_g[0]),
        carbs_g: Number(carbs_g[0]),
        fiber_g: Number(fiber_g[0]),
        sugar_g: Number(sugar_g[0]),
        protein_g: Number(protein_g[0]),
        sodium_mg: Number(sodium_mg[0]),
        potassium_mg: Number(potassium_mg[0]),
        cholesterol_mg: Number(cholesterol_mg[0])
      }).then((response) => {
        console.log(response);
        console.log(response.status);
      })
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


    <AppBar className='bar' position="static">
<Toolbar >
<Button variant="h2" color="main" onClick={Home}>
        Plan for {net_id}
      </Button>
      <Button variant="h2" color="main" sx={{

bgcolor: '#053B06', // theme.palette.primary.main
color: 'main',

}} onClick={Log}>Log Meals</Button>
      <Button variant="h2" color="main" onClick={Progress}>Plan Progress</Button>
     
</Toolbar>
  </AppBar>

   
    <div>
      <h1>
        &nbsp; 
        Add to Food Journal
      </h1>
      <h3> &nbsp; &nbsp;
        On-Campus
      </h3>
      <form onSubmit={submitSearchHandler}>
          &nbsp; &nbsp;
          <TextField
            id="search_term"
            label="Keyword"
            size="medium"
            name="search_term"
            value={search_term}
            onChange={changeSearchHandler}
          />

          &nbsp; &nbsp;
          <Button sx={{ m: 1}}
            type="search"
            variant="contained"
            size="medium">
          Search</Button>
      </form>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{margin: 5, maxHeight: 440, maxWidth:1400}}>
          <Table stickyHeader sx={{maxWidth:1400}}>
          <TableHead>
            <TableRow sx={{maxWidth:1400}}>
            
              <TableCell style={{ maxWidth: 110}}  align="left">Add?</TableCell>
              <TableCell style={{ maxWidth: 110}}  align="left">Eatery</TableCell>
              <TableCell style={{ maxWidth: 90 }} align="left">Item Name</TableCell>
              <TableCell style={{ maxWidth: 70 }} align="left">Serving Size</TableCell>
          
            </TableRow>
          </TableHead>

          <TableBody sx={{maxWidth:1350}}>
            {searchItems.map((searchitem, i) => {
              console.log(i);
              return(
                <TableRow
                    key={searchitem.item_name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox">

                     
                    <Checkbox
                      
                      color="primary"
                      onChange={() => handleCheck(searchitem.item_id)}
                    />
                    </TableCell>
                    <TableCell>
                      {searchitem.item_name}
                    </TableCell>
        
              <TableCell> {searchitem.eatery_id}</TableCell>
              <TableCell> {searchitem.item_name}</TableCell>
              <TableCell> {searchitem.serving_size}</TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    

      <h3> &nbsp; &nbsp;
        Off-Campus
      </h3>
        <form onSubmit={submitOffCampusHandler}>
          &nbsp; &nbsp;
          <TextField
            sx={{ paddingBottom: 1 }}
            id="item_name"
            label="Food Item"
            size="small"
            name="item_name"
            value={item_name}
            onChange={changeOffCampusHandler}
          />
          <br></br>
          &nbsp; &nbsp;
          <TextField
            id="amount"
            label="Number of Servings"
            size="small"
            name="amount"
            type="number"
            value={amount}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            sx={{ paddingBottom: 1 }}
            id="calories"
            label="Calories"
            size="small"
            name="calories"
            type="number"
            value={calories}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="fat"
            label="Fat (g)"
            size="small"
            name="fat_g"
            type="number"
            value={fat_g}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="sat_fat"
            label="Saturated Fat (g)"
            size="small"
            name="sat_fat_g"
            type="number"
            value={sat_fat_g}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="trans_fat"
            label="Trans Fat (g)"
            size="small"
            name="trans_fat_g"
            type="number"
            value={trans_fat_g}
            onChange={changeOffCampusHandler}
          />
          
          &nbsp; &nbsp;
          <TextField
            id="carbs"
            label="Carbs (g)"
            size="small"
            name="carbs_g"
            type="number"
            value={carbs_g}
            onChange={changeOffCampusHandler}
          />
          <br></br>
          &nbsp; &nbsp;
          <TextField
            id="fiber"
            label="Fiber (g)"
            size="small"
            name="fiber_g"
            type="number"
            value={fiber_g}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="sugar"
            label="Sugar (g)"
            size="small"
            name="sugar_g"
            type="number"
            value={sugar_g}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="protein"
            label="Protein (g)"
            size="small"
            name="protein_g"
            type="number"
            value={protein_g}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="sodium"
            label="Sodium (mg)"
            size="small"
            name="sodium_mg"
            type="number"
            value={sodium_mg}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="potassium"
            label="Potassium (mg)"
            size="small"
            name="potassium_mg"
            type="number"
            value={potassium_mg}
            onChange={changeOffCampusHandler}
          />
          &nbsp; &nbsp;
          <TextField
            id="cholesterol"
            label="Cholesterol (mg)"
            size="small"
            name="cholesterol_mg"
            type="number"
            value={cholesterol_mg}
            onChange={changeOffCampusHandler}
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