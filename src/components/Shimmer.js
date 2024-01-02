import React from 'react'
import '../App.css';
const Shimmer = () => {
    let arr = Array(10).fill(1);
  return (
    arr.map((e,i)=><div key={i} className='card shimmer'>
      <div className='img'></div>
      <h1>Loading...</h1>
      <h3></h3>
      <h4></h4>
    </div>)
  )
}

export default Shimmer