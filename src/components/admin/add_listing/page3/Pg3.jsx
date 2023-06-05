import React from "react";
import { useState, useEffect } from "react";
import "./pg3.scss";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  where,
  query,
  limit,
} from "firebase/firestore";
import { db, auth } from "../../../../firebase";

const Pg3 = () => {
  // State variables
  const [formData, setFormData] = useState({
    roomFee: "",
    headFee: "",
    electricityChecked: false,
    electricityFee: "",
    waterChecked: false,
    waterFee: "",
    depositChecked: false,
    depositFee: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [existingDocId, setExistingDocId] = useState(null);
  const currentUser = auth.currentUser;
 
  useEffect(() => {
    // Define an asynchronous function to check if there is an existing document
    const checkExistingDoc = async () => {
      // Create a query to fetch documents from the "accommodations" collection where the "progress" field is equal to 2, limited to 1 document
      const q = query(
        collection(db, "accommodations"),
        where("progress", "==", 2),
        limit(1)
      );
      // Execute the query and retrieve the query snapshot
      const querySnapshot = await getDocs(q);
      // Check if the query snapshot contains any documents
      if (querySnapshot.size > 0) {
        // Get the ID of the first document in the query snapshot
        const firstDoc = querySnapshot.docs[0].id;
        // Set the existingDocId state with the ID of the document
        setExistingDocId(firstDoc);
        console.log("exists");
      } else {
        // If there are no documents in the query snapshot, set existingDocId state to null
        setExistingDocId(null);
        console.log("doesNot");
      }
    };
    // Call the checkExistingDoc function
    checkExistingDoc();
    // Log a message to indicate that the checking is being performed
    console.log("checking");
    // Log the value of existingDocId
    console.log(existingDocId);
  });
  

  const handleInputChange = (event) => {
    // Destructure properties from the event target object
    const { id, type, value, checked } = event.target;
    
    // Update the form data state using the setFormData function
    setFormData((prevState) => ({
      // Spread the previous form data state
      ...prevState,
      // Update the specific field based on the event target's ID
      [id]: type === "checkbox" ? checked : value,
    }));
    
    // Output the ID and value of the input field to the console
    console.log(id, value);
  };  

  // handles "prev" button
  const handlePrevClick = () => {
    // Display a confirmation dialog box to the user
    const confirmation = window.confirm(
      "Are you sure you want to go back? Any unsaved changes on this page will be lost."
    );
  
    // If the user confirms, execute the following code
    if (confirmation) {
      // Store the form data in the session storage as a JSON string
      sessionStorage.setItem("formData", JSON.stringify(formData));
  
      // Redirect the user to "/page2"
      window.location.href = "/page2";
    }
  };
  

  // form validation: checks whether all input fields are filled out before letting the user be redirected to the next page
  const handleNextClick = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Check if the room fee is not filled
    if (!formData.roomFee) {
      // Display an alert to prompt the user to fill in all the required fields
      alert("Please fill in all the required fields.");
      return;
    }
  
    // Check if electricity fee is required and not filled
    if (formData.electricityChecked && !formData.electricityFee) {
      alert("Please fill in the electricity fee.");
      return;
    }
  
    // Check if water fee is required and not filled
    if (formData.waterChecked && !formData.waterFee) {
      alert("Please fill in the water fee.");
      return;
    }
  
    // Check if deposit fee is required and not filled
    if (formData.depositChecked && !formData.depositFee) {
      alert("Please fill in the deposit fee.");
      return;
    }
  
    // If all the required fields are filled and the existing document ID is not null
    else if (existingDocId != null) {
      // Create a reference to the existing document in the "accommodations" collection
      const accRef = doc(collection(db, "accommodations"), existingDocId);
  
      // Update the document with the form data and set the progress to 3
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 3,
        },
        { merge: true }
      );
  
      console.log("document updated: ", accRef.id);
  
      // Save the form data to local storage as a JSON string
      localStorage.setItem("formData", JSON.stringify(formData));
  
      // Redirect the user to "/page4"
      window.location.href = "/page4";
  
      // Display an alert to inform the user that the information on this page has been saved successfully
      alert("Success! Your information on this page has been saved.");
    }
  };  

  // JSX structure and elements
  return (
    <>
      <div className="wrapper container">
        <h2>Add New Listing</h2>
        <form className="bdetails-wrapper">
          <h3>Billing Details</h3>
          <hr className="hr-style-pg3" />
          <div>
            <br />
            <br />
            <label htmlFor="rental-fee-room">RENTAL FEE (per room)*</label>
            <input
              type="number"
              id="roomFee"
              title="Please enter a valid numerical currency amount"
              step="0.01"
              min="0"
              max="9999999.99"
              placeholder="ex. 1000.00"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="rental-fee-head">RENTAL FEE (per head)</label>
            <input
              type="number"
              id="headFee"
              step="0.01"
              min="0"
              max="9999999.99"
              placeholder="ex. 1000.00"
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <br />
            <div>
              <label>ADDITIONAL FEES</label>
              <br />
              <div>
                <label htmlFor="electricity">
                  <input
                    type="checkbox"
                    id="electricityChecked"
                    checked={formData.electricityChecked}
                    onChange={handleInputChange}
                  />
                  Electricity
                </label>
                {formData.electricityChecked && (
                  <input
                    type="number"
                    placeholder="Enter electricity fee (per month)"
                    step="0.01"
                    min="0"
                    max="9999999.99"
                    title="Please enter a valid numerical currency amount"
                    id="electricityFee"
                    onChange={handleInputChange}
                  />
                )}
                <label htmlFor="water">
                  <br />
                  <input
                    type="checkbox"
                    id="waterChecked"
                    checked={formData.waterChecked}
                    onChange={handleInputChange}
                  />
                  Water
                </label>
                {formData.waterChecked && (
                  <input
                    type="number"
                    placeholder="Enter water fee (per month)"
                    step="0.01"
                    min="0"
                    max="9999999.99"
                    title="Please enter a valid numerical currency amount"
                    id="waterFee"
                    onChange={handleInputChange}
                  />
                )}
                <label htmlFor="deposit">
                  <br />
                  <input
                    type="checkbox"
                    id="depositChecked"
                    onChange={handleInputChange}
                    checked={formData.depositChecked}
                  />
                  Deposit
                </label>
                {formData.depositChecked && (
                  <input
                    type="number"
                    placeholder="Enter deposit fee"
                    step="0.01"
                    min="0"
                    max="9999999.99"
                    title="Please enter a valid numerical currency amount"
                    id="depositFee"
                    onChange={handleInputChange}
                  />
                )}
              </div>
            </div>
          </div>
          <button type="button" className="prev-btn" onClick={handlePrevClick}>
            <a>Prev</a>
          </button>
          <button type="button" className="next-btn" onClick={handleNextClick}>
            <a>Next</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default Pg3;
