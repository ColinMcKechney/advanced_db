import "./App.css";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Menus from "./components/Menus";
import Plan from "./components/Plan";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

function App() {


  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/CreateAccount' element={<CreateAccount/>}></Route>
        <Route path='/Menus' element={<Menus/>}></Route>
        <Route path='/Plan' element={<Plan/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
