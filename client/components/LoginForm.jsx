import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Rendered from LoginPage
const LoginForm = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;

    const password = document.getElementById('password').value;

    // handle backend logic here
    fetch(`/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      //console.log(data);
      console.log('right here')
      sessionStorage.setItem('token', data.token)
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
