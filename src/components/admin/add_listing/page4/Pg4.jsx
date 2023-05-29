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
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    caretakerName: "",
    caretakerPhone: "",
  });

  const [emailError, setEmailError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

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
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "ownerPhone" || id === "caretakerPhone") {
      const phoneNumber = value.replace(/\D/g, "");
      if (phoneNumber.length > 11) {
        e.target.value = phoneNumber.slice(0, 11);
      } else {
        e.target.value = phoneNumber;
      }
    }

    if (id === "ownerEmail") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailPattern.test(value)) {
        setEmailError("Please enter a valid email address!");
      } else {
        setEmailError("");
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    validateForm();
  };

  const handlePrevClick = () => {
    const confirmation = window.confirm(
      "Are you sure you want to go back? Any unsaved changes on this page will be lost."
    );
    if (confirmation) {
      sessionStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "/page3";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ownerName || !formData.ownerPhone) {
      alert("Please fill in all the required fields.");
      return;
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
      console.log("success");
      localStorage.setItem("formData", JSON.stringify(formData));
      alert(
        "Success! Your information on this page has been saved. Redirecting you to Directory page."
      );
      window.location.href = "/user/directory";
    }
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
