import React, { useState } from 'react';
import './search.scss';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchClick = () => {
    if (searchValue.trim() !== '') {
      const encodedQuery = encodeURIComponent(searchValue);
      window.location.href = `/search-results?q=${encodedQuery}`;
    } else {
      alert('Please enter a search query.');
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <section>
      <div className="container">
        <div className="search">
          <div className="search-text">
            <h1>
              Experience comfort and community,<br />
              tell us where you want to be.
            </h1>
          </div>
          <div className="search-box-container">
            <div className="search-bar-container">
              <input type="text" value={searchValue} onChange={handleInputChange} />
            </div>
            <div className="submit-btn-container">
              <button type="button" onClick={handleSearchClick}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
