import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    totalCount,
    totalAmount,
  } = useCart();

  const [deliveryNote, setDeliveryNote] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Bill calculations
  const deliveryFee = totalAmount > 300 || totalAmount === 0 ? 0 : 35;
  const platformFee = totalAmount > 0 ? 5 : 0;
  const gstCharges = Math.round(totalAmount * 0.05);
  const toPay = totalAmount + deliveryFee + platformFee + gstCharges;

  const handlePlaceOrder = () => {
    const randomId = 'BHJ-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="cart-page-container">
        <div className="order-success-card">
          <div className="success-icon-wrapper">
            <span className="success-icon">🎉</span>
          </div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Your delicious meal is being prepared with love.
          </p>
          <div className="order-id-badge">Order ID: {orderId}</div>

          <div className="tracking-timeline">
            <div className="timeline-step completed">
              <span className="step-dot">✓</span>
              <span className="step-label">Order Confirmed</span>
            </div>
            <div className="timeline-line active"></div>
            <div className="timeline-step active">
              <span className="step-dot">🍳</span>
              <span className="step-label">Cooking in Kitchen</span>
            </div>
            <div className="timeline-line"></div>
            <div className="timeline-step">
              <span className="step-dot">🛵</span>
              <span className="step-label">Out for Delivery</span>
            </div>
          </div>

          <p className="estimated-time">
            ⏱️ Estimated Delivery: <strong>25 - 35 mins</strong>
          </p>

          <div className="success-actions">
            <Link to="/" className="continue-shopping-btn">
              Explore More Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="empty-cart-card">
          <div className="empty-cart-illustration">
            <span>🛒</span>
          </div>
          <h2 className="empty-cart-title">Your Cart is Empty</h2>
          <p className="empty-cart-desc">
            Good food is always just a few clicks away! Explore curated restaurants and add your favorite dishes to satisfy your cravings.
          </p>
          <Link to="/" className="explore-btn">
            SEE RESTAURANTS NEAR YOU
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-layout">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-header-row">
            <div>
              <h1 className="cart-heading">Your Food Cart</h1>
              <span className="cart-subheading">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} in your cart
              </span>
            </div>
            <button className="clear-cart-btn" onClick={clearCart}>
              🗑️ Clear Cart
            </button>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-left">
                  <span
                    className={`diet-icon ${item.isVeg ? 'veg' : 'non-veg'}`}
                  >
                    <span className="diet-dot"></span>
                  </span>
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit-price">₹{item.price} each</p>
                  </div>
                </div>

                <div className="cart-item-right">
                  <div className="quantity-stepper">
                    <button
                      className="stepper-btn minus"
                      onClick={() => removeFromCart(item.id)}
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="stepper-count">{item.quantity}</span>
                    <button
                      className="stepper-btn plus"
                      onClick={() => addToCart(item)}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item-row-total">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    className="delete-item-btn"
                    onClick={() => deleteFromCart(item.id)}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Note Box */}
          <div className="delivery-note-card">
            <h4>📝 Cooking & Delivery Instructions</h4>
            <input
              type="text"
              className="delivery-note-input"
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              placeholder="e.g. Extra spicy, no cutlery needed, ring the doorbell..."
            />
          </div>
        </div>

        {/* Right Column: Bill Details & Checkout */}
        <div className="cart-summary-column">
          {/* Delivery Address Card */}
          <div className="delivery-address-card">
            <div className="address-header">
              <span className="address-icon">📍</span>
              <div>
                <h4>Delivery Address</h4>
                <p>Hazratganj, Lucknow, Uttar Pradesh</p>
              </div>
            </div>
            <span className="address-tag">Standard Delivery (30 mins)</span>
          </div>

          {/* Bill Breakdown Card */}
          <div className="bill-summary-card">
            <h3 className="bill-title">Bill Summary</h3>

            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="bill-row">
              <span>Delivery Partner Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="free-tag">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="bill-row">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>

            <div className="bill-row">
              <span>GST & Restaurant Taxes (5%)</span>
              <span>₹{gstCharges}</span>
            </div>

            {deliveryFee === 0 && (
              <div className="savings-banner">
                🎉 Free delivery applied on orders above ₹300!
              </div>
            )}

            <div className="bill-divider"></div>

            <div className="bill-row grand-total-row">
              <span>TO PAY</span>
              <span className="grand-total-amount">₹{toPay}</span>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              PROCEED TO PAY • ₹{toPay}
            </button>

            <p className="cancellation-policy">
              Review your order and address details before placing order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;