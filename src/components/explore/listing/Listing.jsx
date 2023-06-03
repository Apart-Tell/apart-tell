import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import Searchbar from '../searchbar/Searchbar';
import Headline from '../headline/Headline';
import './listing.scss';

const Listing = ({ isLoaded, type, filterValues }) => {
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

  // Fetches the accommodations data during initial render
  // using the getAllAccommodations() function
  useEffect(() => {
    getAllAccommodations();
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { q } = params;
    setSearchQuery(q);
  }, []);

  // Triggered whenever accommodations or searchQuery changes
  // It filters the accommodations based on the search query
  // and updates the filteredAccommodations state variable
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


  // Applies the filters based on the selected checkboxes,
  // and inputted numbers
  useEffect(() => {
    const applyFilters = () => {
      let updatedAccommodations = accommodations;

      // Apply checkbox filters
    const { checkboxes } = filterValues || {}; // Add null check here
    if (checkboxes) {
      Object.entries(checkboxes).forEach(([key, value]) => {
        if (value) {
          updatedAccommodations = updatedAccommodations.filter(
            (accommodation) => accommodation[key] === value
          );
        }
      });
    }

    // Apply fee (per room) filter
    const { rentalFeeRoom } = filterValues || {}; // Add null check here
    if (rentalFeeRoom) {
      Object.entries(rentalFeeRoom).forEach(([key, value]) => {
        if (parseInt(value) > 0) {
          updatedAccommodations = updatedAccommodations.filter(
            (accommodation) => parseInt(accommodation.roomFee) <= parseInt(value)
          );
        }
        console.log("Key is: " + key);
        console.log("Value is: " + value);
      });
    }

    // Apply fee (per head) filter
    const { rentalFeeHead } = filterValues || {}; // Add null check here
    if (rentalFeeHead) {
      Object.entries(rentalFeeHead).forEach(([key, value]) => {
        if (parseInt(value) > 0) {
          updatedAccommodations = updatedAccommodations.filter(
            (accommodation) => parseInt(accommodation.headFee) <= parseInt(value)
          );
        }
        console.log("Key is: " + key);
        console.log("Value is: " + value);
      });
    }

    // Apply accommodation type filter
    const { selectedOption } = filterValues || {}; // Add null check here
    if (selectedOption && selectedOption !== 'Select a type') {
      updatedAccommodations = updatedAccommodations.filter(
        (accommodation) => accommodation.accType === selectedOption
      );
    }
      setFilteredAccommodations(updatedAccommodations);
      console.log("Updated accommodations here: " + updatedAccommodations);
    };

    applyFilters();
  }, [filterValues, accommodations]);

  const handleViewClick = (accommodationId) => {
      const accommodation = accommodations.find(
          (item) => item.id === accommodationId
      );
      console.log("View clicked:", accommodation);
      // Redirect to the page displaying the specific listing
      window.location.href = `/user-display-listing/${accommodationId}`;
  };

  return (
    <>
      <Searchbar
        className="searchbar-component"
        setFilteredAccommodations={setFilteredAccommodations}
        accommodations={accommodations}
      />

      <Headline isLoaded={isLoaded} type={type} />

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
};

export default Listing;
