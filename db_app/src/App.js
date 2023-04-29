import "./App.css";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Menus from "./components/Menus";


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
      </Routes>
    </Router>
  );
}

export default App;
