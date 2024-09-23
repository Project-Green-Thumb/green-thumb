import React from 'react'

const SignUpForm = () => {
  return (
    <div id='signUp-form-container'>
    <form id='signUp-form' className='auth-form'>
      <label htmlFor='username'>Username:</label>
      <br></br>
      <input type='text' id='username' name='username'></input>
      <br></br>
      <label htmlFor='password'>Password:</label>
      <br></br>
      <input type='password' id='password' name='password'></input>
      <br></br>
      {/* <input type='submit'>Log in</input> */}
      <input type='submit' value='Sign up' id='signUp-button' />
    </form>
  </div>
  )
}

export default SignUpForm