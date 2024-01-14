import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMG_CON_URL, RESTAURANT_API } from './constants';
import SubMenu from './SubMenu';

const RestaurantMenu = () => {
    const params = useParams();
    const [restaurant,setRestaurant] = useState({});
    const [subMenu, setSubMenu] = useState([]);
    console.log(fetch(RESTAURANT_API));
    useEffect(()=>{
        getRestaurantInfo();
    },[])
    const getRestaurantInfo = async ()=>{
        let data = await fetch(RESTAURANT_API+params?.id);
        let json = await data.json();
        console.log(json);
        console.log(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
        setRestaurant(json?.data?.cards[0]?.card?.card?.info);
        console.log(json?.data?.cards?.filter((elem)=>elem?.groupedCard));
        console.log(json?.data?.cards?.filter((elem)=>elem?.groupedCard)[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((el)=>el.card?.card?.itemCards));
        // setMenu(json?.data?.cards?.filter((elem)=>elem?.groupedCard)[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((el)=>el.card?.card?.itemCards)[0]?.card?.card?.itemCards);
        setSubMenu(json?.data?.cards?.filter((elem)=>elem?.groupedCard)[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((el)=>el.card?.card?.itemCards));  
    }
  return ( Object.keys(restaurant).length ===0 ?'':
    <>
    <div className='restaurant-menu'>
      <div className='restaurant-details'>
        <img src={IMG_CON_URL+restaurant?.cloudinaryImageId} alt='restaurantImg'/>
        <h1>{restaurant?.name}</h1>
        <h3>✰ {restaurant?.avgRating}</h3>
        <h3>{restaurant?.costForTwoMessage}</h3>
        <h3>{restaurant?.areaName}</h3>
        {/* <p>{restaurant?.expectationNotifiers[0]?.text}</p> */}
        </div>
        <div>
          {subMenu.map((elem,i)=>(
          <div key={i}>
            <h1 className='menu-recommended'>{elem?.card?.card?.title}</h1>
          <SubMenu info={elem?.card?.card?.itemCards}/>
          </div>
          ))}
    </div>
    </div>
    {}
    </>
  )
}

export default RestaurantMenu