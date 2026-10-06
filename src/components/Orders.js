import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

const Orders = () => {
  const { orders } = useUser();
  const { reorderItems } = useCart();
  const navigate = useNavigate();

  const [activeReceipt, setActiveReceipt] = useState(null);
  const [ratedOrders, setRatedOrders] = useState({});
  const [reorderNotice, setReorderNotice] = useState('');

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return 'Recently';
    }
  };

  const handleReorder = (order) => {
    if (!order?.items || order.items.length === 0) return;
    reorderItems(order.items);
    setReorderNotice(`Added items from order ${order.id} to cart!`);
    setTimeout(() => {
      navigate('/cart');
    }, 400);
  };

  const handleRate = (orderId, stars) => {
    setRatedOrders((prev) => ({
      ...prev,
      [orderId]: stars,
    }));
  };

  return (
    <div className="orders-page-container">
      {/* Page Header */}
      <div className="orders-header-banner">
        <div className="orders-header-content">
          <h1 className="orders-page-title">Past Orders & History</h1>
          <p className="orders-page-subtitle">
            Manage your previous orders, download receipts, or 1-click reorder your favorites.
          </p>
        </div>
        <div className="orders-count-badge">
          📦 {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </div>
      </div>

      {reorderNotice && (
        <div className="orders-reorder-toast">
          <span>✓</span> {reorderNotice}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-orders-card">
          <div className="empty-orders-icon">📦</div>
          <h2>No orders placed yet</h2>
          <p>
            Looks like you haven't indulged in delicious food yet. Check out curated restaurants nearby!
          </p>
          <Link to="/" className="explore-btn">
            DISCOVER RESTAURANTS
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const currentRating = ratedOrders[order.id] || 0;
            return (
              <div key={order.id} className="order-history-card">
                {/* Top Row: Restaurant & Status */}
                <div className="order-card-top">
                  <div className="order-brand-info">
                    <span className="order-resto-icon">🍽️</span>
                    <div>
                      <h2 className="order-restaurant-name">
                        {order.restaurantName || 'Bhojan Partner Restaurant'}
                      </h2>
                      <span className="order-restaurant-area">
                        📍 {order.restaurantArea || 'Lucknow'}
                      </span>
                    </div>
                  </div>

                  <div className="order-status-group">
                    <span
                      className={`order-status-pill ${
                        order.status === 'Delivered' ? 'delivered' : 'active'
                      }`}
                    >
                      {order.status === 'Delivered' ? '✓ Delivered' : '🍳 In Progress'}
                    </span>
                    <span className="order-date-text">
                      {formatDate(order.date)}
                    </span>
                  </div>
                </div>

                <div className="order-card-divider"></div>

                {/* Middle: Items List */}
                <div className="order-items-summary">
                  <div className="order-items-header">Items in this order:</div>
                  <ul className="order-items-tags-list">
                    {order.items?.map((item, idx) => (
                      <li key={idx} className="order-item-tag">
                        <span
                          className={`diet-icon-sm ${
                            item.isVeg ? 'veg' : 'non-veg'
                          }`}
                        >
                          ●
                        </span>
                        <span className="order-item-tag-name">{item.name}</span>
                        <span className="order-item-tag-qty">
                          × {item.quantity}
                        </span>
                        <span className="order-item-tag-price">
                          ₹{item.price * item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Address & Total Details */}
                <div className="order-card-meta-row">
                  <div className="order-address-box">
                    <span className="order-address-icon">📍</span>
                    <span className="order-address-text">
                      {order.deliveryAddress?.line1 ||
                        'Saved Address, Hazratganj, Lucknow'}
                    </span>
                  </div>

                  <div className="order-bill-brief">
                    {order.discount > 0 && (
                      <span className="order-coupon-savings">
                        🏷️ Saved ₹{order.discount}{' '}
                        {order.couponCode ? `(${order.couponCode})` : ''}
                      </span>
                    )}
                    <span className="order-total-amount">
                      Paid: <strong>₹{order.toPay || order.itemTotal}</strong>
                    </span>
                  </div>
                </div>

                <div className="order-card-divider"></div>

                {/* Bottom Action Buttons & Star Rating */}
                <div className="order-card-actions">
                  <div className="order-rating-section">
                    <span className="rate-prompt">Rate Food:</span>
                    <div className="star-rating-buttons">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className={`star-btn ${
                            currentRating >= star ? 'active' : ''
                          }`}
                          onClick={() => handleRate(order.id, star)}
                          title={`${star} Star`}
                        >
                          ★
                        </button>
                      ))}
                      {currentRating > 0 && (
                        <span className="rating-feedback">
                          Thank you for rating!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="order-btn-group">
                    <button
                      className="receipt-btn"
                      onClick={() => setActiveReceipt(order)}
                    >
                      📄 View Invoice
                    </button>
                    <button
                      className="reorder-btn"
                      onClick={() => handleReorder(order)}
                    >
                      🔁 Reorder
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal */}
      {activeReceipt && (
        <div
          className="invoice-modal-overlay"
          onClick={() => setActiveReceipt(null)}
        >
          <div
            className="invoice-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="invoice-header">
              <div>
                <span className="invoice-brand">Bhojan Delivery Receipt</span>
                <p className="invoice-id">Order #{activeReceipt.id}</p>
                <p className="invoice-date">
                  Placed on {formatDate(activeReceipt.date)}
                </p>
              </div>
              <button
                className="invoice-close-btn"
                onClick={() => setActiveReceipt(null)}
              >
                ✕
              </button>
            </div>

            <div className="invoice-section">
              <span className="invoice-section-title">Delivery To</span>
              <p className="invoice-address-line">
                {activeReceipt.deliveryAddress?.line1 ||
                  'Royal Residency, Hazratganj, Lucknow'}
              </p>
              {activeReceipt.note && (
                <p className="invoice-note">Note: "{activeReceipt.note}"</p>
              )}
            </div>

            <div className="invoice-section">
              <span className="invoice-section-title">Ordered Items</span>
              <div className="invoice-items-table">
                {activeReceipt.items?.map((it, idx) => (
                  <div key={idx} className="invoice-item-row">
                    <span>
                      {it.name} × {it.quantity}
                    </span>
                    <span>₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="invoice-divider"></div>

            <div className="invoice-summary">
              <div className="invoice-sum-row">
                <span>Item Total</span>
                <span>₹{activeReceipt.itemTotal}</span>
              </div>
              {activeReceipt.discount > 0 && (
                <div className="invoice-sum-row discount">
                  <span>Coupon Discount ({activeReceipt.couponCode})</span>
                  <span>- ₹{activeReceipt.discount}</span>
                </div>
              )}
              <div className="invoice-sum-row">
                <span>Delivery Partner Fee</span>
                <span>
                  {activeReceipt.deliveryFee === 0 ? 'FREE' : `₹${activeReceipt.deliveryFee || 0}`}
                </span>
              </div>
              <div className="invoice-sum-row">
                <span>Platform Fee</span>
                <span>₹{activeReceipt.platformFee || 5}</span>
              </div>
              <div className="invoice-sum-row">
                <span>Taxes & GST (5%)</span>
                <span>₹{activeReceipt.taxes || Math.round(activeReceipt.itemTotal * 0.05)}</span>
              </div>
              <div className="invoice-divider"></div>
              <div className="invoice-sum-row total">
                <span>Total Paid</span>
                <span>₹{activeReceipt.toPay || activeReceipt.itemTotal}</span>
              </div>
              <div className="payment-mode-tag">✓ Paid via Online Payment</div>
            </div>

            <div className="invoice-footer">
              <button
                className="print-receipt-btn"
                onClick={() => window.print()}
              >
                🖨️ Print Receipt
              </button>
              <button
                className="close-receipt-btn"
                onClick={() => setActiveReceipt(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
