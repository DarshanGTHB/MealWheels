import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css";
import axios from 'axios';
import FirebaseContext from '../../context/Firebase/FirebaseContext';
import OrderRow from '../../components/OrderRow/OrderRow';
import OneOrderFullInfo from '../../components/OneOrderFullInfo/OneOrderFullInfo';
import StoreContext from '../../context/storeContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(FirebaseContext);
  const { backendUrl } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // console.log(`${backendUrl}/api/orders`)
        const response = await axios.get(`${backendUrl}/orders`, {
          headers: {  
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (response.status === 200) {
          // console.log("Orders fetched successfully:", response.data);
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, backendUrl]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      {selectedOrder ? (
        <OneOrderFullInfo 
          order={selectedOrder} 
          onBack={handleBackToOrders}
        />
      ) : (
        <>
          <div className="orders-header">
            <h1>Your Orders</h1>
            <p className="orders-subtitle">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
            </p>
          </div>
          
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <OrderRow 
                  key={order._id} 
                  order={order} 
                  onClick={() => handleOrderClick(order)}
                />
              ))}
            </div>
          ) : (
            <div className="no-orders">
              <div className="no-orders-icon">📦</div>
              <h2>No orders yet</h2>
              <p>When you place your first order, it will appear here.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyOrders;