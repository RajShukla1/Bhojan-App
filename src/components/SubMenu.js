import React, { useState } from 'react'
import Menu from './Menu'
import { filterData } from './constants';
const SubMenu = ({info}) => {
  const [searchText, setSearchText] = useState('');
  const [completeMenu, setCompleteMenu] = useState(info);
  const [menu, setMenu] = useState(info);
  return (
    <div>
       <div className="search-container">
            <input type="text" value={searchText} onChange={(e)=>{
                setSearchText(e.target.value)
                let data = filterData(e.target.value, completeMenu, 'menu');
                setMenu(data);
                }} className="search-input-menu" placeholder="Search menu"/>
            <button className="search-btn" onClick={()=>{
               
            }}>Search</button>
        </div>
        { menu?.length === 0 ? <h1>No result found...</h1> : menu?.map((elem,i)=><Menu key={i} info={elem?.card?.info}/>)}
    </div>
  )
}

export default SubMenu