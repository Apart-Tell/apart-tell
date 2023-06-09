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
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";

const Pg1 = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    accName: "",
    accAddress: "",
    accType: "",
    accDescription: "",
    accRules: "",
    amenities: [],
    nearby: [],
    //end of page 1
    occupants: "",
    length: "",
    width: "",
    metric: "",
    crType: "",
    roomFee: "",
    headFee: "",
    electricityChecked: false,
    electricityFee: "",
    waterChecked: false,
    waterFee: "",
    depositChecked: false,
    depositFee: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    caretakerName: "",
    caretakerPhone: "",
  });
  const currentUser = auth.currentUser;

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (window.confirm("game kanaba?")) {
      window.alert("oks");
    }
  };
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
    // Log the ID and value of the changed input
    console.log(id, value);
  };

  const renderFormStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="wrapper container">
              <h2>Add New Listing</h2>
              <div className="form-wrapper">
                <form>
                  <div className="h3-wrapper">
                    <h3 className="acc-details-txt">
                      General Accommodation Details
                    </h3>
                    <hr className="hr-style" />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="accName">NAME*</label>
                    <input
                      type="text"
                      id="accName"
                      required
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="accAddress">ADDRESS*</label>
                    <input
                      type="text"
                      id="accAddress"
                      required
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <br />
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
                      <option value="apartment" className="select-type">
                        Apartment
                      </option>
                      <option value="boarding-house" className="select-type">
                        Boarding House
                      </option>
                      <option value="dormitory" className="select-type">
                        Dormitory
                      </option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="accDescription">DESCRIPTION*</label>
                    <textarea
                      id="accDescription"
                      className="description-style"
                      required
                      onChange={handleInputChange}
                      style={{ fontSize: "medium" }}
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="accRules">RULES & REGULATIONS*</label>
                    <textarea
                      id="accRules"
                      className="rules-style"
                      required
                      onChange={handleInputChange}
                      style={{ fontSize: "medium" }}
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label>AMENITIES*</label>
                    <br />
                    <div>
                      <label htmlFor="amenities">
                        <input
                          type="checkbox"
                          id="amenities"
                          value="wifi"
                          onChange={handleInputChange}
                          checked={formData.amenities.includes("wifi")}
                        />
                        Wi-Fi
                      </label>
                      <label htmlFor="amenities">
                        <input
                          type="checkbox"
                          id="amenities"
                          value="aircon"
                          onChange={handleInputChange}
                          checked={formData.amenities.includes("aircon")}
                        />
                        Air conditioning
                      </label>
                      <label htmlFor="amenities">
                        <input
                          type="checkbox"
                          id="amenities"
                          value="laundry-area"
                          onChange={handleInputChange}
                          checked={formData.amenities.includes("laundry-area")}
                        />
                        Laundry area
                      </label>
                      <label htmlFor="amenities">
                        <input
                          type="checkbox"
                          id="amenities"
                          value="kitchen"
                          onChange={handleInputChange}
                          checked={formData.amenities.includes("kitchen")}
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
                          value="eatery"
                          onChange={handleInputChange}
                          checked={formData.nearby.includes("eatery")}
                        />
                        Eatery/Restaurant
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          value="laundry-shop"
                          onChange={handleInputChange}
                          checked={formData.nearby.includes("laundry-shop")}
                        />
                        Laundry shop
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          value="retail-store"
                          onChange={handleInputChange}
                          checked={formData.nearby.includes("retail-store")}
                        />
                        Retail store
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          value="water-refill-station"
                          onChange={handleInputChange}
                          checked={formData.nearby.includes(
                            "water-refill-station"
                          )}
                        />
                        Water refilling station
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          value="pharmacy"
                          onChange={handleInputChange}
                          checked={formData.nearby.includes("pharmacy")}
                        />
                        Pharmacy
                      </label>
                    </div>
                  </div>
                  <button type="button" onClick={handleNext}>
                    <a>Next</a>
                  </button>
                </form>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="wrapper container">
              <h2>Add New Listing</h2>
              <h3>Room Details</h3>
              <hr />
              <form>
                <div>
                  <label htmlFor="occupants-room">
                    NUMBER OF OCCUPANTS (per room)*
                  </label>
                  <input
                    type="number"
                    id="occupants"
                    min={1}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="room-dimension">
                  <br />
                  <label htmlFor="room-dimension">ROOM DIMENSION</label>
                  <div className="room-dimension-inputs">
                    <input
                      type="number"
                      id="length"
                      min={1}
                      className="length-style"
                      placeholder="Length"
                      onChange={handleInputChange}
                    />
                    <span style={{ margin: "0 5px" }}>x</span>
                    <input
                      type="number"
                      id="width"
                      min={1}
                      className="width-style"
                      placeholder="Width"
                      onChange={handleInputChange}
                    />
                  </div>
                  <select
                    id="metric"
                    className="metric-style"
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="feet">Feet</option>
                    <option value="inches">Inches</option>
                    <option value="meters">Meters</option>
                  </select>
                </div>
                <br />
                <div>
                  <label htmlFor="crType">COMFORT ROOM TYPE*</label>
                  <select
                    id="crType"
                    required
                    onChange={handleInputChange}
                    className="select-type"
                  >
                    <option value="" className="select-type">
                      Select a type
                    </option>
                    <option value="communal" className="select-type">
                      Communal/Shared
                    </option>
                    <option value="private" className="select-type">
                      Private
                    </option>
                  </select>
                </div>
                <br />

                <button
                  type="button"
                  className="prev-btn"
                  onClick={handlePrevious}
                >
                  <a>Prev</a>
                </button>
                <button type="button" className="next-btn" onClick={handleNext}>
                  <a>Next</a>
                </button>
              </form>
            </div>
          </>
        );
      case 2:
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
                  <label htmlFor="rental-fee-room">
                    RENTAL FEE (per room)*
                  </label>
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
                  <label htmlFor="rental-fee-head">
                    RENTAL FEE (per head)*
                  </label>
                  <input
                    type="number"
                    id="headFee"
                    step="0.01"
                    min="0"
                    max="9999999.99"
                    placeholder="ex. 1000.00"
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
                <button
                  type="button"
                  className="prev-btn"
                  onClick={handlePrevious}
                >
                  <a>Prev</a>
                </button>
                <button type="button" className="next-btn" onClick={handleNext}>
                  <a>Next</a>
                </button>
              </form>
            </div>
          </>
        );
      case 3:
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
                <button
                  type="button"
                  className="prev-btn"
                  onClick={handlePrevious}
                >
                  <a>Prev</a>
                </button>
                <button type="submit" onClick={handleSubmit}>
                  <a>Submit</a>
                </button>
              </form>
            </div>
          </>
        );
      default:
        <h1>uhm ure not supposed to be here</h1>
      }
  };

  return <>{renderFormStep()}</>;
};

export default Pg1;
