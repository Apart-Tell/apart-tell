import React, { useEffect, useState } from "react";
import "./crud.scss";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";

const CRUD = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const currentUser = auth.currentUser;

  const getAllAccommodations = async () => {
    const accommodationsCollectionRef = collection(db, "accommodations");
    const q = query(
      accommodationsCollectionRef,
      where("progress", "==", 4),
      orderBy("editedAt", "desc")
    );
    const accommodationsSnapshot = await getDocs(q);
    const accommodationsData = accommodationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAccommodations(accommodationsData);
  };

  useEffect(() => {
    getAllAccommodations();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (query === "") {
      setSearchResults([]);
      setNoResults(false);
      return;
    }
    const filteredAccommodations = accommodations.filter((accommodation) =>
      accommodation.accName.toLowerCase().includes(query)
    );
    setSearchResults(filteredAccommodations);
    setNoResults(filteredAccommodations.length === 0);
  };

  const handleViewClick = (accommodationId) => {
    const accommodation = accommodations.find(
      (item) => item.id === accommodationId
    );
    console.log("View clicked:", accommodation);
    // Redirect to the page displaying the specific listing
    window.location.href = `/display-listing/${accommodationId}`;
  };

  const handleDeleteClick = async (accommodationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (confirmed) {
      await deleteDoc(doc(db, "accommodations", accommodationId));
      setAccommodations((prevAccommodations) =>
        prevAccommodations.filter((item) => item.id !== accommodationId)
      );
      console.log("Delete clicked:", accommodationId);
    } else {
      console.log("cancelled");
    }
  };

  const handleUpdateClick = async (accommodationId) => {
    const accommodationRef = doc(db, "accommodations", accommodationId);
    await updateDoc(accommodationRef, {
      editedBy: currentUser.uid,
      progress: 1,
    });
    console.log("update clicked: ", accommodationId);
    window.location.href = "/page1";
  };

  const isUserAuthorized = (accommodation) => {
    return accommodation.editedBy === currentUser.uid;
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
                {searchResults.length > 0
                  ? searchResults.map((accommodation) => (
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
                  : accommodations.map((accommodation) => (
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
                    ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CRUD;