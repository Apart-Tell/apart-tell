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

const Admin_Listing = ({ isLoaded, type, filterValues }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const accommodationsCount = filteredAccommodations.length;

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


  // Applies the filters based on the checkbox selections, type,
  // and inputted numbers
  useEffect(() => {
    const applyFilters = () => {
      let updatedAccommodations = accommodations;

      // Apply search query filter
      if (searchQuery) {
        updatedAccommodations = updatedAccommodations.filter((accommodation) =>
          accommodation.accName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply accommodation type filter
      const { selectedOption } = filterValues || {}; // Null check here
      if (selectedOption && selectedOption !== 'Select a type') {
        updatedAccommodations = updatedAccommodations.filter(
          (accommodation) => accommodation.accType === selectedOption
        );
      }

      // Apply fee (per room) filter
      const { rentalFeeRoom } = filterValues || {};
      if (rentalFeeRoom) {
        Object.entries(rentalFeeRoom).forEach(([key, value]) => {
          if (parseInt(value) > 0) {
            updatedAccommodations = updatedAccommodations.filter(
              (accommodation) => parseInt(accommodation.roomFee) <= parseInt(value)
            );
          }
        });
      }

      // Apply fee (per head) filter
      const { rentalFeeHead } = filterValues || {};
      if (rentalFeeHead) {
        Object.entries(rentalFeeHead).forEach(([key, value]) => {
          if (parseInt(value) > 0) {
            updatedAccommodations = updatedAccommodations.filter(
              (accommodation) => parseInt(accommodation.headFee) <= parseInt(value)
            );
          }
        });
      }

      // Apply amenities filters
      const { amenities } = filterValues || {};
      if (amenities) {
        Object.entries(amenities).forEach(([key, value]) => {
          if (value) {
            updatedAccommodations = updatedAccommodations.filter(
              (accommodation) => accommodation.amenities.includes(key)
            );
          }
        });
      }

      // Apply cr type filters
      const { crType } = filterValues || {};
      if (crType) {
        Object.entries(crType).forEach(([key, value]) => {
          if (value) {
            updatedAccommodations = updatedAccommodations.filter(
              (accommodation) => accommodation.crType === key
            );
          }
        });
      }

      // Apply num of occupants filter
      const { occupants } = filterValues || {};
      if (occupants) {
        Object.entries(occupants).forEach(([key, value]) => {
          if (parseInt(value) > 0) {
            updatedAccommodations = updatedAccommodations.filter(
              (accommodation) => parseInt(accommodation.occupants) == parseInt(value)
            );
          }
        });
      }

      // Apply nearby filters
      const { nearby } = filterValues || {};
      if (nearby) {
        Object.entries(nearby).forEach(([key, value]) => {
          if (value) {
            updatedAccommodations = updatedAccommodations.filter(
              (accommodation) => accommodation.nearby.includes(key)
            );
          }
        });
      }

      // Apply additional fee filters
      const { additional } = filterValues || {};
      if (additional) {
        updatedAccommodations = updatedAccommodations.filter((accommodation) => {
          let shouldInclude = true;
          Object.entries(additional).forEach(([key, value]) => {
            if (value && accommodation[key]) {
              shouldInclude = false;
            }
          });
          return shouldInclude;
        });
      }

      setFilteredAccommodations(updatedAccommodations);
    };

    applyFilters();
  }, [filterValues, accommodations, searchQuery]);

  const handleViewClick = (accommodationId) => {
      const accommodation = accommodations.find(
          (item) => item.id === accommodationId
      );
      console.log("View clicked:", accommodation);
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

      <Admin_Headline isLoaded={isLoaded} type={type} accommodationsCount={accommodationsCount} />

      {/*Add codes such that while the page is loading after the user inputs their search query, "No results found. Please try a different search query." won't be displayed.*/}
      {searchQuery && filteredAccommodations.length === 0 ? (
        <p>No results found. Please try a different search query.</p>
      ) : (
        filteredAccommodations.map((accommodation) => (
          <div key={accommodation.id} className="listing-section">
            <div className={`listing-img ${accommodation.photos.length == 0 ? 'no-photos' : ''}`}>
            {accommodation.photos?.[0] && <img src={accommodation.photos[0]} alt={accommodation.name} />}
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
                  <h2>{Number(accommodation.roomFee).toLocaleString('en-US')}</h2>
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

export default Admin_Listing;
