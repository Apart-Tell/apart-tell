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
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [id]: value,
      };
    });
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
    e.preventDefault();
    validateForm();
    if (!isFormValid) {
      alert("Please fill in all the required fields.");
    }
    if (existingDocId != null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 4,
        },
        { merge: true }
      );
    }
    // const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    // await updateDoc(accRef, {
    //  ...formData,
    //  progress: 4,

    console.log("success");
    window.location.href = "/user/directory";
  };
  return (
    <>
      <div className="pg4-wrapper container">
        <h2>Management details</h2>
        <form>
          <h3 className="details-txt">Management Details</h3>
          <hr className="hr-style-pg4" />
          <div>
            <label htmlFor="owner-name">Owner's name</label>
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
              Owner's phone number
            </label>
            <input
              type="tel"
              id="ownerPhone"
              pattern="[0-9]{11}"
              title="Please enter a valid phone number (ex. 091234568900)"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="owner-email">Owner's e-mail</label>
            <input
              type="text"
              id="ownerEmail"
              title="Please enter a valid e-mail"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="caretaker-name">Caretaker's name</label>
            <input
              type="text"
              id="caretakerName"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="caretaker-phonenum">
              CARETAKER'S PHONE NUMBER*
            </label>
            <input
              type="tel"
              id="caretakerPhone"
              pattern="[0-9]{11}"
              title="Please enter a valid phone number"
              onChange={handleInputChange}
              required
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
