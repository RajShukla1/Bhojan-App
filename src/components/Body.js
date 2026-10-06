import React, { useState, useEffect, useCallback } from 'react';
import RestaurantCard from './RestaurantCard';
import {
  PROXY_API,
  DIRECT_API,
  restaurantList,
  filterData,
} from './constants';
import Shimmer from './Shimmer';

const Body = () => {
  const [searchText, setSearchText] = useState('');
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiSource, setApiSource] = useState('loading'); // 'live' | 'mock' | 'loading'
  const [activeFilter, setActiveFilter] = useState('all');

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

  // Handle Search
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

  // Filter handlers
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
        <p className="hero-subtitle">Discover top rated restaurants in Lucknow</p>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="search-input"
            placeholder="Search by restaurant name, cuisine, or locality..."
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
      </div>

      {/* Filter Chips Bar */}
      <div className="filters-container">
        <div className="filter-chips">
          <button
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All Restaurants
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

      {/* Results Header */}
      <div className="results-header">
        <h2 className="results-count">
          {restaurants.length} {restaurants.length === 1 ? 'Restaurant' : 'Restaurants'} available
        </h2>
      </div>

      {/* Restaurant List or Shimmer */}
      {loading ? (
        <Shimmer />
      ) : restaurants.length === 0 ? (
        <div className="no-results-card">
          <span className="no-results-icon">🍽️</span>
          <h2>No matching restaurants found</h2>
          <p>
            We couldn't find any restaurants matching your search criteria. Try a different search or clear your filters!
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
  );
};

export default Body;