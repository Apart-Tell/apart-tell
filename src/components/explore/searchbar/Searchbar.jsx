import React, { useState, useEffect } from 'react';
import './searchbar.scss';
import searchIcon from '../../../assets/svg/search.svg';

const Searchbar = ({ setFilteredAccommodations, accommodations }) => {
  // State variable to store the search query
  const [searchQuery, setSearchQuery] = useState('');
  // State variable to render the search icon
  const [isMobileWidth, setIsMobileWidth] = useState(false);

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

  // Dynamically update the search button to show search icon if window width is 900px
  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= 900);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for mobile width on component mount
    setIsMobileWidth(window.innerWidth <= 900);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="searchbar-section">
      <form onSubmit={handleSearch}>
        <div className="searchbar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit">
            {isMobileWidth ? (
              <img src={searchIcon} alt="Search" />
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
