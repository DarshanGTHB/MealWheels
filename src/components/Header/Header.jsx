import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import './Header.css'

const Header = () => {
  // Scroll to ExploreMenu section
  const handleCTAClick = () => {
    const exploreSection = document.getElementById("explore-menu-section");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="poster">
      <img src={assets.header_img} alt="" />
      <div className="header-overlay-content">
        <div className="head-line">
          <h2>Order your favorite food here</h2>
        </div>
        <div className="msg-line">
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the food
          </p>
        </div>
        <div className="cta-btn">
          <button onClick={handleCTAClick}>View Menu</button>
        </div>
      </div>
    </div>
  );
};

export default Header;