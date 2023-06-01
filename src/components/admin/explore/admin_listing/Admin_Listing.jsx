import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../../firebase';
import Admin_Headline from '../admin_headline/Admin_Headline';
import Admin_Searchbar from '../admin_searchbar/Admin_Searchbar';

import "./admin_listing.scss";

const Admin_Listing = ({ isLoaded, type }) => {
    const [accommodations, setAccommodations] = useState([]);
    const [filteredAccommodations, setFilteredAccommodations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    const getAllAccommodations = async () => {
      const accommodationsCollectionRef = collection(db, 'accommodations');
      const q = query(
        accommodationsCollectionRef,
        where('progress', '==', 4),
        orderBy('editedAt', 'desc')
      );
      const accommodationsSnapshot = await getDocs(q);
      const accommodationsData = accommodationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccommodations(accommodationsData);
      setFilteredAccommodations(accommodationsData);
    };
  
    useEffect(() => {
      getAllAccommodations();
    }, []);
  
    useEffect(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const { q } = params;
      setSearchQuery(q);
    }, []);
  
    useEffect(() => {
      if (searchQuery) {
        const filtered = accommodations.filter((accommodation) =>
          accommodation.accName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAccommodations(filtered);
      } else {
        setFilteredAccommodations(accommodations);
      }
    }, [accommodations, searchQuery]);
  
    const handleViewClick = (accommodationId) => {
      const accommodation = accommodations.find((item) => item.id === accommodationId);
      console.log('View clicked:', accommodation);
      // Redirect to the page displaying the specific listing
      window.location.href = `/display-listing/${accommodationId}`;
    };
  
    return (
      <>
        <Admin_Searchbar
          className="searchbar-component"
          setFilteredAccommodations={setFilteredAccommodations}
          accommodations={accommodations}
        />
  
        <Admin_Headline isLoaded={isLoaded} type={type} />
  
        {/*Add codes such that while the page is loading after the user inputs their search query, "No results found. Please try a different search query." won't be displayed.*/}
        {searchQuery && filteredAccommodations.length === 0 ? (
          <p>No results found. Please try a different search query.</p>
        ) : (
          filteredAccommodations.map((accommodation) => (
            <div key={accommodation.id} className="listing-section">
              <div className="listing-img">
                <img src={accommodation.photos[0]} alt={accommodation.name} />
              </div>
              <div className="listing-left">
                <div className="type">
                  <h6>{accommodation.accType}</h6>
                </div>
                <div className="name-address">
                  <div className="name">
                    <h2>{accommodation.accName}</h2>
                  </div>
                  <div className="address">
                    <h6>{accommodation.accAddress}</h6>
                  </div>
                </div>
                <div className="more-info">
                  <div className="no-of-occupants">
                    <h6>{accommodation.occupants} persons per room</h6>
                  </div>
                  <div className="amenity">
                    <h6>{accommodation.amenities.join(', ')}</h6>
                  </div>
                  <div className="establishment">
                    <h6>{accommodation.nearby.join(', ')}</h6>
                  </div>
                </div>
              </div>
              <div className="listing-right">
                <div className="fee-section">
                  <div className="currency">
                    <h6>PHP</h6>
                  </div>
                  <div className="fee">
                    <h2>{accommodation.roomFee}</h2>
                  </div>
                </div>
                <div className="view-button">
                  <button onClick={() => handleViewClick(accommodation.id)}>View</button>
                </div>
              </div>
            </div>
          ))
        )}
      </>
    );
}

export default Admin_Listing;
