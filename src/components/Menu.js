import React from 'react'
import { IMG_CON_URL } from './constants'

const Menu = ({info}) => {
    let {id, name, category, imageId} = info
  return (
    <div className='menu-card'>
        <img className='menu-item' src={IMG_CON_URL+imageId} alt='menu-item'/>
        <h5>{name}</h5>
        <h6>{category}</h6>
    </div>
  )
}

export default Menu