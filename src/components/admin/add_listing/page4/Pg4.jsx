import React, { useState, useEffect } from "react";
import "./pg4.scss";
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

const Pg4 = () => {
  // State variables
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    caretakerName: "",
    caretakerPhone: "",
  });

  const [emailError, setEmailError] = useState("");
  const [existingDocId, setExistingDocId] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const currentuser = auth.currentUser;
  
  useEffect(() => {
    // Declare an asynchronous function checkExistingDoc
    const checkExistingDoc = async () => {
      // Define a Firestore query to check for an existing document with progress equal to 3
      const q = query(
        collection(db, "accommodations"),
        where("progress", "==", 3),
        limit(1)
      );
  
      // Execute the query and retrieve the query snapshot
      const querySnapshot = await getDocs(q);
      // Check if the query snapshot has at least one document
      if (querySnapshot.size > 0) {
        // Get the ID of the first document in the query snapshot
        const firstDoc = querySnapshot.docs[0].id;
        // Set the existingDocId state with the ID of the existing document
        setExistingDocId(firstDoc);
        // Log a message indicating that an existing document exists
        console.log("exists");
      } else {
        // If no existing document is found, set existingDocId state to null
        setExistingDocId(null);
        // Log a message indicating that no existing document exists
        console.log("doesnot");
      }
    };
    // Call the checkExistingDoc function
    checkExistingDoc();
    // Log a message indicating that the check is being performed
    console.log("checking");
    // Log the value of existingDocId
    console.log(existingDocId);
  }, []);
  
  const handleInputChange = (e) => {
    // Destructure the id and value properties from the event target
    const { id, value } = e.target;
  
    // Check if the input field corresponds to ownerPhone or caretakerPhone
    if (id === "ownerPhone" || id === "caretakerPhone") {
      // Remove non-digit characters from the entered value
      const phoneNumber = value.replace(/\D/g, "");
  
      // Check if the phone number exceeds 11 digits
      if (phoneNumber.length > 11) {
        // If it exceeds, truncate the value to 11 digits
        e.target.value = phoneNumber.slice(0, 11);
      } else {
        // If it doesn't exceed, assign the modified phone number value
        e.target.value = phoneNumber;
      }
    }
  
    // Check if the input field corresponds to ownerEmail
    if (id === "ownerEmail") {
      // Define a regular expression pattern for validating email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      // Check if the value exists and does not match the email pattern
      if (value && !emailPattern.test(value)) {
        // If it doesn't match, set the email error message
        setEmailError("Please enter a valid email address!");
      } else {
        // If it matches or no value exists, clear the email error message
        setEmailError("");
      }
    }
  
    // Update the form data state by merging the new value for the corresponding id
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  
    // Validate the form after handling the input change
    validateForm();
  };

  const handlePrevClick = () => {
    // Display a confirmation dialog box to the user with a warning message
    const confirmation = window.confirm(
      "Are you sure you want to go back? Any unsaved changes on this page will be lost."
    );
  
    // Check if the user confirmed the navigation
    if (confirmation) {
      // Store the form data in the session storage as a serialized JSON string
      sessionStorage.setItem("formData", JSON.stringify(formData));
  
      // Redirect the user to "/page3" (presumably the previous page)
      window.location.href = "/page3";
    }
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
  
    // Check if required fields are empty
    if (!formData.ownerName || !formData.ownerPhone) {
      // Display an alert to the user indicating that they need to fill in the required fields
      alert("Please fill in all the required fields.");
      return;
    }
  
    // Check if an existing document ID exists
    if (existingDocId != null) {
      // Get a reference to the document in the "accommodations" collection using the existing document ID
      const accRef = doc(collection(db, "accommodations"), existingDocId);
  
      // Update the document with the form data and set the progress to 4
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 4,
        },
        { merge: true }
      );
  
      // Log a success message to the console
      console.log("success");
      // Store the form data in the local storage as a serialized JSON string
      localStorage.setItem("formData", JSON.stringify(formData));
      // Display a success message to the user
      alert("Success! Your information on this page has been saved. Redirecting you to the Directory page.");
      // Redirect the user to the "/user/directory" URL
      window.location.href = "/user/directory";
    }
  };
  
  // JSX structure and elements
  return (
    <>
      <div className="pg4-wrapper container">
        <h2>Add New Listing</h2>
        <form>
          <h3 className="details-txt">Management Details</h3>
          <hr className="hr-style-pg4" />
          <div>
            <label htmlFor="owner-name">OWNER'S NAME*</label>
            <input
              type="text"
              id="ownerName"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="owner-phonenum">OWNER'S PHONE NUMBER*</label>
            <input
              type="tel"
              id="ownerPhone"
              pattern="\d{11}"
              title="Please enter a valid Philippine phone number (11 digits, starting with '09')"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="owner-email">OWNER'S E-MAIL</label>
            <input
              type="email"
              id="ownerEmail"
              title="Please enter a valid e-mail"
              onChange={handleInputChange}
              value={formData.ownerEmail}
            ></input>
            {emailError && <span className="error-message">{emailError}</span>}
          </div>
          <br />
          <div>
            <label htmlFor="caretaker-name">CARETAKER'S NAME</label>
            <input
              type="text"
              id="caretakerName"
              onChange={handleInputChange}
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="caretaker-phonenum">CARETAKER'S PHONE NUMBER</label>
            <input
              type="tel"
              id="caretakerPhone"
              pattern="\d{11}"
              title="Please enter a valid Philippine phone number (11 digits, starting with '09')"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="button" className="prev-btn" onClick={handlePrevClick}>
            <a>Prev</a>
          </button>
          <button type="submit" onClick={handleSubmit}>
            <a>Submit</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default Pg4;
