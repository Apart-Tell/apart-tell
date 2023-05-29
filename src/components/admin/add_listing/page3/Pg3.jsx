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
  // handles rental fee/room data
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

  const currentUser = auth.currentUser;
  const [existingDocId, setExistingDocId] = useState(null);

  useEffect(() => {
    const checkExistingDoc = async () => {
      const q = query(
        collection(db, "accommodations"),
        where("progress", "==", 2),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const firstDoc = querySnapshot.docs[0].id;
        setExistingDocId(firstDoc);
        console.log("exists");
      } else {
        setExistingDocId(null);
        console.log("doesNot");
      }
    };
    checkExistingDoc();
    console.log("checking");
    console.log(existingDocId);
  });

  const handleInputChange = (event) => {
    const { id, type, value, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
    console.log(id, value);
  };

  // handles "prev" button
  const handlePrevClick = () => {
    const confirmation = window.confirm(
      "Are you sure you want to go back? Any unsaved changes on this page will be lost."
    );

    if (confirmation) {
      sessionStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "/page2";
    }
  };

  // form validation: checks whether all input fields are filled out before letting the user be redirected to the next page
  const handleNextClick = async (event) => {
    event.preventDefault();
    if (!formData.roomFee) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (formData.electricityChecked && !formData.electricityFee) {
      alert("Please fill in the electricity fee.");
      return;
    }
    if (formData.waterChecked && !formData.waterFee) {
      alert("Please fill in the water fee.");
      return;
    }
    if (formData.depositChecked && !formData.depositFee) {
      alert("Please fill in the deposit fee.");
      return;
    } else if (existingDocId != null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 3,
        },
        { merge: true }
      );
      console.log("document updated: ", accRef.id);
      // Save form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "/page4";
      alert("Success! Your information on this page has been saved.");
    }
    //  const currentUser=auth.currentUser;
    //  const accRef=doc(collection(db, "accommodations"), currentUser.uid);
    //  await updateDoc(accRef, {
    //    ...formData,
    //    progress: 3,
    //  })
    //   .then(() => {
    //   })
    //   .catch((error) => {
    //     console.error("Error adding document: ", error);
    //   });
  };

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
