import React, { useContext, useState } from 'react';
import './Cart.css'
import StoreContext from '../../context/storeContext';
// Mock food data with placeholder images
const foodList0 = [
  {
    id: 1,
    title: 'Grilled Salmon',
    price: 320,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop&crop=center',
    description: 'Fresh Atlantic salmon with herbs'
  },
  {
    id: 2,
    title: 'Broccoli Pasta',
    price: 250,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&h=200&fit=crop&crop=center',
    description: 'Creamy pasta with fresh broccoli'
  }
];

export default function Cart() {
  const [items, setItems] = useState(foodList0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const {foodList, cart} = useContext(StoreContext);
  console.log('from car : ', foodList, cart);
    
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const total = subtotal + deliveryFee - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
      setIsPromoApplied(true);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        {/* Header */}
        <div className="cart-header">
          <div className="header-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="m16 10-4 4-4-4"/>
            </svg>
            <h1>Your Cart</h1>
          </div>
          <p className="header-subtitle">Review your delicious selections</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {items.map((item, index) => (
              <div 
                key={item.id}
                className="cart-item"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="item-image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="item-image"
                  />
                  <div className="quantity-badge">{item.quantity}</div>
                </div>

                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-pricing">
                    <span className="item-total">₹{item.price * item.quantity}</span>
                    <span className="item-unit-price">(₹{item.price} each)</span>
                  </div>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="m16 10-4 4-4-4"/>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items to get started!</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            {/* Promo Code */}
            <div className="promo-section">
              <div className="section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="m9,12 2,2 4,-4"/>
                  <path d="M21 12c.552 0 1-.448 1-1V8a2 2 0 0 0-2-2h-5L9.293 0.293A1 1 0 0 0 8.586 0H4a2 2 0 0 0-2 2v6c0 .552.448 1 1 1s1 .448 1 1-0.448 1-1 1-1 .448-1 1v6a2 2 0 0 0 2 2h4.586a1 1 0 0 0 .707-.293L15 14h5a2 2 0 0 0 2-2v-3c0-.552-.448-1-1-1z"/>
                </svg>
                <h3>Promo Code</h3>
              </div>
              <div className="promo-input-group">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code (try SAVE10)"
                  className="promo-input"
                  disabled={isPromoApplied}
                />
                <button 
                  onClick={applyPromo}
                  disabled={isPromoApplied}
                  className="apply-btn"
                >
                  Apply
                </button>
              </div>
              {isPromoApplied && (
                <div className="promo-success">
                  <p>✓ Promo code applied successfully!</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="summary-section">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-line">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button 
                disabled={items.length === 0}
                className="checkout-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Proceed to Checkout
              </button>
              
              <p className="security-text">
                Secure checkout with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        
      `}</style>
    </div>
  );
}