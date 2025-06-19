import React, { useState, useContext } from "react";
import StoreContext from "../../context/storeContext";
import "./PlaceOrder.css";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const { cart, foodList, backendUrl } = useContext(StoreContext);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    instructions: "",
  });

  // Dummy total calculation - replace with your actual logic
  const calculateTotal = () => {
    if (!foodList || !cart) return 0;
    return foodList.reduce((total, item) => {
      if (cart[item._id]) {
        return total + item.price * cart[item._id];
      }
      return total;
    }, 0);
  };

  const total = calculateTotal() || 1200; // Dummy value if no items

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "name",
      "phone",
      "email",
      "street",
      "city",
      "state",
      "zip",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !address[field].trim()
    );

    if (emptyFields.length > 0) {
      toast.error('please fill the address details properly');
      return;
    }

    // Place order logic here - integrate with Stripe
    console.log("Order details:", {
      address,
      total: finalTotal,
      items: getCartItems(),
    });
    const items = getCartItems();
    console.log(backendUrl + "/order/place-order");
    let res = await axios.post(
  backendUrl + "/order/place-order",
  { items: items }, // This is the POST body (data)
  {
    headers: { 'Content-Type': 'application/json' }
  }
);

    console.log(res.data.url);
    window.location.href = res.data.url;
    
    if (res.data.success) {
      toast.success("Order placed successfully! 🎉");
    } else {
      toast.error("Failed to place order. Please try again.");
    }

    // alert("Redirecting to payment... 🎉");
  };

  // Get cart items for display
  const getCartItems = () => {
    if (!foodList || !cart) return [];
    return foodList
      .filter((item) => cart[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cart[item._id],
      }));
  };

  const deliveryFee = 50;
  const tax = total * 0.05;
  const finalTotal = total + deliveryFee + tax;

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-content">
          {/* Left Section - Cart Review */}
          <div className="left-section">
            <div className="section-header">
              <h2>🛒 Your Order</h2>
              <p>Review your selected items</p>
            </div>

            <div className="place-order-cart-items">
              {getCartItems().length > 0 ? (
                getCartItems().map((item) => (
                  <div key={item._id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-description">{item.description}</p>
                      <div className="item-price-qty">
                        <span className="quantity">Qty: {item.quantity}</span>
                        <span className="price">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <p>Your cart is empty! 🛒</p>
                </div>
              )}
            </div>

            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{Number(total).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Delivery Details */}
          <div className="right-section">
            <div className="section-header">
              <h2>🏠 Delivery Details</h2>
              <p>Where should we deliver your food?</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={address.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={address.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group full-width">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={address.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group full-width">
                  <label>Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    placeholder="House no, Building name, Street"
                    value={address.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="zip"
                    placeholder="PIN Code"
                    value={address.zip}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group full-width">
                  <label>Delivery Instructions (Optional)</label>
                  <textarea
                    name="instructions"
                    placeholder="Any special instructions for delivery..."
                    value={address.instructions}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Place Order Button */}
          <div className="navigation-buttons">
            <button
              type="submit"
              className="place-order-btn"
              onClick={handleSubmit}
              disabled={getCartItems().length === 0}
            >
              🎉 Proceed to Payment - ₹{finalTotal.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
