import React from 'react';
import { useEffect, useState } from 'react';
import { collection,doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import './view_explore.scss';

const View_Explore = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'accommodations'));
        const fetchedListings = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);


  return (
    <div className="view-explore-wrapper">
        <div className="search-bar-container">
            <div className="search-bar-style">
                <input
                    type="text"
                    placeholder="Search"
                />
                <button type='button'>
                    Search
                </button>
            </div>
        </div>
      <div className='view-explore'>
        <div className='filtering-system'>
          <h2 className='system-text'>Filters</h2>
          <div>
            <label>Type</label>
            <select>
              <option>Select a type</option>
              <option>Apartment</option>
              <option>Boarding House</option>
              <option>Apartment</option>
            </select>
          </div>
          <br/>
          <hr/>
          <div>
            <label>Amenities</label>
            <div>
              <label htmlFor="amenities" className='checkbox-label'>
                <input
                  type="checkbox"
                  id="amenities"
                  value="wifi"
                />
                <span>Wi-Fi</span>
              </label>
              <label htmlFor="amenities" className='checkbox-label'>
                <input
                  type="checkbox"
                  id="amenities"
                  value="aircon"
                />
                <span>Air conditioning</span>
              </label>
              <label htmlFor="amenities" className='checkbox-label'>
                <input
                  type="checkbox"
                  id="amenities"
                  value="laundry-area"
                />
                <span>Laundry area</span>
              </label>
              <label htmlFor="amenities" className='checkbox-label'>
                <input
                  type="checkbox"
                  id="amenities"
                  value="kitchen"
                />
                <span>Kitchen</span>
              </label>
            </div>
          <br/>
          </div>
          <hr/>
          <div>
            <p>Nearby</p>
          </div>
          <div>
            <p>Number of occupants (per room)</p>
            <hr/>
          </div>
          <div>
            <p>Comfort Room Type</p>
            <hr/>
          </div>
          <div>
            <p>Rental fee (per room)</p>
            <hr/>
          </div>
          <div>
            <p>Rental fee (per head)</p>
            <hr/>
          </div>
          <div>
            <p>Additional fees</p>
            <hr/>
          </div>
        </div>
        <div className='listings'>
          <h2>Where to stay in Mintal?</h2>
          {listings.map((listing) => (
            <Link to={`/listing/${listing.id}`} key={listing.id}>
              <div className="listing-overview">
                <h3>{listing.accName}</h3>
                <p>Location: {listing.accAddress}</p>
                <p>Type: {listing.accType}</p>
                {/* Display other relevant information */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View_Explore;
