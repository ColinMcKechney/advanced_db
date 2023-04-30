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

<Box sx={{  
          margin: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}>
<Box sx={{  
        
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
<Card sx={{ maxWidth: 200, margin: 2 }}>
      <CardMedia
        image={ require("./images/south.jpg")}
        title="South Dining Hall"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Dining Hall
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>

      <Card sx={{ maxWidth: 200, margin: 2  }}>
      <CardMedia
        image={ require("./images/starb.jpg")}
        title="Starbucks"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Starbucks
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>
      </Box>

      <Box sx={{  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
<Card sx={{ maxWidth: 200, margin: 2  }}>
      <CardMedia
        image={ require("./images/abp.jpg")}
        title="ABP"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ABP
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>

      <Card sx={{ maxWidth: 200, margin: 2  }}>
      <CardMedia
        image={ require("./images/chick.jpg")}
        title="Chick"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Chick-fil-a
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>
      </Box>
      <Box sx={{  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
<Card sx={{ maxWidth: 200, margin: 2  }}>
      <CardMedia
        image={ require("./images/flip.jpg")}
        title="Flip"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Flip Kitchen
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>

      <Card sx={{ maxWidth: 200, margin: 2  }}>
      <CardMedia
        image={ require("./images/moma.jpg")}
        title="Moma"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Modern Market
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>
      </Box>
      <Box sx={{  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
<Card sx={{ maxWidth: 200, margin: 2  }}>
      <CardMedia
        image={ require("./images/taco.jpg")}
        title="Taco Bell"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Taco Bell
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>

      <Card sx={{ maxWidth: 200, margin: 2  }}>
      <CardMedia
        image={ require("./images/smash.jpg")}
        title="smash"
        sx={{ width: 200, height:170}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Smashburger
        </Typography>
        <Button>View Items</Button>
      </CardContent>
      </Card>
      </Box>
      </Box>

</ThemeProvider>
  
  );
}
export default Menus;