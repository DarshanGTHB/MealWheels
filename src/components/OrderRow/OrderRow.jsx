import React from 'react';
import './OrderRow.css';

const OrderRow = ({ order, onClick }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'pending': '#ff8c42',
      'confirmed': '#4CAF50',
      'preparing': '#2196F3',
      'delivered': '#4CAF50',
      'cancelled': '#f44336',
      'completed': '#4CAF50'
    };
    return statusColors[status.toLowerCase()] || '#666';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-row" onClick={onClick}>
      <div className="order-row-left">
        <div className="order-images">
          {order.items.slice(0, 4).map((item, index) => (
            <div key={item._id} className="order-image-wrapper">
              <img 
                src={item.item.image} 
                alt={item.item.name}
                className="order-preview-image"
                loading="lazy"
              />
              {index === 3 && order.items.length > 4 && (
                <div className="more-items-overlay">
                  +{order.items.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="order-summary">
          <div className="order-info">
            <h3 className="order-id">Order #{order._id.slice(-8)}</h3>
            <p className="order-items-count">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          <div className="order-datetime">
            <span className="order-date">{formatDate(order.createdAt)}</span>
            <span className="order-time">{formatTime(order.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="order-row-right">
        <div className="order-amount">
          <span className="currency">₹</span>
          <span className="amount">{order.totalAmount}</span>
        </div>
        
        <div 
          className="order-status"
          style={{ 
            backgroundColor: `${getStatusColor(order.status)}15`,
            color: getStatusColor(order.status)
          }}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </div>
        
        <div className="view-details">
          <span>View Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OrderRow;