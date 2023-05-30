import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../../../firebase';

const Listings = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const accommodationsCollectionRef = collection(db, 'accommodations');
        const q = query(
          accommodationsCollectionRef,
          orderBy('editedAt', 'desc'),
          limit(3)
        );
        const accommodationsSnapshot = await getDocs(q);
        const accommodationsData = accommodationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccommodations(accommodationsData);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleCardClick = (accommodationId) => {
    const accommodation = accommodations.find(
      (item) => item.id === accommodationId
    );
    console.log("View clicked:", accommodation);
    // Redirect to the page displaying the specific listing
    window.location.href = `/display-listing/${accommodationId}`;
  };

  const handleExploreClick = () => {
    window.location.href = "/admin-explore";
  }

  return (
    <>
      <div className="listing container">
        <div className="listing-h2">
          <h2 className="option-h2">See current listings</h2>
        </div>

        <div className="listing-row">
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="listing-card"
              onClick={() => handleCardClick(accommodation.id)}
            >
              <div className="card-img">
                {accommodation.photos && accommodation.photos.length > 0 && (
                  <img src={accommodation.photos[0]} alt={accommodation.accName} />
                )}
              </div>
              <div className="card-text">
                <h4 className="accommodation-name">{accommodation.accName}</h4>
                <h4 className="accommodation-price">PHP {accommodation.roomFee}</h4>
              </div>
              <div className="card-text">
                <h5 className="accommodation-occupants">
                  {accommodation.occupants} persons per room
                </h5>
                <h5 className="accommodation-amenities">
                  {accommodation.amenities.join(', ')}
                </h5>
              </div>
            </div>
          ))}
        </div>

        <div className="explore-btn">
          <button onClick={handleExploreClick}>Explore</button>
        </div>
      </div>
    </>
  );
};

export default Listings;
