import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
  
  const [credentials, setCredentials] = useState({username: "", password: ""})

  const [error, setError] = useState("");

  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value      
  });
  };

  const login = e => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem("potluckAuthToken", res.data.payload);
        props.history.push('/'); // Link to Home page route here
      })
      .catch(err => {
        console.log("Axios login error: ", err);
        setError(`Your error is: ${err}`);
      })

  };

  return (
    <div>
      <h1>Log In to Potluck Planner</h1>
      <div data-testid="loginForm" className="login-form">

      <form onSubmit={login}>
         <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            data-testid="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            data-testid="pasword"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log In</button>
        </form>
        </div>
      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;