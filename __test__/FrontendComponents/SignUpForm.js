import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpForm from '../../client/components/SignUpForm';
import '@testing-library/jest-dom'

describe('Unit testing the SignUpForm component', () => {
  
  beforeAll(() => {
   render (<SignUpForm />)
  })
  
      test('if form is there', () => {
        expect(screen.getElementById('signUp-form-container')).toBeInTheDocument()
})
xtest('if label with text Username: is there', () => {

}) 




})