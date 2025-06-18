import React, { useContext, useEffect, useState } from "react";
import StoreContext from "./storeContext";
import FirebaseContext from "./Firebase/FirebaseContext";
import axios from "axios";
import { toast } from "react-toastify";

const StoreProvide = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const url = "http://localhost:5000/api";
  const { user } = useContext(FirebaseContext);
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        setLoading(true);
        const response = await fetch(url + "/items");
        const data = await response.json();
        setFoodList(data.items);
        setError(null);
      } catch (err) {
        console.error("Error fetching food list:", err);
        setError("Failed to load menu items");
        setFoodList([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () =>{
      const response = await axios.get(url + "/cart/cartData", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (response.status === 200 ) {
        setCart(response.data.cart);
        
      } else {
        toast.error("Failed to load cart data");
      }
    };

    fetchFoodList();
    if (user) {
      fetchCart();
    }else{
      setCart({});
    }
  }, [user]);

  let incCartItem = async (item_id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item_id]: prevCart[item_id] ? prevCart[item_id] + 1 : 1,
    }));
    if (user) {
      const response = await axios.post(
        url + "/cart/add",
        { item_id }, 
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, 
          },
        }
      );
      // console.log(response)
      if (response.data.success) {
        toast.success("item Added to Cart");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  let decCartItem = async (item_id) => {
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
     if (user) {
      const response = await axios.post(
        url + "/cart/remove",
        { item_id }, 
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, 
          },
        }
      );
      // console.log(response)
      if (response.data.success) {
        toast.success("item removed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  let removeItem =  async (item_id) => {
    setCart((prevCart) => {
      let updatedCart = { ...prevCart };
      delete updatedCart[item_id];
      return updatedCart;
    });
     if (user) {
      const response = await axios.post(
        url + "/cart/remove?all=true",
        { item_id }, 
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, 
          },
        }
      );
      // console.log(response)
      if (response.data.success ) {
        toast.success("item removed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        foodList,
        loading,
        error,
        cart,
        incCartItem,
        decCartItem,
        removeItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvide;
