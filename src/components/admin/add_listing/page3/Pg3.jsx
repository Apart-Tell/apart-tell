import React from "react";
import { useState } from "react";
import "./pg3.scss";
import { updateDoc, doc, collection } from "firebase/firestore";
import { db , auth} from "../../../../firebase";

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

  const handleInputChange = (event) => {
    const { id, type, value, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
    console.log(id, value);
  };

  // form validation: checks whether all input fields are filled out before letting the user be redirected to the next page
  const handleNextClick = async(event) => {
    event.preventDefault();
    if (!formData.roomFee || !formData.headFee) {
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
    }
    const currentUser=auth.currentUser;
    const accRef=doc(collection(db, "accommodations"), currentUser.uid);
    await updateDoc(accRef, {
      ...formData,
      progress: 3,
    })
      .then(() => {
        window.location.href = "/page4";
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <>
      <div className="wrapper container">
        <h2>Add New Listing</h2>
        <form className="bdetails-wrapper">
          <h3>Billing Details</h3><hr className="hr-style-pg3"/>
          <div>
            <br/><br/>
            <label htmlFor="rental-fee-room">RENTAL FEE (per room)*</label>
            <input
              type="text"
              id="roomFee"
              pattern="^\d+(?:\.\d{1,2})?$"
              placeholder="ex. 1000.00"
              title="Please enter a valid numerical currency amount"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="rental-fee-head">RENTAL FEE (per head)*</label>
            <input
              type="text"
              id="headFee"
              pattern="^\d+(?:\.\d{1,2})?$"
              placeholder="ex. 1000.00"
              title="Please enter a valid numerical currency amount"
              onChange={handleInputChange}
              required
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
                    type="text"
                    placeholder="Enter electricity fee (per month)"
                    pattern="^\d+(?:\.\d{1,2})?$"
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
                    type="text"
                    placeholder="Enter water fee (per month)"
                    pattern="^\d+(?:\.\d{1,2})?$"
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
                    type="text"
                    placeholder="Enter deposit fee"
                    pattern="^\d+(?:\.\d{1,2})?$"
                    title="Please enter a valid numerical currency amount"
                    id="depositFee"
                    onChange={handleInputChange}
                  />
                )}
              </div>
            </div>
          </div>
          <button type="button" className="prev-btn">
            <a href="/page2">Prev</a>
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
