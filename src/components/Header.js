import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.jpeg';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { totalCount } = useCart();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isActive = (path) => (location.pathname === path ? 'active-link' : '');

  return (
    <header className="header">
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
  );
};

export default Header;