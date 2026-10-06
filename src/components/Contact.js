import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission delay for a realistic feel
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-header-section">
        <h1 className="contact-main-heading">Get in Touch</h1>
        <p className="contact-sub-heading">
          Have questions, feedback, or need help with your order? We’d love to hear from you.
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Info Cards */}
        <div className="contact-info-cards">
          <div className="info-card">
            <span className="info-card-icon">✉️</span>
            <h4>Email Us</h4>
            <p>Our support team usually responds within 2 hours.</p>
            <a href="mailto:rajshukla140@gmail.com" className="info-card-link">
              rajshukla140@gmail.com
            </a>
          </div>

          <div className="info-card">
            <span className="info-card-icon">📞</span>
            <h4>Call Us</h4>
            <p>Mon - Sat from 9:00 AM to 10:00 PM</p>
            <a href="tel:+916391391377" className="info-card-link">
              +91 6391391377
            </a>
          </div>

          <div className="info-card">
            <span className="info-card-icon">📍</span>
            <h4>Location</h4>
            <p>Hazratganj, Lucknow, Uttar Pradesh, India</p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success-state">
              <span className="success-emoji">✉️✨</span>
              <h3>Thank You!</h3>
              <p>Your message has been received. We will get back to you shortly.</p>
              <button
                className="send-another-btn"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Raj Shukla"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Order query, restaurant partnership, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-contact-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
