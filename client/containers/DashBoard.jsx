import React from 'react';
import NavBar from '../components/NavBar';
import { Routes, Route } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage';
import SearchPage from '../pages/SearchPage';

// renders from App 
// and can navigate from SignUpForm
// can navigate from LoginForm
const DashBoard = () => {
  return (
    <div id='dashboard'>
      <NavBar />
      <Routes>
        <Route path='favorites' element={<FavoritesPage />}></Route>
        <Route path='search' element={<SearchPage />}></Route>
      </Routes>
    </div>
  );
};

export default DashBoard;
