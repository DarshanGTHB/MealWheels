import React, { useEffect, useState } from "react";
import StoreContext from "./storeContext";

const StoreProvide = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/items');
        const data = await response.json();
        setFoodList(data.items);
        setError(null);
      } catch (err) {
        console.error('Error fetching food list:', err);
        setError('Failed to load menu items');
        setFoodList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodList();
  }, []);

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

  let removeItem = (item_id) => {
    setCart( (prevCart) =>{
      let updatedCart = {...prevCart};
      delete updatedCart[item_id];
      return updatedCart;
    } )
  }

  return (
    <StoreContext.Provider
      value={{
        foodList,
        loading,
        error,
        cart,
        incCartItem,
        decCartItem,
        removeItem
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvide;
