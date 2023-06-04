import React from 'react'
import { Link } from 'react-router-dom';

const Options = () => {
  return (
    <>
    <div className='option container'>
      <h2 className='option-h2'>Find the most convenient accommodation</h2>
      <div className='option-row'>

        <div className='option-column'>
          <Link to='/admin-apartment'>
            <h4>Apartment</h4>
            <img src='src/assets/images/apartment-img.png' alt='apartment-img'></img>
          </Link>
        </div>

        <div className='option-column'>
          <Link to='/admin-boarding'>
            <h4>Boarding House</h4>
            <img src='src/assets/images/bh-img.png' alt='bh-img'></img>
          </Link>
        </div>

        <div className='option-column'>
          <Link to='/admin-dormitory'>
            <h4>Dormitory</h4>
            <img src='src/assets/images/dorm-img.png' alt='dorm-img'></img>
          </Link>
        </div>

      </div>
    </div>
    </>
  )
}

export default Options
