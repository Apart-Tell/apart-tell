import React from 'react';
import { useState } from 'react';

export const Search = () => {
  // State variable to store the search value
  const [searchValue, setSearchValue] = useState('');

  // Event handler for the search button click
  const handleSearchClick = () => {
    // Check if the search value is not empty or contains only whitespace
    if (searchValue.trim() !== '') {
      // Encode the search value for URL
      const encodedQuery = encodeURIComponent(searchValue);
      // Redirect to the search results page with the encoded query in the URL
      window.location.href = `/admin-search-results?q=${encodedQuery}`;
    } else {
      // Display an alert message if the search value is empty
      alert("Please enter a search query.");
    }
  };

  // Event handler for the search input change
  const handleInputChange = (event) => {
    // Update the search value in the state
    setSearchValue(event.target.value);
  };

  return (
    <>
    <section>
      <div className="container">
        <div className='search'>
          <div className='search-text'>
            <h1>Experience comfort and community,<br />tell us where you want to be.</h1>
          </div>
          <div className='search-box-container'>
            {/**enclose search bar inside div */}
            <div className='search-bar-container'>
              {/* Search input */}
              <input type='text' value={searchValue} onChange={handleInputChange}></input><br></br>
            </div>
            {/**enclose search button inside div */}
            <div className='submit-btn-container'>
              {/* Search button */}
              <button type="button" onClick={handleSearchClick}>Search</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
