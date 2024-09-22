import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { API, restaurantList, filterData } from "./constants";
import { useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = ()=>{
    const [searchText, setSearchText] = useState('');
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [nextPageToken, setnextPageToken] = useState("");
    const [widgetOffset, setWidgetOffset] = useState();
    const [csrf, setCsrf] = useState();
    const getRestaurants = async ()=>{
      try{
        let data = await fetch(API);
        let json = await data.json();
        console.log(json );
        setWidgetOffset(json?.data?.pageOffset?.widgetOffset);
        setCsrf(json?.csrfToken);
        setnextPageToken(json?.data?.pageOffset?.nextOffset)
        setAllRestaurants([...allRestaurants,...json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants]);
        setRestaurants([...restaurants,...json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants])
      }catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
        getRestaurants();
    },[])

  useEffect(() => {
    window.addEventListener('scroll',infiniteScroll,true);
    return () => {
      window.removeEventListener('scroll',infiniteScroll,true);
    }
  },[nextPageToken]);

  const infiniteScroll = async () => {
    if(window.innerHeight + Math.round(document.documentElement.scrollTop) >= document.documentElement.offsetHeight - 300){
      try{
        console.log(widgetOffset);
      let data = await fetch('https://www.swiggy.com/dapi/restaurants/list/update', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        data:{
          seoParams:{seoUrl: "https://www.swiggy.com/", pageType: "FOOD_HOMEPAGE", apiName: "FoodHomePage"}},
          lat: 26.8466937,
          lng: 80.94616599999999,
          nextOffset: "COVCELQ4KIDQ+Jbk0uincDCnEzgE",
          page_type: "DESKTOP_WEB_LISTING",
          widgetOffset: widgetOffset,
          _csrf: csrf
      }
    );
    let json = await data.json();
    console.log(json);
  }catch(e){
    console.log(e);
  }
  }
  }

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