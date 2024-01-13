import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMG_CON_URL, RESTAURANT_API } from './constants';
import Menu from './Menu';

const RestaurantMenu = () => {
    const params = useParams();
    const [restaurant,setRestaurant] = useState({});
    const [menu, setMenu] = useState([]); 
    console.log(fetch(RESTAURANT_API));
    useEffect(()=>{
        getRestaurantInfo();
    },[])
    const getRestaurantInfo = async ()=>{
        let data = await fetch(RESTAURANT_API+params?.id);
        let json = await data.json();
        console.log(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
        setRestaurant(json?.data?.cards[0]?.card?.card?.info);
        setMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);  
    }
  return (
    <>
    <div className='card'>
        <img src={IMG_CON_URL+restaurant?.cloudinaryImageId} alt='restaurantImg'/>
        <h1>{restaurant?.name}</h1>
        <h3>✰ {restaurant?.avgRating}</h3>
        <h3>{restaurant?.costForTwoMessage}</h3>
        <div>
        {menu?.map((info,i)=><Menu key={i} info={info?.card?.info}/>)}
    </div>
    </div>
    {}
    </>
  )
}

export default RestaurantMenu