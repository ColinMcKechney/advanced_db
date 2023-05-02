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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


const theme = createTheme({
    palette: {
      primary: {
        main: lightGreen[700],
        apple: red[500],
      },

    },
  });

function Menus() {

  //Navigate function
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

//Format api all url based on eatery clicked
const makeEateryUrl = (eatery) => `http://3.219.93.142:8000/api/eatery/${eatery}`;
const getEatery = () => {
  return ReactSession.get("eatery");
}

//Http request to get menu items
const getMenu = () => {
const eatery_to_query = getEatery();
 Axios.get(makeEateryUrl(eatery_to_query)).then((response) => {
  console.log(response.data);
  setmenuItems(response.data);
});
 
}
//State variables for menu items and for items to add to plan
const [menuItems, setmenuItems] = useState([{}]);
const [toAdd, setToAdd] = useState([]);


//Remove an item from the to be added
const removeItem = (index) => {
  setToAdd([
             ...toAdd.slice(0, index),
             ...toAdd.slice(index + 1)
  ]);

}

//Checkbox handler
function handleCheck (i) {
  console.log(i);
  if (toAdd.indexOf(i) > -1){
    //get index and delete
    var index = toAdd.indexOf(i)
    removeItem(index);
    console.log(`removed ${i}`);
    
  }

  else{
    setToAdd(toAdd => [...toAdd, i]);
    console.log(`added ${i}`);
  }
  
}

//Http request to send checked items to plan
const sendToPlan = () => {
  Axios.post('http://3.219.93.142:8000/api/week_meals', {net_id: ReactSession.get("net_id"), item_list: toAdd,}).then((response) => {
   console.log(response);
 });
  
 }
 
//Run get menu on page load
useEffect(() => {
  getMenu()
  console.log('Menu in')
}, [])
 

  return (

    <ThemeProvider theme={theme}>
    <AppBar className='bar' position="static">
  <Toolbar variant="dense">
  <Button  variant="h6" color="main" position="right" onClick={Home}>
   Home</Button> 
    <Button variant="h6" color="main" component="div" onClick={Menus}>
      Menus
    </Button>
    <Button  variant="h6" onClick="Past">
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

<AppBar className='bar' position="static">
<Toolbar>
<h2 sx={{padding:5, margin: 5}}> &nbsp; &nbsp; Menu Items </h2>
      <Button sx={{ color: 'white', ':hover': { bgcolor: '#ffc6c4', color: 'white', }, marginLeft: 5 }} onClick={sendToPlan}>Add to Plan</Button>
     
</Toolbar>
  </AppBar>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{margin: 5, maxHeight: 440, maxWidth:1400}}>
          <Table stickyHeader sx={{maxWidth:1400}}>
          <TableHead>
            <TableRow sx={{maxWidth:1400}}>
            
              <TableCell style={{ maxWidth: 110}}  align="left">Add?</TableCell>
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
            {menuItems.map((menuItem, i) => {
              console.log(i);
              return(
                <TableRow
                    key={menuItem.item_name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" onChange={() => handleCheck(menuItem.item_id)}/>
                    </TableCell>
                    <TableCell>{menuItem.item_name}</TableCell>     
              <TableCell> {menuItem.calories}</TableCell>
              <TableCell> {menuItem.fat}</TableCell>
              <TableCell> {menuItem.sat_fat}</TableCell>
              <TableCell> {menuItem.trans_fat}</TableCell>
              <TableCell> {menuItem.carbs}</TableCell>
              <TableCell> {menuItem.fiber}</TableCell>
              <TableCell>{menuItem.sugar} </TableCell>
              <TableCell> {menuItem.protein}</TableCell>
              <TableCell>{menuItem.sodium} </TableCell>
              <TableCell> {menuItem.potassium}</TableCell>
              <TableCell> {menuItem.cholesterol}</TableCell>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>

</ThemeProvider>
  
  );
}
export default Menus;