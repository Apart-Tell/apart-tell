import React from 'react';
import './listing.scss';

const Listing = () => {
    return (
        <>
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

                        {/* Replace "Peniel" with name from database */}
                        <div className="name">
                            <h2>Peniel</h2>
                        </div>

                        {/* Replace the element inside h6 tag with
                            address from database */}
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
        </>
    )
}

export default Listing;