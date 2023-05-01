import "./App.css";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Menus from "./components/Menus";
import Plan from "./components/Plan";
import MenuExpansion from "./components/MenuExpansion";
import LogMeals from "./components/LogMeals";
import ThisWeek from "./components/ThisWeek";
import Past from "./components/Past"
import { ReactSession } from 'react-client-session';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

ReactSession.setStoreType("sessionStorage");
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/CreateAccount' element={<CreateAccount/>}></Route>
        <Route path='/Menus' element={<Menus/>}></Route>
        <Route path='/Plan' element={<Plan/>}></Route>
        <Route path='/MenuExpansion' element={<MenuExpansion/>}></Route>
        <Route path='/ThisWeek' element={<ThisWeek/>}></Route>
        <Route path='/LogMeals' element={<LogMeals/>}></Route>
        <Route path='/Past' element={<Past/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
