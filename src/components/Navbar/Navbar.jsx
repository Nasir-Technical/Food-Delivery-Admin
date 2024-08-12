import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ onLogout }) => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <img className='profile' src={assets.profile_image} alt="Profile" />
      <button className='box' onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
