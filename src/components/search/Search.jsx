import React from 'react';
import './search.scss';

export default function Search(){
  return (
    <section>
      <div className = "container">
        <div className='search'>
            <h2>Experience comfort and community,<br></br>
            tell us where you want to be.</h2>
              <div className='search-box'>
              <input type='text' name='search' className='search-engine' placeholder='Search accommodation'></input>
            </div>
        </div>
      </div>
    </section>
  )
}

