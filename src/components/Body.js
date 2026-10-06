import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import {
  PROXY_API,
  DIRECT_API,
  restaurantList,
  filterData,
  getAllDishes,
  IMG_CON_URL,
} from './constants';
import Shimmer from './Shimmer';
import { useCart } from '../context/CartContext';

const QUICK_CUISINE_CHIPS = [
  { label: '🍕 Pizza', query: 'Pizza', mode: 'dishes' },
  { label: '🍗 Biryani', query: 'Biryani', mode: 'dishes' },
  { label: '🍔 Burger', query: 'Burger', mode: 'dishes' },
  { label: '🍛 Paneer', query: 'Paneer', mode: 'dishes' },
  { label: '🍰 Waffles', query: 'Waffle', mode: 'dishes' },
  { label: '⭐ Top Rated', filter: 'topRated', mode: 'restaurants' },
  { label: '🌱 Pure Veg', filter: 'pureVeg', mode: 'restaurants' },
];

const Body = () => {
  const [searchText, setSearchText] = useState('');
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiSource, setApiSource] = useState('loading'); // 'live' | 'mock' | 'loading'
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTab, setSearchTab] = useState('restaurants'); // 'restaurants' | 'dishes'

  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  // Extract restaurants from Swiggy's dynamic cards structure
  const extractRestaurantsFromCards = (cards) => {
    if (!Array.isArray(cards)) return [];
    const collected = [];
    const seenIds = new Set();

    cards.forEach((cardObj) => {
      const restos =
        cardObj?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      restos.forEach((r) => {
        const id = r?.info?.id;
        if (id && !seenIds.has(id)) {
          seenIds.add(id);
          collected.push(r);
        }
      });
    });

    return collected;
  };

  const getRestaurants = useCallback(async () => {
    setLoading(true);
    let fetchedRestaurants = [];

    // Attempt 1: Fetch via CRA Dev Server Proxy (/dapi) to avoid browser CORS issues
    try {
      const response = await fetch(PROXY_API);
      if (response.ok) {
        const json = await response.json();
        const extracted = extractRestaurantsFromCards(json?.data?.cards);
        if (extracted.length > 0) {
          fetchedRestaurants = extracted;
          setApiSource('live');
        }
      }
    } catch (proxyError) {
      console.warn('Proxy fetch failed or not running in dev proxy, trying direct:', proxyError.message);
    }

    // Attempt 2: Direct API fetch if proxy didn't yield results
    if (fetchedRestaurants.length === 0) {
      try {
        const response = await fetch(DIRECT_API, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          },
        });
        if (response.ok) {
          const json = await response.json();
          const extracted = extractRestaurantsFromCards(json?.data?.cards);
          if (extracted.length > 0) {
            fetchedRestaurants = extracted;
            setApiSource('live');
          }
        }
      } catch (directError) {
        console.warn('Direct fetch failed due to CORS or network:', directError.message);
      }
    }

    // Attempt 3: Graceful fallback to rich local restaurantList dataset
    if (fetchedRestaurants.length === 0) {
      console.info('Using offline restaurant dataset (CORS Safe Fallback)');
      fetchedRestaurants = restaurantList;
      setApiSource('mock');
    }

    setAllRestaurants(fetchedRestaurants);
    setRestaurants(fetchedRestaurants);
    setLoading(false);
  }, []);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  // All dishes for dish-level universal search
  const allDishes = useMemo(() => {
    return getAllDishes(allRestaurants);
  }, [allRestaurants]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    let result = allDishes;
    const query = searchText.trim().toLowerCase();
    if (query) {
      result = result.filter((dish) => {
        const name = (dish.name || '').toLowerCase();
        const desc = (dish.description || '').toLowerCase();
        const cat = (dish.category || '').toLowerCase();
        const resto = (dish.restaurantName || '').toLowerCase();
        return (
          name.includes(query) ||
          desc.includes(query) ||
          cat.includes(query) ||
          resto.includes(query)
        );
      });
    }

    if (activeFilter === 'pureVeg') {
      result = result.filter((dish) => dish.isVeg === 1 || dish.isVeg === true);
    }
    return result;
  }, [allDishes, searchText, activeFilter]);

  // Filter application pipeline for restaurants
  const applyCurrentFilter = (baseList, filterType) => {
    let result = baseList;
    if (filterType === 'topRated') {
      result = baseList.filter((r) => Number(r?.info?.avgRating || 0) >= 4.2);
    } else if (filterType === 'fastDelivery') {
      result = baseList.filter(
        (r) => Number(r?.info?.sla?.deliveryTime || 99) <= 35
      );
    } else if (filterType === 'pureVeg') {
      result = baseList.filter((r) => r?.info?.veg === true);
    } else if (filterType === 'costLow') {
      result = baseList.filter((r) => {
        const costStr = r?.info?.costForTwo || '';
        const match = costStr.match(/\d+/);
        return match ? Number(match[0]) <= 300 : true;
      });
    }
    setRestaurants(result);
  };

  const handleSearch = () => {
    const filtered = filterData(searchText, allRestaurants, 'home');
    applyCurrentFilter(filtered, activeFilter);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (!text.trim()) {
      applyCurrentFilter(allRestaurants, activeFilter);
    } else {
      const filtered = filterData(text, allRestaurants, 'home');
      applyCurrentFilter(filtered, activeFilter);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    applyCurrentFilter(allRestaurants, activeFilter);
  };

  const handleFilterClick = (filterType) => {
    const nextFilter = activeFilter === filterType ? 'all' : filterType;
    setActiveFilter(nextFilter);
    const baseList = searchText.trim()
      ? filterData(searchText, allRestaurants, 'home')
      : allRestaurants;
    applyCurrentFilter(baseList, nextFilter);
  };

  const resetAllFilters = () => {
    setSearchText('');
    setActiveFilter('all');
    setRestaurants(allRestaurants);
  };

  const handleQuickChipClick = (chip) => {
    if (chip.query) {
      setSearchText(chip.query);
      setSearchTab(chip.mode || 'dishes');
      const filtered = filterData(chip.query, allRestaurants, 'home');
      applyCurrentFilter(filtered, activeFilter);
    } else if (chip.filter) {
      handleFilterClick(chip.filter);
      if (chip.mode) setSearchTab(chip.mode);
    }
  };

  const getDishPrice = (priceVal) => {
    if (!priceVal) return 199;
    return priceVal > 1000 ? Math.round(priceVal / 100) : priceVal;
  };

  return (
    <div className="body-container">
      {/* API Connection Banner */}
      <div className="api-status-bar">
        <div className="api-badge-wrapper">
          <span
            className={`api-indicator-badge ${
              apiSource === 'live' ? 'live' : 'fallback'
            }`}
          >
            {apiSource === 'live'
              ? '⚡ Swiggy Live API Connected'
              : '📦 Demo Mode (CORS Safe Local Cache)'}
          </span>
          {apiSource === 'mock' && (
            <span className="api-notice-text">
              Direct Swiggy API has browser CORS restrictions; displaying rich verified restaurant data.
            </span>
          )}
        </div>
        <button
          className="refresh-api-btn"
          onClick={getRestaurants}
          title="Refresh Data"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Hero / Search Section */}
      <div className="hero-banner">
        <h1 className="hero-title">Great food options delivered fast to you</h1>
        <p className="hero-subtitle">Discover top rated restaurants & dishes in Lucknow</p>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="search-input"
            placeholder="Search for restaurants, cuisines, pizzas, biryani, desserts..."
          />
          {searchText && (
            <button className="clear-btn" onClick={clearSearch}>
              ✕
            </button>
          )}
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="quick-suggestions-chips">
          <span className="quick-chip-label">Popular:</span>
          {QUICK_CUISINE_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              className="quick-chip"
              onClick={() => handleQuickChipClick(chip)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Mode Tabs: Restaurants vs Dishes */}
      <div className="search-mode-tabs-container">
        <div className="search-mode-tabs">
          <button
            className={`search-mode-tab ${
              searchTab === 'restaurants' ? 'active' : ''
            }`}
            onClick={() => setSearchTab('restaurants')}
          >
            🏪 Restaurants ({restaurants.length})
          </button>
          <button
            className={`search-mode-tab ${
              searchTab === 'dishes' ? 'active' : ''
            }`}
            onClick={() => setSearchTab('dishes')}
          >
            🍲 Dishes ({filteredDishes.length})
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="filters-container">
        <div className="filter-chips">
          <button
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All
          </button>
          <button
            className={`filter-chip ${
              activeFilter === 'topRated' ? 'active' : ''
            }`}
            onClick={() => handleFilterClick('topRated')}
          >
            ⭐ Top Rated (4.2+)
          </button>
          <button
            className={`filter-chip ${
              activeFilter === 'fastDelivery' ? 'active' : ''
            }`}
            onClick={() => handleFilterClick('fastDelivery')}
          >
            ⚡ Fast Delivery (≤ 35 mins)
          </button>
          <button
            className={`filter-chip ${
              activeFilter === 'pureVeg' ? 'active' : ''
            }`}
            onClick={() => handleFilterClick('pureVeg')}
          >
            🌱 Pure Veg
          </button>
          <button
            className={`filter-chip ${
              activeFilter === 'costLow' ? 'active' : ''
            }`}
            onClick={() => handleFilterClick('costLow')}
          >
            💰 Under ₹300
          </button>
        </div>

        {(activeFilter !== 'all' || searchText) && (
          <button className="reset-filter-btn" onClick={resetAllFilters}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Main Content: Restaurant View OR Dish Search View */}
      {loading ? (
        <Shimmer />
      ) : searchTab === 'dishes' ? (
        /* Dishes Results Grid */
        <div className="dishes-results-container">
          <div className="results-header">
            <h2 className="results-count">
              Found {filteredDishes.length}{' '}
              {filteredDishes.length === 1 ? 'Dish' : 'Dishes'}
              {searchText ? ` matching "${searchText}"` : ' ready for delivery'}
            </h2>
          </div>

          {filteredDishes.length === 0 ? (
            <div className="no-results-card">
              <span className="no-results-icon">🍲</span>
              <h2>No dishes found</h2>
              <p>
                We couldn't find any dish matching "{searchText}". Try searching for Pizza, Biryani, Waffle, or Burger!
              </p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSearchText('');
                  setActiveFilter('all');
                }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="dishes-grid">
              {filteredDishes.map((dish) => {
                const price = getDishPrice(dish.price || dish.defaultPrice);
                const qty = getItemQuantity(dish.id);
                const imageUrl = dish.imageId
                  ? IMG_CON_URL + dish.imageId
                  : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60';

                return (
                  <div key={dish.id} className="dish-search-card">
                    <div className="dish-card-img-wrapper">
                      <img
                        src={imageUrl}
                        alt={dish.name}
                        className="dish-card-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60';
                        }}
                      />
                      <span
                        className={`dish-diet-badge ${
                          dish.isVeg ? 'veg' : 'non-veg'
                        }`}
                      >
                        ● {dish.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>

                    <div className="dish-card-content">
                      <div className="dish-restaurant-attribution">
                        <Link
                          to={`/restaurant/${dish.restaurantId}`}
                          className="dish-restaurant-link"
                          title="View restaurant menu"
                        >
                          By {dish.restaurantName} • ★ {dish.restaurantRating}
                        </Link>
                        <span className="dish-sla-tag">
                          ⏱️ {dish.restaurantSla}
                        </span>
                      </div>

                      <h3 className="dish-title">{dish.name}</h3>

                      <p className="dish-description">
                        {dish.description ||
                          `Fresh and authentic preparation crafted with house spices.`}
                      </p>

                      <div className="dish-card-bottom-row">
                        <span className="dish-price-tag">₹{price}</span>

                        {qty === 0 ? (
                          <button
                            className="dish-add-btn"
                            onClick={() =>
                              addToCart({
                                id: dish.id,
                                name: dish.name,
                                price,
                                imageId: dish.imageId,
                                isVeg: dish.isVeg,
                                description: dish.description,
                                restaurantId: dish.restaurantId,
                                restaurantName: dish.restaurantName,
                              })
                            }
                          >
                            + ADD
                          </button>
                        ) : (
                          <div className="dish-stepper-btn">
                            <button
                              onClick={() => removeFromCart(dish.id)}
                              className="dish-step-minus"
                            >
                              −
                            </button>
                            <span className="dish-step-qty">{qty}</span>
                            <button
                              onClick={() =>
                                addToCart({
                                  id: dish.id,
                                  name: dish.name,
                                  price,
                                  imageId: dish.imageId,
                                  isVeg: dish.isVeg,
                                  description: dish.description,
                                  restaurantId: dish.restaurantId,
                                  restaurantName: dish.restaurantName,
                                })
                              }
                              className="dish-step-plus"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Restaurants List */
        <div className="restaurants-results-container">
          <div className="results-header">
            <h2 className="results-count">
              {restaurants.length}{' '}
              {restaurants.length === 1 ? 'Restaurant' : 'Restaurants'} available
            </h2>
          </div>

          {restaurants.length === 0 ? (
            <div className="no-results-card">
              <span className="no-results-icon">🍽️</span>
              <h2>No matching restaurants found</h2>
              <p>
                We couldn't find any restaurants matching your search criteria.
                Try searching in Dishes or clear your filters!
              </p>
              <button className="reset-btn" onClick={resetAllFilters}>
                Show All Restaurants
              </button>
            </div>
          ) : (
            <div className="restaurant-list">
              {restaurants.map((restaurant, i) => (
                <RestaurantCard
                  key={restaurant?.info?.id || i}
                  {...restaurant?.info}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Body;