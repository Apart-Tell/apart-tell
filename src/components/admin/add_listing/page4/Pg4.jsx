import React from "react";
import { useState, useEffect } from "react";
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
  // handles owner name data

  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    caretakerName: "",
    caretakerPhone: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  // handles submit button

  const currentuser = auth.currentUser;
  const [existingDocId, setExistingDocId] = useState(null);

  useEffect(() => {
    const checkExistingDoc = async () => {
      const q = query(
        collection(db, "accommodations"),
        where("progress", "==", 3),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const firstDoc = querySnapshot.docs[0].id;
        setExistingDocId(firstDoc);
        console.log("exists");
      } else {
        setExistingDocId(null);
        console.log("doesnot");
      }
    };
    checkExistingDoc();
    console.log("checking");
    console.log(existingDocId);
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
  
    // Check if the entered value is numerical
    const isNumerical = /^\d*$/.test(value);

    // Update the inputErrors state for phone number fields
    if ((id === "ownerPhone" || id === "caretakerPhone") && !isNumerical && value !== "") {
      e.target.value = ""; // Clear the input field
      alert("Please enter only numerical digits for the phone number.");
      return; // Exit early if the input is not a numerical digit
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    console.log(id, value);
    validateForm();
  };
  

  const validateForm = () => {
    const inputs = document.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    if (!isFormValid) {
      alert("Please fill in all the required fields.");
      e.preventDefault();
    } else if (existingDocId != null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 4,
        },
        { merge: true }
      );
      console.log("success");
      alert("Success! Your information on this page has been saved. Redirecting you to My Directory page.");
      window.location.href = "/user/directory";
    }
    // const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    // await updateDoc(accRef, {
    //  ...formData,
    //  progress: 4,

  };

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
            <label htmlFor="owner-phonenum" required>
              OWNER'S PHONE NUMBER*
            </label>
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
            ></input>
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
            <label htmlFor="caretaker-phonenum">
              CARETAKER'S PHONE NUMBER
            </label>
            <input
              type="tel"
              id="caretakerPhone"
              pattern="\d{11}"
              title="Please enter a valid Philippine phone number (11 digits, starting with '09')"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="button" className="prev-btn">
            <a href="/page3">Prev</a>
          </button>
          <button type="button" onClick={handleSubmit}>
            <a>Submit</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default Pg4;
