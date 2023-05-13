import React, { useEffect } from "react";
import "./crud.scss";
import { HiPlus } from "react-icons/hi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const CRUD = () => {
  const getAllAccommodations = async () => {
    const accommodationsCollectionRef = collection(db, "accommodations");
    const accommodationsSnapshot = await getDocs(accommodationsCollectionRef);
    const accommodations = accommodationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return accommodations;
  };

  useEffect(() => {
    const getAccommodations = async () => {
      const accommodations = await getAllAccommodations();
      console.log(accommodations);
    };
    getAccommodations();
  }, []);
  return (
    <>
      <div className="crud-wrapper container">
        <h2 className="directory-text">My Directory</h2>
        <div className="search-add">
          <input type="text" placeholder="Search by name"></input>
          <button className="search-btn button">
            <a href="/">Search</a>
          </button>
          <button className="add-btn button">
            <a href="/page1"> + Add New Listing</a>
          </button>
        </div>
        <div className="crud-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CRUD;
