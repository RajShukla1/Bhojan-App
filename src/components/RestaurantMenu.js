import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  IMG_CON_URL,
  PROXY_RESTAURANT_API,
  DIRECT_RESTAURANT_API,
  restaurantList,
  getFallbackMenu,
  filterData,
} from './constants';
import Menu from './Menu';
import Shimmer from './Shimmer';
import { useCart } from '../context/CartContext';

const RestaurantMenu = () => {
  const { id } = useParams();
  const { totalCount, totalAmount } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [menuSource, setMenuSource] = useState('live'); // 'live' | 'fallback'

  // Helper to extract items from regular cards
  const extractItems = (jsonData) => {
    const regularCards =
      jsonData?.data?.cards?.find((elem) => elem?.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    const items = [];
    regularCards.forEach((c) => {
      const itemCards = c?.card?.card?.itemCards;
      if (Array.isArray(itemCards)) {
        items.push(...itemCards);
      }
    });
    return items;
  };

  const getRestaurantInfo = useCallback(async () => {
    setLoading(true);
    let restaurantInfo = null;
    let menuItems = [];

    // Attempt 1: Fetch via local proxy (/dapi) to avoid browser CORS
    try {
      const response = await fetch(PROXY_RESTAURANT_API + id);
      if (response.ok) {
        const json = await response.json();
        // Look for restaurant info card
        const infoCard = json?.data?.cards?.find(
          (c) => c?.card?.card?.info
        )?.card?.card?.info;

        if (infoCard) {
          restaurantInfo = infoCard;
          menuItems = extractItems(json);
          setMenuSource('live');
        }
      }
    } catch (proxyError) {
      console.warn('Proxy menu fetch failed:', proxyError.message);
    }

    // Attempt 2: Direct API fetch if proxy didn't work
    if (!restaurantInfo) {
      try {
        const response = await fetch(DIRECT_RESTAURANT_API + id, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          },
        });
        if (response.ok) {
          const json = await response.json();
          const infoCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.info
          )?.card?.card?.info;

          if (infoCard) {
            restaurantInfo = infoCard;
            menuItems = extractItems(json);
            setMenuSource('live');
          }
        }
      } catch (directError) {
        console.warn('Direct menu fetch failed:', directError.message);
      }
    }

    // Attempt 3: Graceful fallback
    if (!restaurantInfo || menuItems.length === 0) {
      console.info('Using fallback menu data for restaurant', id);
      const matched = restaurantList.find((r) => r?.info?.id === id);
      restaurantInfo =
        matched?.info || {
          id: id,
          name: 'Bhojan Gourmet Kitchen',
          cuisines: ['North Indian', 'Continental', 'Snacks'],
          cloudinaryImageId: 'jd3b24bmmmwsdpezahj5',
          avgRating: '4.5',
          costForTwoMessage: '₹350 for two',
          areaName: 'Hazratganj, Lucknow',
        };

      menuItems = getFallbackMenu(id, restaurantInfo);
      setMenuSource('fallback');
    }

    setRestaurant(restaurantInfo);
    setAllMenuItems(menuItems);
    setFilteredMenu(menuItems);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getRestaurantInfo();
  }, [getRestaurantInfo]);

  // Filter application pipeline
  const applyFilters = useCallback(
    (query, vegToggle) => {
      let result = allMenuItems;

      // Filter by veg
      if (vegToggle) {
        result = result.filter(
          (elem) =>
            elem?.card?.info?.isVeg === 1 || elem?.card?.info?.isVeg === true
        );
      }

      // Filter by text search
      if (query.trim()) {
        result = filterData(query, result, 'menu');
      }

      setFilteredMenu(result);
    },
    [allMenuItems]
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
    applyFilters(val, isVegOnly);
  };

  const handleVegToggle = (e) => {
    const checked = e.target.checked;
    setIsVegOnly(checked);
    applyFilters(searchText, checked);
  };

  const clearMenuSearch = () => {
    setSearchText('');
    applyFilters('', isVegOnly);
  };

  // Group items by category
  const groupedMenu = useMemo(() => {
    const groups = {};
    filteredMenu.forEach((elem) => {
      const cat = elem?.card?.info?.category || 'Chef Recommendations';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(elem);
    });
    return groups;
  }, [filteredMenu]);

  const categories = useMemo(() => Object.keys(groupedMenu), [groupedMenu]);

  // Initialize activeCategory to first category
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const scrollToCategory = (categoryName) => {
    setActiveCategory(categoryName);
    const elementId = `cat-section-${categoryName.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const el = document.getElementById(elementId);
    if (el) {
      // Offset for sticky headers
      const yOffset = -130;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleCategoryCollapse = (categoryName) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="menu-page-container">
      {/* Restaurant Header Card */}
      <div className="restaurant-header-card">
        <div className="restaurant-header-content">
          <div className="header-image-box">
            <img
              src={IMG_CON_URL + restaurant?.cloudinaryImageId}
              alt={restaurant?.name}
              className="restaurant-header-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60';
              }}
            />
          </div>

          <div className="restaurant-header-meta">
            <div className="restaurant-title-row">
              <h1 className="restaurant-title">{restaurant?.name}</h1>
              <span className="rating-pill">
                ★ {restaurant?.avgRating || '4.2'}
              </span>
            </div>

            <p className="restaurant-cuisines-list">
              {Array.isArray(restaurant?.cuisines)
                ? restaurant.cuisines.join(', ')
                : 'Delicious Food'}
            </p>

            <div className="restaurant-submeta">
              <span className="meta-tag">
                📍 {restaurant?.areaName || restaurant?.locality || 'Lucknow'}
              </span>
              <span className="meta-tag">
                ⏱️ {restaurant?.sla?.slaString || '30-40 mins'}
              </span>
              <span className="meta-tag">
                💰 {restaurant?.costForTwoMessage || restaurant?.costForTwo || '₹300 for two'}
              </span>
            </div>

            {menuSource === 'fallback' && (
              <span className="menu-mode-notice">
                ℹ️ Showing verified popular menu items (CORS Safe mode)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Menu Controls: Veg Toggle & Search */}
      <div className="menu-controls-bar">
        <div className="veg-toggle-wrapper">
          <label className="switch">
            <input
              type="checkbox"
              id="veg-switch"
              checked={isVegOnly}
              onChange={handleVegToggle}
            />
            <span className="slider round"></span>
          </label>
          <span className="veg-toggle-label">🌱 Veg Only</span>
        </div>

        <div className="menu-search-wrapper">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="menu-search-input"
            placeholder={`Search dishes in ${restaurant?.name || 'menu'}...`}
          />
          {searchText && (
            <button className="clear-btn" onClick={clearMenuSearch}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Sticky In-Menu Category Navigation Bar */}
      {categories.length > 1 && (
        <div className="sticky-category-navbar">
          <div className="sticky-category-scroll-container">
            {categories.map((cat) => {
              const count = groupedMenu[cat]?.length || 0;
              return (
                <button
                  key={cat}
                  className={`sticky-cat-pill ${
                    activeCategory === cat ? 'active' : ''
                  }`}
                  onClick={() => scrollToCategory(cat)}
                >
                  <span className="cat-name">{cat}</span>
                  <span className="cat-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Categorized Menu Items Section */}
      <div className="menu-items-section">
        {filteredMenu.length === 0 ? (
          <div className="no-items-state">
            <span className="no-items-icon">🍲</span>
            <h3>No dishes found</h3>
            <p>Try resetting the search or toggling the Veg Only filter.</p>
            <button
              className="reset-btn"
              onClick={() => {
                setSearchText('');
                setIsVegOnly(false);
                setFilteredMenu(allMenuItems);
              }}
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="categorized-sections-wrapper">
            {categories.map((categoryName) => {
              const items = groupedMenu[categoryName] || [];
              const isCollapsed = collapsedCategories[categoryName] || false;
              const safeCatId = `cat-section-${categoryName.replace(
                /[^a-zA-Z0-9]/g,
                '-'
              )}`;

              return (
                <div
                  key={categoryName}
                  id={safeCatId}
                  className="menu-category-block"
                >
                  {/* Category Header with Accordion Toggle */}
                  <div
                    className="menu-category-header"
                    onClick={() => toggleCategoryCollapse(categoryName)}
                  >
                    <div className="category-title-wrap">
                      <h2 className="category-heading">{categoryName}</h2>
                      <span className="category-items-count-badge">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <span className="category-accordion-arrow">
                      {isCollapsed ? '▼' : '▲'}
                    </span>
                  </div>

                  {/* Category Items List */}
                  {!isCollapsed && (
                    <div className="menu-items-list">
                      {items.map((elem, i) => {
                        const enhancedInfo = {
                          ...elem?.card?.info,
                          restaurantId: restaurant?.id,
                          restaurantName: restaurant?.name,
                        };
                        return (
                          <Menu
                            key={elem?.card?.info?.id || i}
                            info={enhancedInfo}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar */}
      {totalCount > 0 && (
        <div className="floating-cart-bar">
          <div className="cart-bar-info">
            <span className="cart-bar-count">
              🛒 {totalCount} {totalCount === 1 ? 'Item' : 'Items'} added
            </span>
            <span className="cart-bar-separator">|</span>
            <span className="cart-bar-total">₹{totalAmount}</span>
          </div>
          <Link to="/cart" className="cart-bar-btn">
            View Cart →
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;