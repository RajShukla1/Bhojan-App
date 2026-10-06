import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_CON_URL } from './constants';

const RestaurantCard = ({
  id,
  name,
  cuisines = [],
  cloudinaryImageId,
  avgRating,
  sla,
  costForTwo,
  areaName,
  locality,
  aggregatedDiscountInfoV3,
  veg,
}) => {
  const ratingValue = Number(avgRating) || 0;
  const ratingClass =
    ratingValue >= 4.0
      ? 'rating-high'
      : ratingValue >= 3.5
      ? 'rating-mid'
      : 'rating-low';

  const discountText =
    aggregatedDiscountInfoV3?.header && aggregatedDiscountInfoV3?.subHeader
      ? `${aggregatedDiscountInfoV3.header} ${aggregatedDiscountInfoV3.subHeader}`
      : aggregatedDiscountInfoV3?.header || '';

  return (
    <Link to={'/restaurant/' + id} className="restaurant-card-link">
      <div className="restaurant-card">
        <div className="card-image-wrapper">
          <img
            src={IMG_CON_URL + cloudinaryImageId}
            alt={name || 'Restaurant'}
            className="restaurant-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60';
            }}
          />
          {discountText && (
            <div className="discount-badge">{discountText}</div>
          )}
          {veg && <span className="veg-badge-corner" title="Pure Veg">🌱 Pure Veg</span>}
        </div>

        <div className="card-info">
          <h3 className="restaurant-name" title={name}>
            {name}
          </h3>

          <div className="card-meta">
            <span className={`rating-badge ${ratingClass}`}>
              ★ {avgRating || 'New'}
            </span>
            <span className="dot-separator">•</span>
            <span className="delivery-time">
              {sla?.slaString || (sla?.deliveryTime ? `${sla.deliveryTime} mins` : '30 mins')}
            </span>
            {costForTwo && (
              <>
                <span className="dot-separator">•</span>
                <span className="cost-for-two">{costForTwo}</span>
              </>
            )}
          </div>

          <p className="restaurant-cuisines" title={cuisines.join(', ')}>
            {cuisines.slice(0, 3).join(', ')}
            {cuisines.length > 3 ? '...' : ''}
          </p>

          <p className="restaurant-locality">
            📍 {areaName || locality || 'Lucknow'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;