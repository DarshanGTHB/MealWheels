import React from 'react';
import './OneOrderFullInfo.css';

const OneOrderFullInfo = ({ order, onBack }) => {
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

  const getPaymentStatusColor = (status) => {
    return status === 'paid' ? '#4CAF50' : '#ff8c42';
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date, time } = formatDateTime(order.createdAt);

  return (
    <div className="order-full-info">
      <div className="order-header">
        <button className="back-button" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Back to Orders
        </button>
        
        <div className="order-title">
          <h1>Order #{order._id.slice(-8)}</h1>
          <div className="order-meta">
            <span className="order-date-time">{date} at {time}</span>
          </div>
        </div>
      </div>

      <div className="order-status-card">
        <div className="status-info">
          <div className="status-label">Order Status</div>
          <div 
            className="status-badge large"
            style={{ 
              backgroundColor: `${getStatusColor(order.status)}15`,
              color: getStatusColor(order.status),
              borderColor: getStatusColor(order.status)
            }}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>
        
        <div className="payment-info">
          <div className="payment-label">Payment Status</div>
          <div 
            className="payment-badge"
            style={{ 
              backgroundColor: `${getPaymentStatusColor(order.paymentStatus)}15`,
              color: getPaymentStatusColor(order.paymentStatus),
              borderColor: getPaymentStatusColor(order.paymentStatus)
            }}
          >
            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
          </div>
        </div>
      </div>

      <div className="order-items-section">
        <h2>Order Items ({order.items.length})</h2>
        <div className="items-list">
          {order.items.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-image">
                <img 
                  src={item.item.image} 
                  alt={item.item.name}
                  loading="lazy"
                />
              </div>
              
              <div className="item-details">
                <h3 className="item-name">{item.item.name}</h3>
                <p className="item-description">{item.item.description}</p>
                <div className="item-category">
                  <span className="category-tag">{item.item.category}</span>
                </div>
              </div>
              
              <div className="item-pricing">
                <div className="item-price">₹{item.item.price}</div>
                <div className="item-quantity">Qty: {item.quantity}</div>
                <div className="item-total">₹{(item.item.price * item.quantity)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-summary-section">
        <div className="summary-card">
          <h3>Order Summary</h3>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal ({order.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>₹{order.totalAmount}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-row">
              <span>Taxes & Fees</span>
              <span>₹0</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-actions">
        <button className="action-button secondary">Track Order</button>
        <button className="action-button primary">Reorder Items</button>
      </div>
    </div>
  );
};

export default OneOrderFullInfo;