import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { restaurantList } from "./constants";

const filterData = (searchText,restaurants) =>{
        // let restaurants = restaurantList;
        restaurants = restaurants.filter((restaurant)=>restaurant.info.name.includes(searchText));
        return restaurants;
}
const Body = ()=>{
    const [searchText, setSearchText] = useState('');
    const [restaurants, setRestaurants] = useState(restaurantList);
    return (
        <>
        <div className="search-container">
            <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} className="search-input" placeholder="search"/>
            <button className="search-btn" onClick={()=>{
                let data = filterData(searchText, restaurantList);
                setRestaurants(data);
            }}>Search</button>
        </div>
      <div className='restaurant-list'>
      {
        restaurants.map((restaurant, i)=><RestaurantCard key={i} {...restaurant?.info } />)
      }
      </div>
      </>
    )
  }
  export default Body;