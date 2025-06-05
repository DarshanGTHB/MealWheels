import React, { useEffect, useState } from "react";
import StoreContext from "./storeContext";
import { food_list } from "../assets/frontend_assets/assets";

const StoreProvide = ({ children }) => {
  let foodList = food_list;

  let [cart, setCart] = useState({});

  let incCartItem = (item_id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item_id]: prevCart[item_id] ? prevCart[item_id] + 1 : 1,
    }));
  };

  let decCartItem = (item_id) => {
    setCart((prevCart) => {
      if (prevCart[item_id]) {
        const updatedCart = { ...prevCart };
        updatedCart[item_id] -= 1;
        if (updatedCart[item_id] <= 0) {
          delete updatedCart[item_id];
        }
        return updatedCart;
      } else {
        alert("item not found");
        return prevCart;
      }
    });
  };

  useEffect(()=>{
    console.log(cart)
  }, [cart]);

  return (
    <StoreContext.Provider value={{ foodList, cart, incCartItem, decCartItem }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvide;
