import React from 'react';
import './container.scss';

const Container = () => {
    return (
      <>
        <div className="explore-page container">

            {/* Search component */}
            <div className="searchbar-section">
                <form>
                    <div className="searchbar">
                        <input type="text" />
                        <button>Search</button>
                    </div>
                </form>
            </div>

            <div className="main-container">

                {/* Checklist component */}
                <div className="checklist-section">
                    Checklist Section
                </div>
                <div className="headline-listing-section">

                    {/* Headline component */}
                    <div className="headline-section">
                            <div className="headline-text">
                                <h2>Where to stay in Mintal?</h2>
                            </div>

                            <div className="sort-dropdown-container">
                                <div className="sort-dropdown">
                                    <select>
                                    <option>Sort</option>
                                    <option>Apartment</option>
                                    <option>Boarding House</option>
                                    <option>Apartment</option>
                                    </select>
                                </div>
                            </div>
                    </div>

                    {/* Listing component */}
                    <div className="listing-section">
                        <div className="listing-img">
                            <img src="src/assets/images/peniel.jpg" alt="Peniel" />
                        </div>
                        <div className="listing-left">
                            <div className="type">
                                {/* Replace "Boarding House" with type from database */}
                                <h6>Boarding House</h6>
                            </div>
                            <div className="name-address">
                                <div className="name">
                                    <h2>Peniel</h2>
                                </div>
                                <div className="address">
                                    <h6>Purok 4, Sitio Basak Mintal</h6>
                                </div>
                            </div>
                            <div className="more-info">
                                <div className="no-of-occupants">
                                    <h6>More than 1 occupant per room</h6>
                                </div>
                                <div className="amenity">
                                    <h6>Amenities</h6>
                                </div>
                                <div className="establishment">
                                    <h6>Nearby establishment</h6>
                                </div>
                            </div>
                        </div>
                        <div className="listing-right">
                            <div className="fee-section">
                                <div className="currency"><h6>PHP</h6></div>
                                <div className="fee"><h2>3,400</h2></div>
                            </div>
                            <div className="view-button">
                                <button>View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </>
    );
  }

  export default Container;