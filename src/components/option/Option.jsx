import React from 'react';
import { Link } from 'react-router-dom';
import './option.scss';

export default function Option() {
  return (
    <div className='option container'>
      <h2 className='option-h2'>Find the most convenient accommodation</h2>
      <div className='option-row'>

        <div className='option-column'>
          <Link to='/apartment'>
            <h4>Apartment</h4>
            <img src='../assets/images/apartment-img.jpg' alt='apartment-img' />
          </Link>
        </div>

        <div className='option-column'>
          <Link to='/boarding'>
            <h4>Boarding House</h4>
            <img src='../assets/images/bh-img.jpg' alt='bh-img' />
          </Link>
        </div>

        <div className='option-column'>
          <Link to='/dormitory'>
            <h4>Dormitory</h4>
            <img src='../assets/images/dorm-img.jpg' alt='dorm-img' />
          </Link>
        </div>

      </div>
    </div>
  )
}
