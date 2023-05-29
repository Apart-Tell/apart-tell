import React from 'react'

const Options = () => {
  return (
    <>
    <div className='option container'>
      <h2 className='option-h2'>Find the most convenient accommodation</h2>
      <div className='option-row'>

        <div className='option-column'>
          <a href='/admin-home'>
            <h4>Apartment</h4>
            <img src='src/assets/images/apartment-img.png' alt='apartment-img'></img>
          </a>
        </div>

        <div className='option-column'>
          <a href='/admin-home'>
            <h4>Boarding House</h4>
            <img src='src/assets/images/bh-img.png' alt='bh-img'></img>
          </a>
        </div>

        <div className='option-column'>
          <a href='/admin-home'>
            <h4>Dormitory</h4>
            <img src='src/assets/images/dorm-img.png' alt='dorm-img'></img>
          </a>
        </div>

      </div>
    </div>
    </>
  )
}

export default Options
