import React from 'react';

const LoginForm = () => {
  return (
    <div id='login-form-container'>
      <form id='login-form' className='auth-form'>
        <label htmlFor='username'>Username:</label>
        <br></br>
        <input type='text' id='username' name='username'></input>
        <br></br>
        <label htmlFor='password'>Password:</label>
        <br></br>
        <input type='password' id='password' name='password'></input>
        <br></br>
        {/* <input type='submit'>Log in</input> */}
        <input type='submit' value='Log in' id='login-button' />
      </form>
    </div>
  );
};

export default LoginForm;
