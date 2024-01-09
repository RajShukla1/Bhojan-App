import React from 'react'
import '../App.css';
const Shimmer = () => {
    let arr = Array(10).fill(1);
  return (
    <div className='restaurant-list'>
    {arr.map((e,i)=><div key={i} className='card shimmer'>
      <div className='img'></div>
      <h1> </h1>
      <h1> </h1>
      <h1> </h1>
    </div>)}
    </div>
  )
}

export default Shimmer