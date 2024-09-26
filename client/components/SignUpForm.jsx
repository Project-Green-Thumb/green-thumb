import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// rendered from SignUpPage
const SignUpForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;

    const password = document.getElementById('password').value;
    
    // handle backend logic here
    fetch('api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(data => {
      console.log(data);
      navigate('/');
    })
    .catch((error) => {
      console.log('error', error);
    })
  };

  return (
    <div data-testid='signUp-form-container' id='signUp-form-container'>
      <form
        data-testid='signUp-form'
        id='signUp-form'
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
        <input type='submit' value='Sign up' id='signUp-button' />
      </form>
    </div>
  );
};

export default SignUpForm;
