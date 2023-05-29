import React from 'react';
import './listings.scss';

export default function Option() {
    const handleExploreClick = () => {
        window.location.href = '/explore';
    };

    return (
        <div className='listing container'>

            <div className="listing-h2">
                <h2 className='option-h2'>See current listings</h2>
            </div>

            <div className='listing-row'>

                <div className="listing-card">
                    <div className="card-img">
                        <img src="src\assets\images\peniel.jpg" alt="Peniel Boarding House" />
                    </div>
                    <div className="card-text">
                        <h4 className='accommodation-name'>Peniel</h4>
                        <h4 className='accommodation-price'>3,400 PHP</h4>
                    </div>
                    <div className="card-text">
                        <h5 className='accommodation-occupants'>2 persons per room</h5>
                        <h5 className='accommodation-amenities'>Laundry, Wifi</h5>
                    </div>
                </div>

                <div className="listing-card">
                    <div className="card-img">
                        <img src="src\assets\images\silva.jpg" alt="Silva Dormitory" />
                    </div>
                    <div className="card-text">
                        <h4 className='accommodation-name'>Silva</h4>
                        <h4 className='accommodation-price'>5,000 PHP</h4>
                    </div>
                    <div className="card-text">
                        <h5 className='accommodation-occupants'>2 persons per room</h5>
                        <h5 className='accommodation-amenities'>Own CR, Wifi</h5>
                    </div>
                </div>

                <div className="listing-card">
                    <div className="card-img">
                        <img src="src\assets\images\upad.jpg" alt="UPAD Boarding House" />
                    </div>
                    <div className="card-text">
                        <h4 className='accommodation-name'>UPAD</h4>
                        <h4 className='accommodation-price'>5,000 PHP</h4>
                    </div>
                    <div className="card-text">
                        <h5 className='accommodation-occupants'>2 persons per room</h5>
                        <h5 className='accommodation-amenities'>Own CR, Wifi</h5>
                    </div>
                </div>

            </div>

            <div className='explore-btn'>
                <button onClick={handleExploreClick}>
                    Explore
                </button>
            </div>

        </div>
    )
}