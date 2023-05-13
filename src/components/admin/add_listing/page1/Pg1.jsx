import React from "react";
import { useState } from "react";
import "./pg1.scss";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useNavigate } from "react-router-dom";

const Pg1 = () => {
  // handles all the data on this page
  // const navigate=useNavigate();
  const [formData, setFormData] = useState({
    accName: "",
    accAddress: "",
    accType: "",
    accDescription: "",
    accRules: "",
    amenities: [],
    nearby: [],
  });
  //const[docUid, setDocUid]=useState("");
  // handles input validation for the form
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevFormData) => {
      if (type === "checkbox") {
        if (checked) {
          return {
            ...prevFormData,
            [id]: [...prevFormData[id], value],
          };
        } else {
          return {
            ...prevFormData,
            [id]: prevFormData[id].filter((item) => item !== value),
          };
        }
      } else {
        return {
          ...prevFormData,
          [id]: value,
        };
      }
    });

    validateForm();
    console.log(id, value);
  };

  // handles form validation (checks whether all the input fields are filled out)
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

  // handles next button
  const handleNextClick = (e) => {
    // Perform any additional validation if needed
    if (!isFormValid) {
      e.preventDefault();
      alert("Please fill in all the required fields.");
    } else {
      const accRef = addDoc(collection(db, "accommodations"), {
        ...formData,
        progress: 1,
      })
        .then((accRef) => {
          console.log("document successfully written");
          // console.log("props history", history);
          //navigate("/page2", {state: {docUid}});
          window.location.href = "/page2";
        })
        .catch((error) => {
          console.error("error writing document: ", error);
        });
    }
  };

  return (
    <>
      <div className="wrapper container">
        <h2 className="acc-details-txt">General Accommodation Details</h2>
        <form>
          <div>
            <label htmlFor="accName">Name</label>
            <input
              type="text"
              id="accName"
              required
              onChange={handleInputChange}
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="accAddress">Address</label>
            <input
              type="text"
              id="accAddress"
              required
              onChange={handleInputChange}
            ></input>
          </div>
          <br />
          <div>
            <label htmlFor="accType">Type</label>
            <select id="accType" required onChange={handleInputChange}>
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
            <label htmlFor="accDescription">Description</label>
            <textarea
              id="accDescription"
              className="description-style"
              required
              onChange={handleInputChange}
            ></textarea>
          </div>
          <br />
          <div>
            <label htmlFor="accRules">Rules and Regulations</label>
            <textarea
              id="accRules"
              className="rules-style"
              required
              onChange={handleInputChange}
            ></textarea>
          </div>
          <br />
          <div>
            <label>Amenities</label>
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
            <label>Nearby</label>
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
                  checked={formData.nearby.includes("water-refill-station")}
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
          <button type="button" onClick={handleNextClick}>
            <a>Next</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default Pg1;
