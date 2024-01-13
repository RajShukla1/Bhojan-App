import { Link } from "react-router-dom";
import { IMG_CON_URL } from "./constants";

const RestaurantCard = ({ id, name, cuisines, cloudinaryImageId, avgRating })=>{
  let nameLimit = name.substring(0,15);
    return (
      <Link to={'/restaurant/'+id}>
      <div className='card'>
        <img src={IMG_CON_URL+cloudinaryImageId} alt='card'/>
        <h1>{name?.length > 10 ? nameLimit+ '...' :name }</h1>
        <h3>{cuisines.join(', ')}</h3>
        <h4>{avgRating} stars</h4>
      </div></Link>
    )
  }
  export default RestaurantCard;