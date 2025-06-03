import React, { useState } from "react";
import { menu_list } from "../../assets/frontend_assets/assets";
import "./ExploreMenu.css";
import { DisplayFood } from "../DisplayFood/DisplayFood";
const ExploreMenu = () => {
  let [activeMenu, setActiveMenu] = useState("ALL");
  
  // console.log(menu_list)
  return (
    <div className="explore-menu" id="explore-menu-section">
      <h3 className="explore-line">Explore Our Menu</h3>
      <ul className="menu-list">
        {menu_list.map((ele, id) => {
          return (
            <li className="list-items" key={id}>
              <div
                className="menu-image"
                onClick={() =>
                  activeMenu == ele.menu_name
                    ? setActiveMenu("ALL")
                    : setActiveMenu(ele.menu_name)
                }
              >
                <img
                  src={ele.menu_image}
                  alt=""
                  className={
                    activeMenu == ele.menu_name
                      ? "active-menu"
                      : "not-active-menu"
                  }
                />
              </div>
              <p className="menu-name" style={activeMenu == ele.menu_name ? {color:'black'} : {}} >{ele.menu_name}</p>
            </li>
          );
        })}
      </ul>

      <DisplayFood category={activeMenu}/>
    </div>
  );
};

export default ExploreMenu;
