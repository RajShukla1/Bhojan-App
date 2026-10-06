// Development server proxy path (uses setupProxy.js to bypass CORS on localhost)
export const PROXY_API = '/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
export const DIRECT_API = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

export const PROXY_RESTAURANT_API = '/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.8466937&lng=80.94616599999999&catalog_qa=undefined&submitAction=ENTER&restaurantId=';
export const DIRECT_RESTAURANT_API = 'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.8466937&lng=80.94616599999999&catalog_qa=undefined&submitAction=ENTER&restaurantId=';

// Default exports for backward compatibility
export const API = PROXY_API;
export const RESTAURANT_API = PROXY_RESTAURANT_API;

export const IMG_CON_URL = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';

export const filterData = (searchText, list, page) => {
  if (!searchText || !list) return list || [];
  const query = searchText.toLowerCase().trim();

  if (page === 'home') {
    return list.filter((restaurant) => {
      const name = restaurant?.info?.name?.toLowerCase() || '';
      const cuisines = restaurant?.info?.cuisines || [];
      const locality = restaurant?.info?.locality?.toLowerCase() || '';
      const area = restaurant?.info?.areaName?.toLowerCase() || '';
      return (
        name.includes(query) ||
        locality.includes(query) ||
        area.includes(query) ||
        cuisines.some((c) => c.toLowerCase().includes(query))
      );
    });
  }

  if (page === 'menu') {
    return list.filter((item) => {
      const info = item?.card?.info || item?.info || item;
      const name = info?.name?.toLowerCase() || '';
      const category = info?.category?.toLowerCase() || '';
      const desc = info?.description?.toLowerCase() || '';
      return name.includes(query) || category.includes(query) || desc.includes(query);
    });
  }

  return list;
};
export const restaurantList = [{
    "info": {
      "id": "59284",
      "name": "Domino's Pizza",
      "cloudinaryImageId": "jd3b24bmmmwsdpezahj5",
      "locality": "Hazratganj",
      "areaName": "Hazratganj",
      "costForTwo": "₹400 for two",
      "cuisines": [
        "Pizzas",
        "Italian",
        "Pastas",
        "Desserts"
      ],
      "avgRating": 4.5,
      "parentId": "2456",
      "avgRatingString": "4.5",
      "totalRatingsString": "5K+",
      "sla": {
        "deliveryTime": 25,
        "serviceability": "SERVICEABLE",
        "slaString": "25 mins",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-02 02:59:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/dominos-pizza-hazratganj-lucknow-59284",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "75446",
      "name": "Jahangir Hotel",
      "cloudinaryImageId": "d4638e3377ec4f03a7435c3c61849837",
      "locality": "Nishat Ganj",
      "areaName": "Nishat Ganj",
      "costForTwo": "₹300 for two",
      "cuisines": [
        "Biryani",
        "Mughlai",
        "Rolls & Wraps"
      ],
      "avgRating": 4.2,
      "parentId": "108288",
      "avgRatingString": "4.2",
      "totalRatingsString": "10K+",
      "sla": {
        "deliveryTime": 41,
        "lastMileTravel": 4.3,
        "serviceability": "SERVICEABLE",
        "slaString": "41 mins",
        "lastMileTravelString": "4.3 km",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-01 23:59:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/jahangir-hotel-nishat-ganj-lucknow-75446",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "755613",
      "name": "The Belgian Waffle Co.",
      "cloudinaryImageId": "5116a385bac0548e06c33c08350fbf11",
      "locality": "SAPRU MARG",
      "areaName": "SATYAMAN PALACE",
      "costForTwo": "₹200 for two",
      "cuisines": [
        "Waffle",
        "Desserts",
        "Ice Cream"
      ],
      "avgRating": 4.7,
      "veg": true,
      "parentId": "2233",
      "avgRatingString": "4.7",
      "totalRatingsString": "100+",
      "sla": {
        "deliveryTime": 41,
        "lastMileTravel": 0.9,
        "serviceability": "SERVICEABLE",
        "slaString": "41 mins",
        "lastMileTravelString": "0.9 km",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-02 03:00:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "isNewlyOnboarded": true,
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/the-belgian-waffle-co-sapru-marg-satyaman-palace-lucknow-755613",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "84523",
      "name": "Kareem Kababi",
      "cloudinaryImageId": "225485f0e2710dd0fdf90310934f28bf",
      "locality": "Gangaprasad Marg",
      "areaName": "Chowk",
      "costForTwo": "₹250 for two",
      "cuisines": [
        "Mughlai",
        "Kebabs",
        "North Indian"
      ],
      "avgRating": 4.4,
      "parentId": "115071",
      "avgRatingString": "4.4",
      "totalRatingsString": "10K+",
      "sla": {
        "deliveryTime": 38,
        "lastMileTravel": 3.9,
        "serviceability": "SERVICEABLE",
        "slaString": "38 mins",
        "lastMileTravelString": "3.9 km",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-01 23:30:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/kareem-kababi-gangaprasad-marg-chowk-lucknow-84523",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "439449",
      "name": "Lazzetti",
      "cloudinaryImageId": "yawuhmkrrz0nd9fp0kso",
      "locality": "Naveen Market Road",
      "areaName": "Naveen Market",
      "costForTwo": "₹250 for two",
      "cuisines": [
        "American"
      ],
      "parentId": "2133",
      "avgRatingString": "--",
      "sla": {
        "deliveryTime": 55,
        "serviceability": "SERVICEABLE",
        "slaString": "55 mins",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-01 23:00:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/lazzetti-road-naveen-market-lucknow-439449",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "665483",
      "name": "Ice & Spice",
      "cloudinaryImageId": "cb65bf17f22cf6e6ba956cbc49b0f94b",
      "locality": "Nagar Nigam Food Safety  Zone-17",
      "areaName": "Indira Nagar",
      "costForTwo": "₹400 for two",
      "cuisines": [
        "South Indian",
        "Tandoor",
        "Indian",
        "Italian"
      ],
      "avgRating": 4.4,
      "veg": true,
      "parentId": "5544",
      "avgRatingString": "4.4",
      "totalRatingsString": "100+",
      "sla": {
        "deliveryTime": 47,
        "lastMileTravel": 4,
        "serviceability": "SERVICEABLE",
        "slaString": "47 mins",
        "lastMileTravelString": "4.0 km",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-01 23:00:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/ice-and-spice-nagar-nigam-food-safety-zone-17-indira-nagar-lucknow-665483",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "61061",
      "name": "Mahesh's Mansarovar",
      "cloudinaryImageId": "6f60d392f35e8c2529d7c494b0468937",
      "locality": "Aliganj",
      "areaName": "Aliganj",
      "costForTwo": "₹300 for two",
      "cuisines": [
        "Sweets",
        "South Indian",
        "Indian",
        "Chinese",
        "Desserts",
        "Italian",
        "Pizzas",
        "Snacks",
        "Pastas"
      ],
      "avgRating": 4.4,
      "parentId": "7795",
      "avgRatingString": "4.4",
      "totalRatingsString": "10K+",
      "sla": {
        "deliveryTime": 44,
        "lastMileTravel": 4.9,
        "serviceability": "SERVICEABLE",
        "slaString": "44 mins",
        "lastMileTravelString": "4.9 km",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-01 22:30:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/maheshs-mansarovar-aliganj-lucknow-61061",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "90558",
      "name": "Kanchan Sweets & Pasteries",
      "cloudinaryImageId": "cdx8nqpnmxprksfdz9my",
      "locality": "A Block",
      "areaName": "Indira Nagar",
      "costForTwo": "₹350 for two",
      "cuisines": [
        "Sweets",
        "Bakery",
        "Desserts"
      ],
      "avgRating": 4.6,
      "veg": true,
      "parentId": "114504",
      "avgRatingString": "4.6",
      "totalRatingsString": "5K+",
      "sla": {
        "deliveryTime": 43,
        "lastMileTravel": 5,
        "serviceability": "SERVICEABLE",
        "slaString": "43 mins",
        "lastMileTravelString": "5.0 km",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-01 22:00:00",
        "opened": true
      },
      "badges": {
        "imageBadges": [
          {
            "imageId": "v1695133679/badges/Pure_Veg111.png",
            "description": "pureveg"
          }
        ]
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            "badgeObject": [
              {
                "attributes": {
                  "description": "pureveg",
                  "imageId": "v1695133679/badges/Pure_Veg111.png"
                }
              }
            ]
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/kanchan-sweets-and-pasteries-a-block-indira-nagar-lucknow-90558",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  },
  {
    "info": {
      "id": "401850",
      "name": "Darbar Restaurant",
      "cloudinaryImageId": "jfxdvd8nszay6jotks3o",
      "locality": "Golaganj",
      "areaName": "Chowk",
      "costForTwo": "₹300 for two",
      "cuisines": [
        "Mughlai",
        "Biryani",
        "Lucknowi"
      ],
      "avgRating": 4.2,
      "parentId": "68466",
      "avgRatingString": "4.2",
      "totalRatingsString": "1K+",
      "sla": {
        "deliveryTime": 41,
        "lastMileTravel": 3.8,
        "serviceability": "SERVICEABLE",
        "slaString": "41 mins",
        "lastMileTravelString": "3.8 km",
        "iconType": "ICON_TYPE_EMPTY"
      },
      "availability": {
        "nextCloseTime": "2024-01-02 01:00:00",
        "opened": true
      },
      "badges": {
        
      },
      "isOpen": true,
      "type": "F",
      "badgesV2": {
        "entityBadges": {
          "imageBased": {
            
          },
          "textBased": {
            
          },
          "textExtendedBadges": {
            
          }
        }
      },
      "aggregatedDiscountInfoV3": {
        "header": "₹120 OFF",
        "subHeader": "ABOVE ₹199",
        "discountTag": "FLAT DEAL"
      },
      "orderabilityCommunication": {
        "title": {
          
        },
        "subTitle": {
          
        },
        "message": {
          
        },
        "customIcon": {
          
        }
      },
      "differentiatedUi": {
        "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        "differentiatedUiMediaDetails": {
          "mediaType": "ADS_MEDIA_ENUM_IMAGE",
          "lottie": {
            
          },
          "video": {
            
          }
        }
      },
      "reviewsSummary": {
        
      },
      "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      "restaurantOfferPresentationInfo": {
        
      }
    },
    "analytics": {
      "context": "seo-data-289e8de0-cf80-403e-a5cf-eaaa6d993c7c"
    },
    "cta": {
      "link": "https://www.swiggy.com/restaurants/darbar-restaurant-golaganj-chowk-lucknow-401850",
      "text": "RESTAURANT_MENU",
      "type": "WEBLINK"
    },
    "widgetId": "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo"
  }];

export const FALLBACK_MENUS = {
  // Domino's Pizza
  '59284': [
    {
      card: {
        info: {
          id: 'dom_1',
          name: 'Margherita Pizza',
          category: 'Pizzas',
          price: 23900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.4' } },
          description: 'Classic delight with 100% real mozzarella cheese.',
          imageId: 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'dom_2',
          name: 'Peppy Paneer Pizza',
          category: 'Pizzas',
          price: 33900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.5' } },
          description: 'Flavorful paneer chunks, crisp capsicum and spicy red paprika.',
          imageId: 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'dom_3',
          name: 'Farmhouse Veg Delight',
          category: 'Pizzas',
          price: 39900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.6' } },
          description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom.',
          imageId: 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'dom_4',
          name: 'Pepper Barbecue Chicken Pizza',
          category: 'Non-Veg Pizzas',
          price: 44900,
          isVeg: 0,
          ratings: { aggregatedRating: { rating: '4.7' } },
          description: 'Pepper barbecue chicken for that extra flavorful kick.',
          imageId: 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'dom_5',
          name: 'Stuffed Garlic Breadsticks',
          category: 'Sides',
          price: 15900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.6' } },
          description: 'Freshly baked garlic breadsticks filled with melted cheese and sweet corn.',
          imageId: 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'dom_6',
          name: 'Choco Lava Cake',
          category: 'Desserts',
          price: 11900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.8' } },
          description: 'Chocolate lovers delight! Indulgent molten chocolate oozing from the center.',
          imageId: 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
  ],
  // Jahangir Hotel
  '75446': [
    {
      card: {
        info: {
          id: 'jah_1',
          name: 'Special Chicken Dum Biryani',
          category: 'Biryani',
          price: 24000,
          isVeg: 0,
          ratings: { aggregatedRating: { rating: '4.5' } },
          description: 'Fragrant basmati rice slow-cooked with tender marinated chicken and secret spices.',
          imageId: 'd4638e3377ec4f03a7435c3c61849837',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'jah_2',
          name: 'Mutton Galawati Kebab (4 Pcs)',
          category: 'Mughlai',
          price: 32000,
          isVeg: 0,
          ratings: { aggregatedRating: { rating: '4.7' } },
          description: 'Mouth-melting Lucknawi delicacy seasoned with over 160 secret aromatic spices.',
          imageId: 'd4638e3377ec4f03a7435c3c61849837',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'jah_3',
          name: 'Lucknawi Butter Chicken',
          category: 'Main Course',
          price: 34000,
          isVeg: 0,
          ratings: { aggregatedRating: { rating: '4.3' } },
          description: 'Tender chicken pieces simmered in rich, buttery, velvety tomato gravy.',
          imageId: 'd4638e3377ec4f03a7435c3c61849837',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'jah_4',
          name: 'Paneer Lababdar',
          category: 'Main Course',
          price: 26000,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.2' } },
          description: 'Cottage cheese cubes bathed in rich cashewnut and tomato gravy.',
          imageId: 'd4638e3377ec4f03a7435c3c61849837',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'jah_5',
          name: 'Ulta Tawa Paratha (2 Pcs)',
          category: 'Breads',
          price: 5000,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.6' } },
          description: 'Soft, flaky traditional saffron-infused Lucknawi paratha.',
          imageId: 'd4638e3377ec4f03a7435c3c61849837',
          showImage: true,
        },
      },
    },
  ],
  // The Belgian Waffle Co.
  '755613': [
    {
      card: {
        info: {
          id: 'bw_1',
          name: 'Chocolate Overload Waffle',
          category: 'Waffles',
          price: 16500,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.8' } },
          description: 'Crispy waffle sandwich overloaded with rich dark and milk chocolate.',
          imageId: '5116a385bac0548e06c33c08350fbf11',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'bw_2',
          name: 'Red Velvet Waffle Cake',
          category: 'Waffles',
          price: 18000,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.7' } },
          description: 'Original red velvet waffle topped with creamy white chocolate drizzle.',
          imageId: '5116a385bac0548e06c33c08350fbf11',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'bw_3',
          name: 'Nutella Loaded Waffle',
          category: 'Waffles',
          price: 19500,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.9' } },
          description: 'Warm crispy golden waffle generously smothered with pure hazelnut Nutella.',
          imageId: '5116a385bac0548e06c33c08350fbf11',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: 'bw_4',
          name: 'Almond Cocoa Butter Waffle',
          category: 'Waffles',
          price: 17500,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.5' } },
          description: 'Toasted almond slivers on crispy cocoa waffle with creamy chocolate filling.',
          imageId: '5116a385bac0548e06c33c08350fbf11',
          showImage: true,
        },
      },
    },
  ],
};

export const getFallbackMenu = (restaurantId, restaurantInfo) => {
  if (FALLBACK_MENUS[restaurantId]) {
    return FALLBACK_MENUS[restaurantId];
  }

  // Generic appetizing menu for other restaurants
  const resName = restaurantInfo?.name || 'Chef';
  const cuisines = restaurantInfo?.cuisines || ['Indian', 'Snacks'];
  return [
    {
      card: {
        info: {
          id: `${restaurantId}_special_1`,
          name: `${resName} Special Deluxe Platter`,
          category: 'Chef Specials',
          price: 29900,
          isVeg: restaurantInfo?.veg ? 1 : 0,
          ratings: { aggregatedRating: { rating: '4.6' } },
          description: `Signature house combination featuring our freshest ingredients and authentic ${cuisines[0] || 'spices'}.`,
          imageId: restaurantInfo?.cloudinaryImageId || 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: `${restaurantId}_special_2`,
          name: 'Paneer Butter Tikka Delight',
          category: 'Appetizers',
          price: 24900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.5' } },
          description: 'Char-grilled cottage cheese cubes tossed in spicy tandoori marinade and mint chutney.',
          imageId: restaurantInfo?.cloudinaryImageId || 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: `${restaurantId}_special_3`,
          name: 'Gourmet Meal Box Combo',
          category: 'Main Course',
          price: 27900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.4' } },
          description: 'Complete wholesome meal with signature main, aromatic basmati rice, bread and dessert.',
          imageId: restaurantInfo?.cloudinaryImageId || 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
    {
      card: {
        info: {
          id: `${restaurantId}_special_4`,
          name: 'Refreshing Masala Beverage',
          category: 'Beverages',
          price: 8900,
          isVeg: 1,
          ratings: { aggregatedRating: { rating: '4.3' } },
          description: 'Chilled thirst quencher infused with roasted cumin, mint leaves and fresh lemon.',
          imageId: restaurantInfo?.cloudinaryImageId || 'jd3b24bmmmwsdpezahj5',
          showImage: true,
        },
      },
    },
  ];
};

export const AVAILABLE_COUPONS = [
  {
    code: 'BHOJAN50',
    type: 'percent',
    discountPercent: 50,
    maxDiscount: 100,
    minOrder: 199,
    description: '50% OFF up to ₹100 on orders above ₹199',
    badge: 'Trending Deal',
    icon: '🔥',
  },
  {
    code: 'WELCOME20',
    type: 'percent',
    discountPercent: 20,
    maxDiscount: 150,
    minOrder: 299,
    description: '20% OFF up to ₹150 on orders above ₹299',
    badge: 'Welcome Offer',
    icon: '🎉',
  },
  {
    code: 'FREEDEL',
    type: 'flat',
    flatDiscount: 35,
    minOrder: 149,
    description: 'FREE Delivery! Flat ₹35 discount on delivery fee',
    badge: 'Free Delivery',
    icon: '🛵',
  },
  {
    code: 'FEAST120',
    type: 'flat',
    flatDiscount: 120,
    minOrder: 499,
    description: 'Flat ₹120 OFF on jumbo orders above ₹499',
    badge: 'Jumbo Savings',
    icon: '👑',
  },
];

export const getAllDishes = (customRestaurants) => {
  const sourceRestaurants =
    customRestaurants && customRestaurants.length > 0
      ? customRestaurants
      : restaurantList;
  const dishes = [];
  const seenIds = new Set();

  sourceRestaurants.forEach((res) => {
    const resInfo = res?.info || res;
    const resId = resInfo?.id;
    if (!resId) return;

    const menu = getFallbackMenu(resId, resInfo);
    if (Array.isArray(menu)) {
      menu.forEach((item) => {
        const itemInfo = item?.card?.info;
        if (itemInfo && !seenIds.has(itemInfo.id)) {
          seenIds.add(itemInfo.id);
          dishes.push({
            ...itemInfo,
            restaurantId: resId,
            restaurantName: resInfo?.name || 'Partner Restaurant',
            restaurantArea: resInfo?.areaName || resInfo?.locality || 'Lucknow',
            restaurantRating: resInfo?.avgRating || '4.2',
            restaurantSla: resInfo?.sla?.slaString || '25-35 mins',
          });
        }
      });
    }
  });

  return dishes;
};