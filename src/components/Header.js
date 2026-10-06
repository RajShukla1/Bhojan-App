import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.jpeg';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { totalCount } = useCart();
  const { addresses, selectedAddress, selectAddress, addAddress } = useUser();
  const location = useLocation();

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddrType, setNewAddrType] = useState('Home');
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newAddrArea, setNewAddrArea] = useState('');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAddNewAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddrLine1.trim() || !newAddrArea.trim()) return;

    addAddress({
      type: newAddrType,
      title: newAddrType,
      line1: newAddrLine1.trim(),
      area: newAddrArea.trim(),
      city: 'Lucknow',
    });

    setNewAddrLine1('');
    setNewAddrArea('');
    setShowNewAddressForm(false);
    setAddressModalOpen(false);
  };

  const isActive = (path) => (location.pathname === path ? 'active-link' : '');

  return (
    <>
      <header className="header">
        <div className="header-left-cluster">
          <div className="header-brand">
            <Link to="/" className="brand-logo-link">
              <img className="logo" src={logo} alt="Bhojan Logo" />
              <span className="brand-name">Bhojan</span>
            </Link>
            <span
              className={`status-pill ${isOnline ? 'online' : 'offline'}`}
              title={isOnline ? 'Internet Connected' : 'Offline'}
            >
              <span className="status-dot"></span>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Interactive Delivery Address Selector */}
          <button
            className="header-location-selector"
            onClick={() => setAddressModalOpen(true)}
            title="Change Delivery Location"
          >
            <span className="location-pin-icon">📍</span>
            <div className="location-text-group">
              <span className="location-title">
                {selectedAddress?.title || 'Deliver to'}
                <span className="location-chevron">▼</span>
              </span>
              <span className="location-subtitle">
                {selectedAddress?.area || 'Hazratganj, Lucknow'}
              </span>
            </div>
          </button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-icon">☰</span>
        </button>

        <nav className={`nav-items ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link
                className={`nav-links ${isActive('/')}`}
                to="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🏠</span> Home
              </Link>
            </li>
            <li>
              <Link
                className={`nav-links ${isActive('/orders')}`}
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📦</span> Orders
              </Link>
            </li>
            <li>
              <Link
                className={`nav-links ${isActive('/about')}`}
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📙</span> About
              </Link>
            </li>
            <li>
              <Link
                className={`nav-links ${isActive('/contact')}`}
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📱</span> Contact
              </Link>
            </li>
            <li>
              <Link
                className={`nav-links cart-link ${isActive('/cart')}`}
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🛒</span> Cart
                {totalCount > 0 && (
                  <span className="cart-badge">{totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Address Switcher Modal */}
      {addressModalOpen && (
        <div
          className="address-modal-overlay"
          onClick={() => setAddressModalOpen(false)}
        >
          <div
            className="address-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="address-modal-header">
              <div>
                <h3 className="modal-title">Select Delivery Location</h3>
                <p className="modal-subtitle">
                  Choose from saved addresses or add a new delivery spot.
                </p>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setAddressModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="saved-addresses-list">
              {addresses.map((addr) => {
                const isSelected = selectedAddress?.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    className={`saved-address-card ${
                      isSelected ? 'active-address' : ''
                    }`}
                    onClick={() => {
                      selectAddress(addr.id);
                      setAddressModalOpen(false);
                    }}
                  >
                    <div className="address-type-icon">{addr.icon || '📍'}</div>
                    <div className="address-card-body">
                      <div className="address-card-top-row">
                        <strong className="address-type-tag">
                          {addr.title || addr.type}
                        </strong>
                        {isSelected && (
                          <span className="selected-address-badge">
                            ✓ Delivering Here
                          </span>
                        )}
                      </div>
                      <p className="address-detail-text">
                        {addr.line1}, {addr.area}, {addr.city}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Toggle Add New Address Form */}
            {!showNewAddressForm ? (
              <button
                className="add-new-address-toggle-btn"
                onClick={() => setShowNewAddressForm(true)}
              >
                ➕ Add New Delivery Address
              </button>
            ) : (
              <form
                className="new-address-form"
                onSubmit={handleAddNewAddressSubmit}
              >
                <h4 className="form-heading">New Address Details</h4>
                <div className="form-group-radio">
                  {['Home', 'Work', 'Other'].map((type) => (
                    <label key={type} className="radio-label">
                      <input
                        type="radio"
                        name="addrType"
                        value={type}
                        checked={newAddrType === type}
                        onChange={(e) => setNewAddrType(e.target.value)}
                      />
                      <span>
                        {type === 'Home'
                          ? '🏠 Home'
                          : type === 'Work'
                          ? '🏢 Work'
                          : '📍 Other'}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="form-field">
                  <label>House / Flat / Road *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 101, Galaxy Heights"
                    value={newAddrLine1}
                    onChange={(e) => setNewAddrLine1(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Area / Locality *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gomti Nagar, Lucknow"
                    value={newAddrArea}
                    onChange={(e) => setNewAddrArea(e.target.value)}
                  />
                </div>

                <div className="form-actions-row">
                  <button
                    type="button"
                    className="cancel-form-btn"
                    onClick={() => setShowNewAddressForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-address-btn">
                    Save & Deliver Here
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;