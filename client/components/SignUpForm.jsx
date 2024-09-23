import React from 'react';
import { useState } from 'react';

const SignUpForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    console.log(username);

    const password = document.getElementById('password').value;
    console.log(password);

    console.log(
      `signing up with username: ${username} and password: ${password}`
    );

    // handle backend logic here
  };

  return (
    <div id='signUp-form-container'>
      <form
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
