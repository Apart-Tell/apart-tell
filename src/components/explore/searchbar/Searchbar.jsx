import React, { useState } from 'react';
import './searchbar.scss';

const Searchbar = ({ setFilteredAccommodations, accommodations }) => {
  // State variable to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Event handler for the search button click
  const handleSearch = (e) => {
    e.preventDefault();

    // Check if the search query is empty or contains only whitespace
    if (searchQuery.trim() === '') {
      // Display an alert message if the search query is empty
      alert('Please enter a search query');
      return; // Stop further execution of the function
    }

    // Filter the accommodations based on the search query
    const filtered = accommodations.filter((accommodation) => {
      const accName = accommodation.accName.toLowerCase();
      const accAddress = accommodation.accAddress.toLowerCase();
      const query = searchQuery.toLowerCase();
      return accName.includes(query) || accAddress.includes(query);
    });

    // Set the filtered accommodations
    setFilteredAccommodations(filtered);
  };

  // Event handler for the search input change
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
