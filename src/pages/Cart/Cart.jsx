import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import StoreContext from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PROMO_CODES = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  WELCOME: 0.15,
};
export default function Cart() {
  const [promoCode, setPromoCode] = useState("SAVE10");
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const [promoError, setPromoError] = useState("");

  const { foodList, cart, incCartItem, decCartItem, removeItem } =
    useContext(StoreContext);
  const subtotal = foodList
    .filter((item) => cart[item._id] > 0)
    .reduce((total, item) => total + item.price * cart[item._id], 0);

  const DELIVERY_FEE = subtotal > 100 ? 0 : 4;
  const total = subtotal + DELIVERY_FEE - discount;
  useEffect(() => {
    if (isPromoApplied && promoCode) {
      const newDiscountAmount = subtotal * PROMO_CODES[promoCode.toUpperCase()];
      setDiscount(newDiscountAmount);
    }
  }, [subtotal, isPromoApplied, promoCode]); // Run when these values change

  const handleIncrement = (itemId) => {
    incCartItem(itemId);
  };

  const handleDecrement = (itemId) => {
    decCartItem(itemId);
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const applyPromo = () => {
    const code = promoCode.toUpperCase();
    if (PROMO_CODES[code]) {
      const discountAmount = subtotal * PROMO_CODES[code];
      setDiscount(discountAmount);
      setIsPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setDiscount(0);
    }
  };

  const removePromo = () => {
    setPromoCode("");
    setDiscount(0);
    setIsPromoApplied(false);
    setPromoError("");
  };

  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        {/* Header */}
        <div className="cart-header">
          <div className="header-badge">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="m16 10-4 4-4-4" />
            </svg>
            <h1>Your Cart</h1>
          </div>
          <p className="header-subtitle">Review your delicious selections</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}

          <div className="cart-items">
            {foodList
              .filter((item) => cart[item._id] > 0)
              .map((item, index) => (
                <div
                  key={item._id}
                  className="cart-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="item-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="quantity-badge">{cart[item._id]}</div>
                  </div>

                  <div className="item-details">
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-pricing">
                      <span className="item-total">
                        ₹{item.price * cart[item._id]}
                      </span>
                      <span className="item-unit-price">
                        (₹{item.price} each)
                      </span>
                    </div>
                  </div>

                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-display">{cart[item._id]}</span>
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="remove-btn"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="3,6 5,6 21,6" />
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

            {Object.keys(cart).length === 0 && (
              <div className="empty-cart">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="m16 10-4 4-4-4" />
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="m9,12 2,2 4,-4" />
                  <path d="M21 12c.552 0 1-.448 1-1V8a2 2 0 0 0-2-2h-5L9.293 0.293A1 1 0 0 0 8.586 0H4a2 2 0 0 0-2 2v6c0 .552.448 1 1 1s1 .448 1 1-0.448 1-1 1-1 .448-1 1v6a2 2 0 0 0 2 2h4.586a1 1 0 0 0 .707-.293L15 14h5a2 2 0 0 0 2-2v-3c0-.552-.448-1-1-1z" />
                </svg>
                <h3>Promo Code</h3>
              </div>
              <div className="promo-input-group">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase());
                    setPromoError("");
                  }}
                  placeholder="Enter code (try SAVE10)"
                  className={`promo-input ${promoError ? "error" : ""}`}
                  disabled={isPromoApplied}
                />
                {isPromoApplied ? (
                  <button onClick={removePromo} className="remove-promo-btn">
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={applyPromo}
                    disabled={!promoCode.trim()}
                    className="apply-btn"
                  >
                    Apply
                  </button>
                )}
              </div>
              {isPromoApplied && (
                <div className="promo-success">
                  <p>
                    ✓ {promoCode} applied! Saved ₹{Number(discount).toFixed(2)}
                  </p>
                </div>
              )}
              {promoError && (
                <div className="promo-error">
                  <p>✗ {promoError}</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="summary-section">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal ({Object.keys(cart).length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-line">
                  <span>Delivery Fee</span>
                  <span>₹{DELIVERY_FEE}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount</span>
                    <span>-₹{Number(discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                disabled={Object.keys(cart).length === 0}
                className="checkout-btn"
                onClick={()=>{
                  // use navigate
                  if(Object.keys(cart).length === 0) {
                    toast.error("Your cart is empty!");
                  } else {
                    navigate("/place-order");
                  }

                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
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
    </div>
  );
}
