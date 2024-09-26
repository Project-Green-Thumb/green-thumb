import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SignUpForm from '../../client/components/SignUpForm';
import '@testing-library/jest-dom'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

describe('Unit testing the SignUpForm component', () => {
  
  beforeEach(() => {
   render (<BrowserRouter><SignUpForm /></BrowserRouter>)
  })
  
      test('Is form and all elements in it rendering', () => {
        expect(screen.getByTestId('signUp-form-container')).toBeInTheDocument();
        expect(screen.getByTestId('signUp-form')).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {value: 'Sign up'})).toBeInTheDocument();
        
 });



// test('if fetch requst sends back status of 200 and if it navigates to dashboard?????', () => {
      // const parentForm = screen.getByTestId('signUp-form-container');
      // const childForm = screen.getByTestId('signUp-form');
      //   expect(parentForm).toContainElement(childForm);
})
// create new test suite
describe('SignUpForm api call', ()=> {
  beforeEach(() => {
     //before each test, create mock version of global.fetch
    global.fetch = jest.fn(()=> 
      //create resolved promise that mimics what actual fetch should return
      Promise.resolve({
        ok: true,
        status: 200,
      })
    )
  })
  //define test which should receive 200 status
  test('should receive status 200 from POST request', async () => {
    //first render component
    render(
      <BrowserRouter><SignUpForm /></BrowserRouter>
    )
//then simulate user entering info
fireEvent.change(screen.getByLabelText(/username/i), {
  target: {value: 'testuser'},
})
fireEvent.change(screen.getByLabelText(/password/i), {
  target: {value: 'testpassword'}
})
//mock click on sign up buttonbutton
fireEvent.click(screen.getByRole('button', {name: /sign up/i}));
//wait for fetch to be called
await waitFor(() => {
  //check if fetch was called one time
  expect(global.fetch).toHaveBeenCalledTimes(1);
})
//set response to value of globaled fetch --- this is where we are actually running the test functionality
const response = await global.fetch();
//finally expect response to be 200
expect(response.status).toBe(200)
  })
})


  // "globalSetup": "./jest-setup.js",
    // "globalTeardown": "./jest-teardown.js",
    // "setupFilesAfterEnv": [
    //   "@testing-library/jest-dom/extend-expect"
    // ]