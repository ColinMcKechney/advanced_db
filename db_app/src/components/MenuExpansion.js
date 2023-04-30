import React,{useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './Login.css';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { CardMedia, CardContent } from '@mui/material';
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


const theme = createTheme({
    palette: {
      primary: {
        main: lightGreen[700],
        apple: red[500],
      },

    },
  });

function Menus() {

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
const makeEateryUrl = (eatery) => `http://3.219.93.142:8000/api/eatery/${eatery}`;
const getEatery = () => {
  return ReactSession.get("eatery");
}


const getMenu = () => {
const eatery_to_query = getEatery();
 Axios.get(makeEateryUrl(eatery_to_query)).then((response) => {
  console.log(response.data);
  setmenuItems(response.data);
});
 
}


const [menuItems, setmenuItems] = useState([{}]);

const doMenu = () => {
  const data = getMenu();
  setmenuItems(data);
}

const buttonTime = () => {
 getMenu();
 console.log(menuItems);
}
 
  
 

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
<Button onClick={buttonTime}>Please God Work</Button>
<ul>{menuItems.map(menuitem => <li key={menuitem.item_name}>{menuitem.item_name}</li>)}</ul>



</ThemeProvider>
  
  );
}
export default Menus;