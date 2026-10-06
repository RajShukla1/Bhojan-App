import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();

  return (
    <div className="error-page-container">
      <div className="error-card">
        <span className="error-emoji">🧭🍽️</span>
        <h1 className="error-code">{err?.status || '404'}</h1>
        <h2 className="error-title">
          {err?.statusText || 'Oops! Page Not Found'}
        </h2>
        <p className="error-message">
          {err?.data ||
            err?.error?.message ||
            'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
        </p>
        <Link to="/" className="error-home-btn">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;