import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";


const Navbar = () => {
  let [menu, setMenu] = useState('');
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={assets.meal_wheels} alt="" />
      </div>
      <ul className="navbar-menu">
        <li onClick={()=>setMenu('home')} className={menu=='home' ? 'active-nav-menu' : ''}>Home</li>
        <li onClick={()=>setMenu('menu')} className={menu=='menu' ? 'active-nav-menu' : ''}>Menu</li>
        <li onClick={()=>setMenu('mobile-app')} className={menu=='mobile-app' ? 'active-nav-menu' : ''}>Mobile App</li>
        <li onClick={()=>setMenu('contact-us')} className={menu=='contact-us' ? 'active-nav-menu' : ''}>Contact Us</li>
      </ul>
      <div className="navbar-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search meals..."
          />
          <button className="search-icon">
            <img src={assets.search_icon} alt="" />
          </button>
        </div>
        <div className="cart-icon">
          <img src={assets.basket_icon} alt="" />
        </div>
        <div className="sign-up">
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;