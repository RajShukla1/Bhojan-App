import React, { useState } from 'react'
import { IMG_CON_URL } from './constants'

const Menu = ({info}) => {
  console.log('in menu');
    let {name, isVeg, category, imageId, price, ratings, showImage} = info;
  return (
    <div className='menu-card'>
        {showImage&& <img className='menu-img' src={IMG_CON_URL+imageId} alt='menu-item'/>}
        <div>
        <span className='veg' style={{backgroundColor: isVeg ? "green":"red"}}></span>
        <p className='menu-name'>{name}</p>
        <p>{price?'₹'+price/100:''}</p>
        <p>{ratings?.aggregatedRating?.rating}✰ {category}</p>
        </div>
    </div>
  )
}

export default Menu