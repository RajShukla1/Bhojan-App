import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    totalCount,
    totalAmount,
    availableCoupons,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
  } = useCart();

  const { addresses, selectedAddress, selectAddress, placeOrder } = useUser();

  const [deliveryNote, setDeliveryNote] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null); // { type: 'success'|'error', text: '' }
  const [showCouponsDrawer, setShowCouponsDrawer] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Delivery fee logic: Free if total > 300 OR if FREEDEL coupon applied
  const baseDeliveryFee = totalAmount > 300 || totalAmount === 0 ? 0 : 35;
  const isFreeDeliveryCoupon = appliedCoupon?.code === 'FREEDEL';
  const deliveryFee = isFreeDeliveryCoupon ? 0 : baseDeliveryFee;
  const platformFee = totalAmount > 0 ? 5 : 0;
  const gstCharges = Math.round(totalAmount * 0.05);

  const rawToPay =
    totalAmount - discountAmount + deliveryFee + platformFee + gstCharges;
  const toPay = Math.max(0, rawToPay);

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) {
      setCouponFeedback({
        type: 'error',
        text: 'Please enter a coupon code.',
      });
      return;
    }

    const res = applyCoupon(code);
    if (res.success) {
      setCouponFeedback({
        type: 'success',
        text: res.message,
      });
      setCouponInput('');
      setShowCouponsDrawer(false);
    } else {
      setCouponFeedback({
        type: 'error',
        text: res.message,
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponFeedback({
      type: 'info',
      text: 'Coupon removed.',
    });
    setTimeout(() => setCouponFeedback(null), 3000);
  };

  const handlePlaceOrder = () => {
    // Derive restaurant name from first item or default
    const firstItem = cartItems[0];
    const restaurantName =
      firstItem?.restaurantName || "Domino's Pizza";

    const newOrder = placeOrder({
      restaurantName,
      restaurantArea: selectedAddress?.area || 'Lucknow',
      items: cartItems,
      itemTotal: totalAmount,
      discount: discountAmount,
      couponCode: appliedCoupon?.code || null,
      deliveryFee,
      platformFee,
      taxes: gstCharges,
      toPay,
      deliveryAddress: selectedAddress,
      note: deliveryNote.trim(),
    });

    setPlacedOrderDetails(newOrder);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced && placedOrderDetails) {
    return (
      <div className="cart-page-container">
        <div className="order-success-card">
          <div className="success-icon-wrapper">
            <span className="success-icon">🎉</span>
          </div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Your delicious meal from{' '}
            <strong>{placedOrderDetails.restaurantName}</strong> is on the way!
          </p>
          <div className="order-id-badge">
            Order ID: {placedOrderDetails.id}
          </div>

          <div className="tracking-timeline">
            <div className="timeline-step completed">
              <span className="step-dot">✓</span>
              <span className="step-label">Order Confirmed</span>
            </div>
            <div className="timeline-line active"></div>
            <div className="timeline-step active">
              <span className="step-dot">🍳</span>
              <span className="step-label">Kitchen Preparing</span>
            </div>
            <div className="timeline-line"></div>
            <div className="timeline-step">
              <span className="step-dot">🛵</span>
              <span className="step-label">Rider Assigned</span>
            </div>
          </div>

          <div className="order-delivery-brief-box">
            <p className="delivery-destination">
              📍 Delivering to:{' '}
              <strong>
                {placedOrderDetails.deliveryAddress?.title || 'Home'} -{' '}
                {placedOrderDetails.deliveryAddress?.line1}
              </strong>
            </p>
            <p className="estimated-time">
              ⏱️ Estimated Delivery: <strong>25 - 35 mins</strong>
            </p>
          </div>

          <div className="success-actions">
            <Link to="/orders" className="view-orders-btn">
              📦 View in Past Orders
            </Link>
            <Link to="/" className="continue-shopping-btn">
              Explore More Food
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
        {/* Left Column: Cart Items List & Address Picker */}
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

          {/* Delivery Address Selection Cards */}
          <div className="checkout-addresses-section">
            <div className="checkout-section-header">
              <span className="section-icon">📍</span>
              <div>
                <h3 className="checkout-section-title">Delivery Address</h3>
                <span className="checkout-section-subtitle">
                  Select where you want your food delivered
                </span>
              </div>
            </div>

            <div className="checkout-address-cards-grid">
              {addresses.map((addr) => {
                const isSelected = selectedAddress?.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    className={`checkout-addr-card ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => selectAddress(addr.id)}
                  >
                    <div className="addr-card-header">
                      <span className="addr-icon">{addr.icon || '📍'}</span>
                      <strong className="addr-title">{addr.title}</strong>
                      {isSelected && (
                        <span className="addr-check-badge">✓ Selected</span>
                      )}
                    </div>
                    <p className="addr-card-line">
                      {addr.line1}, {addr.area}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Coupons & Bill Details & Checkout */}
        <div className="cart-summary-column">
          {/* Coupons & Promo Codes Section */}
          <div className="coupons-section-card">
            <div className="coupons-card-header">
              <span className="coupon-icon">🏷️</span>
              <span className="coupon-card-title">Offers & Coupons</span>
            </div>

            {/* Active Coupon Banner */}
            {appliedCoupon ? (
              <div className="applied-coupon-box">
                <div className="applied-coupon-details">
                  <span className="applied-tag">
                    🎉 '{appliedCoupon.code}' APPLIED
                  </span>
                  <span className="applied-savings">
                    You saved ₹{discountAmount}!
                  </span>
                </div>
                <button
                  className="remove-coupon-btn"
                  onClick={handleRemoveCoupon}
                  title="Remove coupon"
                >
                  Remove
                </button>
              </div>
            ) : (
              /* Coupon Input Box */
              <div className="coupon-input-group">
                <input
                  type="text"
                  className="coupon-input"
                  placeholder="Enter coupon code (e.g. BHOJAN50)"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponFeedback(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleApplyCoupon();
                  }}
                />
                <button
                  className="apply-coupon-btn"
                  onClick={() => handleApplyCoupon()}
                  disabled={!couponInput.trim()}
                >
                  APPLY
                </button>
              </div>
            )}

            {/* Feedback Message */}
            {couponFeedback && (
              <div className={`coupon-feedback-msg ${couponFeedback.type}`}>
                {couponFeedback.text}
              </div>
            )}

            {/* Toggle Available Coupons */}
            <button
              className="toggle-available-coupons-btn"
              onClick={() => setShowCouponsDrawer(!showCouponsDrawer)}
            >
              <span>
                {showCouponsDrawer
                  ? '▲ Hide Available Offers'
                  : '🏷️ View Available Coupons & Deals'}
              </span>
            </button>

            {/* Available Coupons Accordion */}
            {showCouponsDrawer && (
              <div className="available-coupons-list">
                {availableCoupons.map((coupon) => {
                  const isEligible = totalAmount >= coupon.minOrder;
                  const isApplied = appliedCoupon?.code === coupon.code;
                  return (
                    <div
                      key={coupon.code}
                      className={`coupon-deal-card ${
                        isApplied ? 'already-applied' : ''
                      }`}
                    >
                      <div className="deal-top-row">
                        <span className="deal-code-pill">
                          {coupon.icon} {coupon.code}
                        </span>
                        {isApplied ? (
                          <span className="deal-applied-tag">Applied</span>
                        ) : (
                          <button
                            className="deal-apply-btn"
                            disabled={!isEligible}
                            onClick={() => handleApplyCoupon(coupon.code)}
                          >
                            {isEligible ? 'APPLY' : `MIN ₹${coupon.minOrder}`}
                          </button>
                        )}
                      </div>
                      <p className="deal-description">{coupon.description}</p>
                      {!isEligible && (
                        <span className="deal-shortfall-text">
                          Add ₹{coupon.minOrder - totalAmount} more to unlock
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bill Breakdown Card */}
          <div className="bill-summary-card">
            <h3 className="bill-title">Bill Summary</h3>

            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{totalAmount}</span>
            </div>

            {discountAmount > 0 && (
              <div className="bill-row discount-row">
                <span>
                  Coupon Discount{' '}
                  <span className="discount-code-tag">
                    ({appliedCoupon?.code})
                  </span>
                </span>
                <span className="discount-amount-val">- ₹{discountAmount}</span>
              </div>
            )}

            <div className="bill-row">
              <span>Delivery Partner Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="free-tag">
                    {isFreeDeliveryCoupon ? 'FREE (COUPON)' : 'FREE'}
                  </span>
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

            {deliveryFee === 0 && !isFreeDeliveryCoupon && (
              <div className="savings-banner">
                🎉 Free delivery applied on orders above ₹300!
              </div>
            )}

            {discountAmount > 0 && (
              <div className="savings-celebration-banner">
                🌟 Total Savings on this order: ₹
                {discountAmount + (baseDeliveryFee === 0 ? 35 : 0)}!
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
              Delivering to <strong>{selectedAddress?.title || 'Home'}</strong> (
              {selectedAddress?.area || 'Hazratganj'}).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;