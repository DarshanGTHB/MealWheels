import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import CartIcon from "../CartIcon/CartIcon";
import StoreContext from "../../context/storeContext";
import FirebaseContext from "../../context/Firebase/FirebaseContext";
import Loader from "../Loader/Loader";
import SignInPopup from "../SignInPopup/SignInPopup";
const Navbar = () => {
  let [menu, setMenu] = useState("");
  let [showDropdown, setShowDropdown] = useState(false);
  // ...existing code...



  let { cart } = useContext(StoreContext);

  let { user, signUpWithGoogle, signOut, loading } = useContext(FirebaseContext);
  console.log("user : ", user);

 


    useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-menu')) {
        setShowDropdown(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);





  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={assets.meal_wheels} alt="" />
      </div>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu == "home" ? "active-nav-menu" : ""}
        >
          Home
        </Link>
        <a
          href="/#explore-menu-section"
          onClick={() => setMenu("menu")}
          className={menu == "menu" ? "active-nav-menu" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu == "mobile-app" ? "active-nav-menu" : ""}
        >
          Mobile App
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("contact-us")}
          className={menu == "contact-us" ? "active-nav-menu" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search meals..." />
          <button className="search-icon">
            <img src={assets.search_icon} alt="" />
          </button>
        </div>
        <div className="cart-icon">
          <Link to="/cart">
            <CartIcon cart_items_cnt={Object.keys(cart).length} />
          </Link>
        </div>
             <div className="sign-up">
          {loading ? (<Loader/>) : (user ? (
            <div className="user-menu">
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="user-avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <img src={user.photoURL} alt={user.displayName} />
                    <div className="user-info">
                      <p className="user-name">{user.displayName}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                  <div className="dropdown-items">
                    <Link to="/profile" className="dropdown-item">
                      <i className="fas fa-user"></i>
                      My Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      <i className="fas fa-shopping-bag"></i>
                      My Orders
                    </Link>
                    <button onClick={signOut} className="dropdown-item sign-out">
                      <i className="fas fa-sign-out-alt"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // <button onClick={signUpWithGoogle} className="sign-in-btn">
            //   Sign In
            // </button>
            <SignInPopup/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
