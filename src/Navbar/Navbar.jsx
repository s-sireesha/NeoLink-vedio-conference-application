import React from 'react';
import "./Navbar.css";
import image from "../Assets/logo-img.svg";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <div className="navbar">
<div className="logo">
        <Link to="/"><img src={image} alt="" />
        <h1>neolink</h1></Link>
    </div>
    <div className="links">
        <Link to="/joinmeet">Join a meeting</Link>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Sign up</Link>
      
       
    </div>
</div>
</div>
  )
}

export default Navbar