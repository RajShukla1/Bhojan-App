import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMG_CON_URL, RESTAURANT_API } from './constants';
import Menu from './Menu';
import { filterData } from './constants';

const vegOnly = (menu)=>{
  console.log(menu);
  console.log(menu?.filter((el)=>el?.card?.info?.isVeg === 1));
  return menu?.filter((el)=>el?.card?.info?.isVeg === 1);
}

const RestaurantMenu = () => {
    const params = useParams();
    const [searchText, setSearchText] = useState('');
    const [restaurant,setRestaurant] = useState({});
    const [subMenu, setSubMenu] = useState([]);
    const [menu, setMenu] = useState([]);
    const [isVegOnly, setIsVegOnly] = useState(false);
    console.log(fetch(RESTAURANT_API));
    useEffect(()=>{
        getRestaurantInfo();
    },[])
    const getRestaurantInfo = async ()=>{
        let data = await fetch(RESTAURANT_API+params?.id);
        let json = await data.json();
        console.log(json);
        console.log(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
        setRestaurant(json?.data?.cards[2]?.card?.card?.info);
        let arr = [];
        json?.data?.cards?.filter((elem)=>elem?.groupedCard)[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((el)=>el.card?.card?.itemCards)?.forEach(element => {
          console.log(element?.card?.card?.itemCards);
          arr = [...arr,...element?.card?.card?.itemCards];
        });
        console.log([...arr]);
        setMenu([...arr]);
        setSubMenu([...arr]);
        // setMenu(json?.data?.cards?.filter((elem)=>elem?.groupedCard)[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((el)=>el.card?.card?.itemCards).map((el,i)=>el?.card?.card?.title));
        console.log('menu====',menu);
    }
    console.log('in rest menu');
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
        <label className="switch">
          <input type="checkbox"
               id="switch"
               className="checkbox"
               onChange={(e)=>e.target.checked ?setMenu(vegOnly(menu)):setMenu(subMenu)} />
               <span class="slider round"></span>
</label>
          <label >Veg Only</label>
          <div className="search-container">
            <input type="text" value={searchText} onChange={(e)=>{
                setSearchText(e.target.value)
                let data = filterData(e.target.value, subMenu, 'menu');
                setMenu(data);
                }} className="search-input-menu" placeholder={'Search menu in '+restaurant?.name}/>
            <button className="search-btn" onClick={()=>{
               
            }}>Search</button>
        </div>
        {menu.map((elem,i)=><Menu key={i} info={elem?.card?.info}/>)}
          
    </div>
    </div>
    {}
    </>
  )
}

export default RestaurantMenu