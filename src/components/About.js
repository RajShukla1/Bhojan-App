import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page-wrapper">
      <div className="about-hero-section">
        <span className="about-tag">About The Project</span>
        <h1 className="about-main-title">
          Bhojan — Modern Food Delivery Web App
        </h1>
        <p className="about-main-subtitle">
          Engineered with modern React architecture, live Swiggy API proxying, and responsive UI components.
        </p>
      </div>

      <div className="about-content-grid">
        <div className="about-feature-card">
          <div className="feature-icon">⚡</div>
          <h3>CORS-Safe Swiggy API Integration</h3>
          <p>
            Uses Webpack Dev Server reverse proxying with custom headers and resilient fallback datasets to overcome browser cross-origin restrictions seamlessly.
          </p>
        </div>

        <div className="about-feature-card">
          <div className="feature-icon">🛒</div>
          <h3>Complete Cart & Checkout Flow</h3>
          <p>
            Powered by React Context API and localStorage persistence. Real-time bill calculation, quantity stepper controls, and simulated order tracking.
          </p>
        </div>

        <div className="about-feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Smart Search & Filtering</h3>
          <p>
            Multi-attribute search across restaurant names, cuisines, and localities with instantaneous debounce, top-rated filter chips, and dietary toggles.
          </p>
        </div>

        <div className="about-feature-card">
          <div className="feature-icon">📱</div>
          <h3>Responsive & Mobile-First</h3>
          <p>
            Carefully crafted responsive layouts with shimmer loading skeletons, accessible navigation, and optimized touch targets.
          </p>
        </div>
      </div>

      <div className="tech-stack-section">
        <h2>Technologies & Tools</h2>
        <div className="tech-badge-list">
          <span className="tech-badge">React 18</span>
          <span className="tech-badge">React Router DOM v6</span>
          <span className="tech-badge">Context API</span>
          <span className="tech-badge">HTTP Proxy Middleware</span>
          <span className="tech-badge">Vanilla CSS3</span>
          <span className="tech-badge">HTML5</span>
          <span className="tech-badge">Swiggy Live DAPI</span>
        </div>
      </div>

      <div className="about-cta-section">
        <h2>Hungry for great food?</h2>
        <p>Explore top restaurants and discover the best dishes near you.</p>
        <Link to="/" className="about-explore-btn">
          Explore Restaurants →
        </Link>
      </div>
    </div>
  );
};

export default About;
