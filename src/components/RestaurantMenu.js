import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMG_CON_URL, RESTAURANT_API } from './constants';

const RestaurantMenu = () => {
    const params = useParams();
    const [restaurant,setRestaurant] = useState({});
    useEffect(()=>{
        getRestaurantInfo();
    },[])
    const getRestaurantInfo = async ()=>{
        let data = await fetch(RESTAURANT_API);
        let json = await data.json();
        console.log(json?.data);
        setRestaurant(json?.data?.cards[0]?.card?.card?.info);    
    }
  return (
    <>
    <div className='card'>
        <img src={IMG_CON_URL+restaurant?.cloudinaryImageId} alt='restaurantImg'/>
        <h1>{restaurant?.name}</h1>
        <h3>✰ {restaurant?.avgRating}</h3>
        <h3>{restaurant?.costForTwoMessage}</h3>
    </div>
    <div>
        {console.log(restaurant)}
    </div>
    </>
  )
}

export default RestaurantMenu