import React from 'react';
import './option.scss';

export default function Option (){
  return (
    <div className='option container'>
      <h2>Find the most convenient accommodation</h2>
      <div className='option-row'>

        <div className='option-column'>
          <a href='/'>
            <h4>Apartment</h4>
            <img src='apartment-img.png' alt='apartment-img'></img>
          </a>
        </div>

        <div className='option-column'>
          <a href='/'>
            <h4>Boarding House</h4>
            <img src='bh-img.png' alt='bh-img'></img>
          </a>
        </div>

        <div className='option-column'>
          <a href='/'>
            <h4>Dormitory</h4>
            <img src='dorm-img.png' alt='dorm-img'></img>
          </a>
        </div>   

        <div className='explore-btn'>
          <button>Explore</button> 
        </div>
         
      </div>  
    </div>
  )
}