import React from 'react';
import { IMG_CON_URL } from './constants';
import { useCart } from '../context/CartContext';

const Menu = ({ info }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  if (!info) return null;

  const {
    id,
    name,
    isVeg,
    category,
    imageId,
    price,
    defaultPrice,
    ratings,
    description,
  } = info;

  const rawPrice = price ?? defaultPrice ?? 0;
  const finalPrice = rawPrice > 1000 ? Math.round(rawPrice / 100) : rawPrice;
  const quantity = getItemQuantity(id);
  const ratingVal = ratings?.aggregatedRating?.rating;

  return (
    <div className="menu-item-row">
      <div className="menu-item-details">
        {/* Veg / Non-veg indicator icon */}
        <div className="diet-indicator">
          <span className={`diet-icon ${isVeg ? 'veg' : 'non-veg'}`}>
            <span className="diet-dot"></span>
          </span>
          {category && <span className="menu-item-category">{category}</span>}
        </div>

        <h4 className="menu-item-name">{name}</h4>

        <p className="menu-item-price">
          {finalPrice > 0 ? `₹${finalPrice}` : '₹199'}
        </p>

        {ratingVal && (
          <div className="menu-item-rating">
            <span className="star-icon">★</span>
            <span>{ratingVal}</span>
            {ratings?.aggregatedRating?.ratingCountV2 && (
              <span className="rating-count">
                ({ratings.aggregatedRating.ratingCountV2})
              </span>
            )}
          </div>
        )}

        {description && (
          <p className="menu-item-description" title={description}>
            {description}
          </p>
        )}
      </div>

      <div className="menu-item-action-wrapper">
        <div className="menu-img-container">
          {imageId ? (
            <img
              className="menu-item-img"
              src={IMG_CON_URL + imageId}
              alt={name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=60';
              }}
            />
          ) : (
            <div className="menu-img-placeholder">
              <span>🍽️</span>
            </div>
          )}

          {/* Add to Cart Stepper Button */}
          <div className="add-cart-btn-wrapper">
            {quantity === 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(info)}
              >
                ADD +
              </button>
            ) : (
              <div className="quantity-stepper">
                <button
                  className="stepper-btn minus"
                  onClick={() => removeFromCart(id)}
                  title="Remove one"
                >
                  −
                </button>
                <span className="stepper-count">{quantity}</span>
                <button
                  className="stepper-btn plus"
                  onClick={() => addToCart(info)}
                  title="Add one more"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;