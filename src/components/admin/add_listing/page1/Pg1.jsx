import React from "react";
import { useState, useEffect } from "react";
import "./pg1.scss";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  limit,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";

const Pg1 = () => {
  // handles all the data on this page
  const [formData, setFormData] = useState({
    accName: "",
    accAddress: "",
    accType: "",
    accDescription: "",
    accRules: "",
    amenities: [],
    nearby: [],
  });

  // handles input validation for the form
  const [isFormValid, setIsFormValid] = useState(false);
  const [existingDocId, setExistingDocId] = useState(null);
  const currentUser = auth.currentUser;
  
  useEffect(() => {
    // Define an asynchronous function to check if there is an existing document with progress less than 4 in the "accommodations" collection
    const checkExistingDoc = async () => {
      // Create a query to fetch documents from the "accommodations" collection where the progress is less than 4
      const q = query(
        collection(db, "accommodations"),
        where("progress", "<", 4),
        limit(1)
      );
      // Execute the query and retrieve the query snapshot
      const querySnapshot = await getDocs(q);
      // Check if there are documents in the query snapshot
      if (querySnapshot.size > 0) {
        // Retrieve the ID of the first document in the query snapshot
        const firstDoc = querySnapshot.docs[0].id;
        // Set the ID of the existing document to the retrieved ID
        setExistingDocId(firstDoc);
        console.log("exists");
      } else {
        // Set the ID of the existing document to null since no document was found
        setExistingDocId(null);
        console.log("does not");
      }
    };
    // Call the checkExistingDoc function
    checkExistingDoc();
    // Log messages to indicate the checking process
    console.log("checking");
    console.log(existingDocId);
  }, []);
  
  const handleInputChange = (e) => {
    // Destructure properties from the event target
    const { id, value, type, checked } = e.target;
    // Update the form data state based on the input change
    setFormData((prevFormData) => {
      if (type === "checkbox") {
        // Handle checkbox inputs
        if (checked) {
          // If checkbox is checked, add the value to the array of values for the given ID
          return {
            ...prevFormData,
            [id]: [...prevFormData[id], value],
          };
        } else {
          // If checkbox is unchecked, filter out the value from the array of values for the given ID
          return {
            ...prevFormData,
            [id]: prevFormData[id].filter((item) => item !== value),
          };
        }
      } else {
        // Handle other input types (text, select, etc.)
        // Set the value of the given ID to the updated value
        return {
          ...prevFormData,
          [id]: value,
        };
      }
    });
    // Call the validateForm function
    validateForm();
    // Log the ID and value of the changed input
    console.log(id, value);
  };
  

  // handles form validation (checks whether all the input fields are filled out)
  const validateForm = () => {
    // Select all required inputs (input, select, textarea) using a CSS selector
    const inputs = document.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    // Initialize a variable to track the validity of the form
    let isValid = true;
    // Iterate over each input element
    inputs.forEach((input) => {
      // If the input value is empty, set isValid to false
      if (!input.value) {
        isValid = false;
      }
    });
    // Update the state variable isFormValid with the validity status
    setIsFormValid(isValid);
  };
  
  // handles next button
  const handleNextClick = async (e) => {
    // Perform any additional validation if needed
    if (!isFormValid) {
      e.preventDefault();
      alert("Please fill in all the required fields.");
    } else if (existingDocId != null) {
      // If an existing document ID exists
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 1,
          editedBy: currentUser.uid,
          editedAt: serverTimestamp(),
        },
        { merge: true }
      );
      console.log("document created: ", accRef.id);
      // Save form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "/page2";
      alert("Success! Your information on this page has been saved.");
    } else {
      // If no existing document ID exists
      const docRef = collection(db, "accommodations");
      await setDoc(doc(docRef), {
        ...formData,
        editedBy: currentUser.uid,
        editedAt: serverTimestamp(),
        createdBy: currentUser.uid,
        progress: 1,
      });
      console.log("document successfully written");
      // Save form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "/page2";
      alert("Success! Your information on this page has been saved.");
    }
  };
  
  // JSX structure and elements
  return (
    <>
      <div className="wrapper container">
        <h2>Add New Listing</h2>
        <div className="form-wrapper">
          <form>

            <div className="h3-wrapper">
              <h3 className="acc-details-txt">General Accommodation Details</h3>
              <hr className="hr-style" />
            </div>

            <br/>

            <div>
              <label htmlFor="accName">NAME*</label>
              <input
                type="text"
                id="accName"
                required
                onChange={handleInputChange}
              ></input>
            </div>

            <br/>

            <div>
              <label htmlFor="accAddress">ADDRESS*</label>
              <input
                type="text"
                id="accAddress"
                required
                onChange={handleInputChange}
              ></input>
            </div>

            <br/>

            <div>
              <label htmlFor="accType">TYPE*</label>
              <select
                id="accType"
                required
                onChange={handleInputChange}
                className="select-type"
              >
                <option value="" className="select-type">
                  Select a type
                </option>
                <option value="Apartment" className="select-type">
                  Apartment
                </option>
                <option value="Boarding house" className="select-type">
                  Boarding House
                </option>
                <option value="Dormitory" className="select-type">
                  Dormitory
                </option>
              </select>
            </div>

            <br/>

            <div>
              <label htmlFor="accDescription">DESCRIPTION*</label>
              <textarea
                id="accDescription"
                className="description-style"
                required
                onChange={handleInputChange}
                style={{ fontSize: 'medium' }}
              ></textarea>
            </div>

            <br/>

            <div>
              <label htmlFor="accRules">RULES & REGULATIONS*</label>
              <textarea
                id="accRules"
                className="rules-style"
                required
                onChange={handleInputChange}
                style={{ fontSize: 'medium' }}
              ></textarea>
            </div>

            <br/>

            <div>
              <label>AMENITIES*</label>
              <br />
              <div>
                <label htmlFor="amenities">
                  <input
                    type="checkbox"
                    id="amenities"
                    value="Wifi"
                    onChange={handleInputChange}
                    checked={formData.amenities.includes("Wifi")}
                  />
                  Wi-Fi
                </label>
                <label htmlFor="amenities">
                  <input
                    type="checkbox"
                    id="amenities"
                    value="Air Conditioning"
                    onChange={handleInputChange}
                    checked={formData.amenities.includes("Air Conditioning")}
                  />
                  Air Conditioning
                </label>
                <label htmlFor="amenities">
                  <input
                    type="checkbox"
                    id="amenities"
                    value="Laundry Area"
                    onChange={handleInputChange}
                    checked={formData.amenities.includes("Laundry Area")}
                  />
                  Laundry area
                </label>
                <label htmlFor="amenities">
                  <input
                    type="checkbox"
                    id="amenities"
                    value="Kitchen"
                    onChange={handleInputChange}
                    checked={formData.amenities.includes("Kitchen")}
                  />
                  Kitchen
                </label>
              </div>
            </div>

            <div>
              <label>NEARBY*</label>
              <div>
                <br />
                <label htmlFor="nearby">
                  <input
                    type="checkbox"
                    id="nearby"
                    value="Eatery"
                    onChange={handleInputChange}
                    checked={formData.nearby.includes("Eatery")}
                  />
                  Eatery/Restaurant
                </label>
                <label htmlFor="nearby">
                  <input
                    type="checkbox"
                    id="nearby"
                    value="Laundry Shop"
                    onChange={handleInputChange}
                    checked={formData.nearby.includes("Laundry Shop")}
                  />
                  Laundry shop
                </label>
                <label htmlFor="nearby">
                  <input
                    type="checkbox"
                    id="nearby"
                    value="Retail Store"
                    onChange={handleInputChange}
                    checked={formData.nearby.includes("Retail Store")}
                  />
                  Retail store
                </label>
                <label htmlFor="nearby">
                  <input
                    type="checkbox"
                    id="nearby"
                    value="Water Refill Station"
                    onChange={handleInputChange}
                    checked={formData.nearby.includes("Water Refill Station")}
                  />
                  Water refilling station
                </label>
                <label htmlFor="nearby">
                  <input
                    type="checkbox"
                    id="nearby"
                    value="Pharmacy"
                    onChange={handleInputChange}
                    checked={formData.nearby.includes("Pharmacy")}
                  />
                  Pharmacy
                </label>
              </div>
            </div>

            <button type="button" onClick={handleNextClick}>
              <a>Next</a>
            </button>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Pg1;