import React from 'react';

const Shimmer = () => {
  const cards = Array(8).fill(null);

  return (
    <div className="shimmer-container">
      <div className="shimmer-grid">
        {cards.map((_, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-element shimmer-img"></div>
            <div className="shimmer-content">
              <div className="shimmer-element shimmer-title"></div>
              <div className="shimmer-element shimmer-line-short"></div>
              <div className="shimmer-element shimmer-line-long"></div>
              <div className="shimmer-meta-row">
                <div className="shimmer-element shimmer-badge"></div>
                <div className="shimmer-element shimmer-badge"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;