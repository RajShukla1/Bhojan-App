import React, { useState } from 'react'
import Menu from './Menu'

const SubMenu = ({info}) => {
    const [isVeg, setIsVeg] = useState(false);
  return (
    <div>
        <button onClick={()=>setIsVeg(!isVeg)}>{!isVeg ??'veg'}</button>
        {info?.map((elem,i)=><Menu key={i} info={elem?.card?.info}/>)}
    </div>
  )
}

export default SubMenu