import React, { useState } from 'react';
import './../App.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Please fill out the form below and we’ll get back to you shortly.</p>
      <div className="contact-details">
        <p>Email: <a href="mailto:rajshukla140@gmail.com">rajshukla140@gmail.com</a></p>
        <p>Phone: <a href="tel:+916391391377">+91 6391391377</a></p>
      </div>
      
      <form className="contact-form" action="https://formspree.io/f/mnnakbwr" method="POST">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="message">Message:</label>
        <textarea 
          id="message" 
          name="message" 
          rows="5" 
          value={formData.message} 
          onChange={handleChange} 
          required
        />
        
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
