import React from 'react';
import { BsSearch } from 'react-icons/bs'
import './search.scss';

export default function Search(){
  return (
    <section>
      <div className = "container">
        <div className='search'>
            <h1>Experience comfort and community,<br></br>
            tell us where you want to be.</h1>
              <div className='search-box-container'>
                {/**enclose search bar inside div */}
                <form action='' className='search-bar'>
                  <input type='text'></input><br></br>
                  {/**enclose search button inside div */}
                  <button type='submit'>Search</button>
                </form>
            </div>
        </div>
      </div>
    </section>
  )
}

