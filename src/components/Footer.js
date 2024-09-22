// const Footer = ()=>{
//     return (<h1>©rajshukla</h1>)
//   }

//   export default Footer;

import React from 'react';
import './../App.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>© 2024 Raj Shukla</h2>
        </div>
        <div className="footer-section">
          <ul className="footer-links">
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section social-media">
          <a href="https://twitter.com/rajshuklatwt" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com/rajshukla18" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
