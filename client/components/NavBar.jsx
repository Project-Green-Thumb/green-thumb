import React from 'react';
import { Link } from 'react-router-dom';

// rendered from DashBoard
const NavBar = () => {
  return (
    <div id='nav-bar'>
      <div>NavBar</div>
      <Link to='/dashboard/favorites'>Favorite Plants</Link>
      <Link to='/dashboard/search'>Search Plants</Link>
    </div>
  );
};

export default NavBar;
