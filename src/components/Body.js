import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { API, restaurantList, filterData } from "./constants";
import { useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = ()=>{
    const [searchText, setSearchText] = useState('');
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    const getRestaurants = async ()=>{
      try{
        let data = await fetch(API);
        let json = await data.json();
        console.log(json );
        setAllRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      }catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
        getRestaurants();
    },[])

    return (allRestaurants?.length === 0)? <Shimmer/>:(
        <>
        <div className="search-container">
            <input type="text" value={searchText} onChange={(e)=>{
                setSearchText(e.target.value)
                let data = filterData(e.target.value, allRestaurants, 'home');
                setRestaurants(data);
                }} className="search-input" placeholder="Search for restaurant"/>
            <button className="search-btn" onClick={()=>{
               
            }}>Search</button>
        </div>
      <div className='restaurant-list'>
      {
        restaurants?.length === 0 ? <h1>No result found...</h1> :  restaurants?.map((restaurant, i)=><RestaurantCard key={i} {...restaurant?.info } />)
      }
      </div>
      </>
    )
  }
  export default Body;