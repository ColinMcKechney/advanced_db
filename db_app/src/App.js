import React,{useState} from 'react';
import './App.css';

function App() {
  const [data,setData] = useState({
    username:"",
    password:""
  })
  
  const {username,password} = data;
  
  const changeHandler = e => {
    setData({...data,[e.target.name]:[e.target.value]});
  }
  
  const submitHandler = e => {
    e.preventDefault();
    console.log(data);
  }
  
    return (
      <div>
        <center>
          <h1>Log In</h1>
          <p>Log in to your account</p>
        <form onSubmit={submitHandler}>
        <input type="text" name="username" value={username} onChange={changeHandler}/><br/>
        <input type="password" name="password" value={password} onChange={changeHandler}/><br/>
        <input type="submit" name="submit"/>
        </form>
        <button>Create New Account</button>
        </center>
      </div>
  
    );
  }
  
  export default App;
