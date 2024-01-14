import React, { useState } from 'react'
import { IMG_CON_URL } from './constants'

const Menu = ({info}) => {
    let {name, isVeg, category, imageId, price, ratings, showImage} = info;
  return (
    <div className='menu-card'>
        {showImage&& <img className='menu-img' src={IMG_CON_URL+imageId} alt='menu-item'/>}
        <div>
          {isVeg ?<span className='veg' style={{backgroundColor:"green"}}></span>:<div className='veg' style={{backgroundColor:"red"}}></div>}
        <p className='menu-name'>{name}</p>
        <p>{price?'₹'+price/100:''}</p>
        <p>{ratings?.aggregatedRating?.rating}⭐ {category}</p>
        </div>
    </div>
  )
}

export default Menu