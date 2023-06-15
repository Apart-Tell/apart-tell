import React, { useEffect, useState } from "react";
import "./crud.scss"; // Importing the styling for the component
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore"; // Importing necessary Firestore functions for CRUD operations
import { db, auth } from "../../../firebase"; // Importing the Firestore database and authentication

const CRUD = () => {
  const [accommodations, setAccommodations] = useState([]); // State variable for storing accommodations
  const [searchQuery, setSearchQuery] = useState(""); // State variable for storing search query
  const [searchResults, setSearchResults] = useState([]); // State variable for storing search results
  const [noResults, setNoResults] = useState(false); // State variable for indicating if there are no search results
  const currentUser = auth.currentUser; // Get the currently authenticated user

  const getAllAccommodations = async () => {
    const accommodationsCollectionRef = collection(db, "accommodations"); // Reference to the "accommodations" collection
    const q = query(
      accommodationsCollectionRef,
      where("progress", "==", 4), // Filtering the accommodations where progress is 4
      orderBy("editedAt", "desc") // Sorting the accommodations by editedAt timestamp in descending order
    );
    const accommodationsSnapshot = await getDocs(q); // Get the documents from the query
    const accommodationsData = accommodationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })); // Transform the document data into an array of objects
    setAccommodations(accommodationsData); // Set the accommodations state with the fetched data
  };

  useEffect(() => {
    getAllAccommodations(); // Fetch all accommodations when the component mounts
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state on input change
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim(); // Normalize and trim the search query
    if (query === "") {
      // Display an alert message if the search query is empty
      alert('Please enter a search query.');
      return;
    }
    const filteredAccommodations = accommodations.filter((accommodation) =>
      accommodation.accName.toLowerCase().includes(query)
    ); // Filter the accommodations based on the search query
    setSearchResults(filteredAccommodations); // Set the search results
    setNoResults(filteredAccommodations.length === 0); // Set the noResults flag based on the search results
  };

  const handleViewClick = (accommodationId) => {
    const accommodation = accommodations.find(
      (item) => item.id === accommodationId
    ); // Find the clicked accommodation by its ID
    console.log("View clicked:", accommodation);
    // Redirect to the page displaying the specific listing
    window.location.href = `/display-listing/${accommodationId}`;
  };

  const handleDeleteClick = async (accommodationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    ); // Prompt the user for confirmation
  
    if (confirmed) {
      const email = prompt("Please enter your email:"); // Prompt the user for their email
      if (email == currentUser.email) {
        await deleteDoc(doc(db, "accommodations", accommodationId)); // Delete the accommodation document from Firestore
        setAccommodations((prevAccommodations) =>
          prevAccommodations.filter((item) => item.id !== accommodationId)
        ); // Update the accommodations state by removing the deleted accommodationS
        console.log("Delete clicked:", accommodationId);
        alert("The selected listing has been deleted!");
      } else {
        console.log("Deletion cancelled");
        alert("Incorrect e-mail! Please try again.");
      }
    } else {
      alert("Deletion cancelled!");
      console.log("Cancelled");
    }
  };
  

  const handleUpdateClick = async (accommodationId) => {
     // Redirect to the page where the listing data is displayed and editable
    window.location.href = `/user/edit-listing/${accommodationId}`; // Redirect to page1
  };

  const isUserAuthorized = (accommodation) => {
    return accommodation.editedBy === currentUser.uid; // Check if the current user is authorized to edit the accommodation
  };

  return (
    <>
      <div className="crud-wrapper container">
        <h2 className="directory-text">Directory</h2>
        <form className="search-add" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className="search-btn button">
            <a>Search</a>
          </button>
          <button className="add-btn button">
            <a href="/page1"> + Add New Listing</a>
          </button>
        </form>
        <div className="crud-table">
          {noResults ? (
            <p className="no-result-style">
              We couldn't find any listings that match your search.
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length > 0 ? (
                  searchResults.map((accommodation) => (
                    <tr key={accommodation.id}>
                      <td>{accommodation.accName}</td>
                      <td className="address-cell">
                        {accommodation.accAddress}
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewClick(accommodation.id)}
                          className="view-btn"
                        >
                          <a>View</a>
                        </button>
                        {isUserAuthorized(accommodation) && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateClick(accommodation.id)
                              }
                              className="edit-btn"
                            >
                              <a>Edit</a>
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(accommodation.id)
                              }
                              className="delete-btn"
                            >
                              <a>Delete</a>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  accommodations.map((accommodation) => (
                    <tr key={accommodation.id}>
                      <td>{accommodation.accName}</td>
                      <td className="address-cell">
                        {accommodation.accAddress}
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewClick(accommodation.id)}
                          className="view-btn"
                        >
                          <a>View</a>
                        </button>
                        {isUserAuthorized(accommodation) && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateClick(accommodation.id)
                              }
                              className="edit-btn"
                            >
                              <a>Edit</a>
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(accommodation.id)
                              }
                              className="delete-btn"
                            >
                              <a>Delete</a>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CRUD;
