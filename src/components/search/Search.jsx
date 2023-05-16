import React from 'react';
import './search.scss';

export default function Search() {
  return (
    <section>
      <div className="container">
        <div className='search'>
          <div className='search-text'>
            <h1>Experience comfort and community,<br />tell us where you want to be.</h1>
          </div>
          <div className='search-box-container'>
            {/**enclose search bar inside div */}
            <div className='search-bar-container'>
              <input type='text'></input><br></br>
            </div>
            {/**enclose search button inside div */}
            <div className='submit-btn-container'>
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

