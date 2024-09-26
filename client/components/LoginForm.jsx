import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Rendered from LoginPage
const LoginForm = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    console.log(username);

    const password = document.getElementById('password').value;
    console.log(password);

    console.log(
      `logging in with username: ${username} and password: ${password}`
    );

    // handle backend logic here
    fetch(`api/login?username=${username}&password=${password}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })

    .then(data => {
      //console.log(data);
      console.log('right here')
      navigate('/dashboard/search')
    })
    .catch((error) => {
      console.log('error', error);
    })
  };
  

  return (
    <div id='login-form-container'>
      <form
        id='login-form'
        className='auth-form'
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor='username'>Username:</label>
        <br></br>
        <input type='text' id='username' name='username'></input>
        <br></br>
        <label htmlFor='password'>Password:</label>
        <br></br>
        <input type='password' id='password' name='password'></input>
        <br></br>
        <input type='submit' value='Log in' id='login-button' />
      </form>
    </div>
  );
};

export default LoginForm;
