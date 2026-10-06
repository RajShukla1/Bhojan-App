import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col brand-col">
          <div className="footer-brand-title">
            <span>🍛</span> Bhojan
          </div>
          <p className="footer-brand-desc">
            Bringing your favorite local cuisines to your doorstep. Powered by React and live API integration.
          </p>
          <span className="copyright-tag">© {currentYear} Raj Shukla. All rights reserved.</span>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Popular Cities</h4>
          <ul className="footer-links">
            <li><span>Lucknow</span></li>
            <li><span>Delhi NCR</span></li>
            <li><span>Bengaluru</span></li>
            <li><span>Mumbai</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <div className="social-links">
            <a
              href="https://twitter.com/rajshuklatwt"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              Twitter / X
            </a>
            <a
              href="https://linkedin.com/rajshukla18"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/RajShukla1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
