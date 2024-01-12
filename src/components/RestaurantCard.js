import { IMG_CON_URL } from "./constants";

const RestaurantCard = ({ name, cuisines, cloudinaryImageId, avgRating })=>{
    return (
      <div className='card'>
        <img src={IMG_CON_URL+cloudinaryImageId} alt='card'/>
        <h1>{name.substring(0,15)}</h1>
        <h3>{cuisines.join(', ')}</h3>
        <h4>{avgRating} stars</h4>
      </div>
    )
  }
  export default RestaurantCard;