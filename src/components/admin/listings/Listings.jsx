import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../../../firebase';

const Listings = () => {
  // State variable to store the accommodations data
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    // Fetch accommodations data from Firestore when the component mounts
    const fetchAccommodations = async () => {
      try {
        // Reference to the 'accommodations' collection in Firestore
        const accommodationsCollectionRef = collection(db, 'accommodations');

        // Create a Firestore query to order accommodations by 'editedAt' field in descending order and limit the results to 3
        const q = query(
          accommodationsCollectionRef,
          orderBy('editedAt', 'desc'),
          limit(3)
        );

        // Fetch accommodations data from Firestore using the query
        const accommodationsSnapshot = await getDocs(q);

        // Extract the accommodation data from the snapshot and map it to a new array
        const accommodationsData = accommodationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the accommodations data in the component state
        setAccommodations(accommodationsData);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    // Call the fetchAccommodations function
    fetchAccommodations();
  }, []);

  // Event handler for clicking on a listing card
  const handleCardClick = (accommodationId) => {
    // Find the accommodation object with the matching ID
    const accommodation = accommodations.find(
      (item) => item.id === accommodationId
    );

    // Log the clicked accommodation object
    console.log("View clicked:", accommodation);

    // Redirect to the page displaying the specific listing
    window.location.href = `/display-listing/${accommodationId}`;
  };

  // Event handler for clicking on the Explore button
  const handleExploreClick = () => {
    // Redirect to the admin explore page
    window.location.href = "/admin-explore";
  }

  return (
    <>
      <div className="listing container">
        <div className="listing-h2">
          <h2 className="option-h2">See current listings</h2>
        </div>

        <div className="listing-row">
          {/* Map over the accommodations array and render a listing card for each accommodation */}
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="listing-card"
              onClick={() => handleCardClick(accommodation.id)}
            >
              <div className="card-img">
                {/* Render the first photo of the accommodation if available */}
                {accommodation.photos && accommodation.photos.length > 0 && (
                  <img src={accommodation.photos[0]} alt={accommodation.accName} />
                )}
              </div>
              <div className="card-text">
                <h4 className="accommodation-name">{accommodation.accName}</h4>
                <h4 className="accommodation-price">PHP {Number(accommodation.roomFee).toLocaleString('en-US')}</h4>
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
          {/* Button to explore more listings */}
          <button onClick={handleExploreClick}>Explore</button>
        </div>
      </div>
    </>
  );
};

export default Listings;
