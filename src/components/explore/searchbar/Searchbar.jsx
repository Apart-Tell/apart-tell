import React, { useState } from 'react';
import './searchbar.scss';

const Searchbar = ({ setFilteredAccommodations, accommodations }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      setFilteredAccommodations(accommodations);
    } else {
      const filtered = accommodations.filter((accommodation) => {
        const accName = accommodation.accName.toLowerCase();
        const accAddress = accommodation.accAddress.toLowerCase();
        const query = searchQuery.toLowerCase();
        return accName.includes(query) || accAddress.includes(query);
      });

      setFilteredAccommodations(filtered);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="searchbar-section">
      <form onSubmit={handleSearch}>
        <div className="searchbar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
