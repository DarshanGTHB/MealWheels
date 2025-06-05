import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import CartIcon from "../CartIcon/CartIcon";
import StoreContext from "../../context/storeContext";



const Navbar = () => {
  let [menu, setMenu] = useState('');
  let {cart} = useContext(StoreContext);
  // console.log("cart : from nav", cart);
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={assets.meal_wheels} alt="" />
      </div>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu('home')} className={menu=='home' ? 'active-nav-menu' : ''}>Home</Link>
        <a href="#explore-menu-section" onClick={()=>setMenu('menu')} className={menu=='menu' ? 'active-nav-menu' : ''}>Menu</a>
        <a href="#app-download" onClick={()=>setMenu('mobile-app')} className={menu=='mobile-app' ? 'active-nav-menu' : ''}>Mobile App</a>
        <a href="#app-download" onClick={()=>setMenu('contact-us')} className={menu=='contact-us' ? 'active-nav-menu' : ''}>Contact Us</a>
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
          <Link to='/cart'><CartIcon cart_items_cnt={Object.keys(cart).length} /></Link>
        </div>
        <div className="sign-up">
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;