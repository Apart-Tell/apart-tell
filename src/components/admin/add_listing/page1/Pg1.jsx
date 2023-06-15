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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "../../../../firebase";

const MAX_COUNT = 4;

const Pg1 = () => {
  const [step, setStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [fileLimit, setFileLimit] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
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
    progress: 4,
    photos: [],
  });
  const currentUser = auth.currentUser;

  const handleNext = (e) => {
    e.preventDefault();
    const requiredInputs = document.querySelectorAll(
      "input[required], select[required], textarea[required], checkbox[required]"
    );
    const unfilledInputs = [];

    // Check if all required inputs have a value
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        unfilledInputs.push(input);
      }
    });
    
    if (formData.amenities.length === 0) {
      const firstAmenitiesInput = document.querySelector("#amenities");
      if (firstAmenitiesInput) {
        unfilledInputs.push(firstAmenitiesInput);
      }
    }
    
    if (formData.nearby.length === 0) {
      const firstNearbyInput = document.querySelector("#nearby");
      if (firstNearbyInput) {
        unfilledInputs.push(firstNearbyInput);
        console.log(unfilledInputs);
      }
    }
    

    if (formData.electricityChecked && !formData.electricityFee) {
      unfilledInputs.push(document.querySelector("#electricityFee"));
    }

    // Check if water fee is required and not filled
    if (formData.waterChecked && !formData.waterFee) {
      unfilledInputs.push(document.querySelector("#waterFee"));
    }

    // Check if deposit fee is required and not filled
    if (formData.depositChecked && !formData.depositFee) {
      unfilledInputs.push(document.querySelector("#depositFee"));
    }

    if (unfilledInputs.length > 0) {
      // Alert the user of the unfilled inputs
      const unfilledInputNames = unfilledInputs.map((input) => input.name);
      alert(
        `Please fill out the following required fields: ${unfilledInputNames.join(
          ", "
        )}`
      );
      // Set focus on the first unfilled input
      unfilledInputs[0].focus();
      return;
    } else {
      setStep(step + 1);
    }
  };
  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const requiredInputs = document.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    const unfilledInputs = [];

    // Check if all required inputs have a value
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        unfilledInputs.push(input);
      }
    });

    if (unfilledInputs.length > 0) {
      // Alert the user of the unfilled inputs
      const unfilledInputNames = unfilledInputs.map((input) => input.name);
      alert(
        `Please fill out the following required fields: ${unfilledInputNames.join(
          ", "
        )}`
      );
      return;
    }

    if (window.confirm("Are you sure you want to proceed?")) {
      window.alert("Uploading...");
      const accRef = doc(collection(db, "accommodations"));
      await setDoc(accRef, {
        ...formData,
        progress: 4,
        createdBy: currentUser.uid,
        editedBy: currentUser.uid,
        editedAt: serverTimestamp(),
      });
      window.location.href = "/user/directory";
    }
  };
  const handleFileEvent = async (e) => {
    // Convert the FileList object into an array of chosen files
    const chosenFiles = Array.from(e.target.files);
    // Initialize arrays to store file URLs and updated uploaded files
    const fileURLs = [];
    const updatedUploadedFiles = [];
  
    // Display an alert message indicating file upload is in progress
    alert("Uploading files... This might take some time.");
  
    // Check if the total number of files exceeds the maximum count
    if (chosenFiles.length + uploadedFiles.length > MAX_COUNT) {
      // Set the file limit state to true
      setFileLimit(true);
      return; // Exit the function
    } else {
      // Set the file limit state to false
      setFileLimit(false);
    }
  
    // Iterate through each chosen file
    for (const file of chosenFiles) {
      // Create a storage reference with a specific path and file name
      const storageRef = ref(getStorage(), `room_photos/${file.name}`);
      // Upload the file to the storage reference and retrieve the snapshot
      const snapshot = await uploadBytes(storageRef, file);
      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);
      // Log the download URL to the console
      console.log("download link to your file: ", downloadURL);
      // Add the download URL to the fileURLs array
      fileURLs.push(downloadURL);
      // Add the file to the updatedUploadedFiles array
      updatedUploadedFiles.push(file);
    }
  
    // Update the uploaded files state by combining previous and updated files
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      ...updatedUploadedFiles,
    ]);
  
    // Update the photos array in formData with the file URLs
    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: [...prevFormData.photos, ...fileURLs],
    }));
  };
  const handleDeletePhoto = (index) => {
    // Create a copy of the uploadedFiles array
    const updatedUploadedFiles = [...uploadedFiles];
    // Remove the file at the specified index from the copied array
    updatedUploadedFiles.splice(index, 1);
    // Update the uploadedFiles state with the modified array
    setUploadedFiles(updatedUploadedFiles);
  
    // Update the photos array in formData by filtering out the deleted file URL
    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: prevFormData.photos.filter((_, i) => i !== index),
    }));
  };
  const validateForm1 = () => {
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
  const validateForm2 = () => {
    // Select all input and select elements that have the "required" attribute
    const inputs = document.querySelectorAll(
      "input[required], select[required]"
    );
    // Initialize a variable to track the overall validity of the form
    let isValid = true;
    // Iterate over each input/select element
    inputs.forEach((input) => {
      // Check if the current element's value is empty or not
      if (!input.value) {
        // If the value is empty, set the isValid flag to false
        isValid = false;
      }
    });
    // Update the form validity state using the setIsFormValid function
    setIsFormValid(isValid);
  };
  const validateForm3 = () => {
    const inputs = document.querySelectorAll("input[required]");
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
      }
    });
  };
  const validateForm4 = () => {
    const inputs = document.querySelectorAll("input[required]");
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
      }
    });
  };
  const handleInputChange1 = (e) => {
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
    validateForm1();
    // Log the ID and value of the changed input
    console.log(id, value);
  };
  const handleInputChange2 = (e) => {
    // Destructure the "id" and "value" properties from the event target (input element)
    const { id, value } = e.target;

    // Update the form data state by merging the previous form data with the updated value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    console.log(id, value);
    // Call the validateForm function to perform form validation
    validateForm2();
  };
  const handleInputChange3 = (e) => {
    // Destructure properties from the event target object
    const { id, type, value, checked } = e.target;

    // Update the form data state using the setFormData function
    setFormData((prevState) => ({
      // Spread the previous form data state
      ...prevState,
      // Update the specific field based on the event target's ID
      [id]: type === "checkbox" ? checked : value,
    }));

    // Output the ID and value of the input field to the console
    console.log(id, value);

    if (id === "ownerPhone") {
      // If the ID is "ownerPhone", update the ownerPhone field in the formData state
      setFormData((prevFormData) => ({
        ...prevFormData,
        ownerPhone: value,
      }));
      return;
    }

    if (id === "rentalFee") {
      // If the ID is "rentalFee", update the headFee field in the formData state
      setFormData((prevFormData) => ({
        ...prevFormData,
        headFee: value,
      }));
      return;
    }

    validateForm3();
  };
  const handleInputChange4 = (e) => {
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
    console.log(id, value);

    // Validate the form after handling the input change
    validateForm4();
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
                      name="Accommodation Name"
                      required
                      onChange={handleInputChange1}
                      defaultValue={formData.accName}
                    ></input>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="accAddress">ADDRESS*</label>
                    <input
                      type="text"
                      id="accAddress"
                      name="Address"
                      required
                      onChange={handleInputChange1}
                      defaultValue={formData.accAddress}
                    ></input>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="accType">TYPE*</label>
                    <select
                      id="accType"
                      required
                      name="Accommodation Type"
                      onChange={handleInputChange1}
                      className="select-type"
                      defaultValue={formData.accType}
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
                  <br />
                  <div>
                    <label htmlFor="accDescription">DESCRIPTION*</label>
                    <textarea
                      id="accDescription"
                      className="description-style"
                      required
                      name="Description"
                      onChange={handleInputChange1}
                      style={{ fontSize: "medium" }}
                      defaultValue={formData.accDescription}
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label htmlFor="accRules">RULES & REGULATIONS*</label>
                    <textarea
                      id="accRules"
                      name="Accommodation Rules"
                      className="rules-style"
                      required
                      onChange={handleInputChange1}
                      style={{ fontSize: "medium" }}
                      defaultValue={formData.accRules}
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
                          value="Wifi"
                          name="Amenities"
                          onChange={handleInputChange1}
                          required={formData.amenities.length === 0}
                          checked={formData.amenities.includes("Wifi")}
                        />
                        Wi-Fi
                      </label>
                      <label htmlFor="amenities">
                        <input
                          type="checkbox"
                          id="amenities"
                          value="Air Conditioning"
                          //name="Amenities"
                          onChange={handleInputChange1}
                          checked={formData.amenities.includes("Air Conditioning")}
                        />
                        Air conditioning
                      </label>
                      <label htmlFor="amenities">
                        <input
                          type="checkbox"
                          id="amenities"
                          value="Laundry Area"
                          //name="Amenities"
                          onChange={handleInputChange1}
                          checked={formData.amenities.includes("Laundry Area")}
                        />
                        Laundry area
                      </label>
                      <label htmlFor="amenities">
                        <input
                          type="checkbox"
                          id="amenities"
                          value="Kitchen"
                          //name="Amenities"
                          onChange={handleInputChange1}
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
                          required={formData.nearby.length === 0}
                          id="nearby"
                          value="Eatery"
                          name="Nearby"
                          onChange={handleInputChange1}
                          checked={formData.nearby.includes("Eatery")}
                        />
                        Eatery/Restaurant
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          value="Laundry Shop"
                          //name="Nearby"
                          onChange={handleInputChange1}
                          checked={formData.nearby.includes("Laundry Shop")}
                        />
                        Laundry shop
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          //name="Nearby"
                          value="Retail Store"
                          onChange={handleInputChange1}
                          checked={formData.nearby.includes("Retail Store")}
                        />
                        Retail store
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          value="Water Refill Station"
                          //name="Nearby"
                          onChange={handleInputChange1}
                          checked={formData.nearby.includes(
                            "Water Refill Station"
                          )}
                        />
                        Water refilling station
                      </label>
                      <label htmlFor="nearby">
                        <input
                          type="checkbox"
                          id="nearby"
                          value="Pharmacy"
                          //name="Nearby"
                          onChange={handleInputChange1}
                          checked={formData.nearby.includes("Pharmacy")}
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
                    onChange={handleInputChange2}
                    defaultValue={formData.occupants}
                    required
                    name="Number of Occupants per Room"
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
                      name="Room Dimensions (Length)"
                      className="length-style"
                      placeholder="Length"
                      onChange={handleInputChange2}
                      defaultValue={formData.length}
                    />
                    <span style={{ margin: "0 5px" }}>x</span>
                    <input
                      type="number"
                      id="width"
                      min={1}
                      className="width-style"
                      placeholder="Width"
                      name="Room Dimension (Width)"
                      onChange={handleInputChange2}
                      defaultValue={formData.width}
                    />
                  </div>
                  <select
                    id="metric"
                    className="metric-style"
                    name="Metric"
                    onChange={handleInputChange2}
                    defaultValue={formData.metric}
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
                    name="CR Type"
                    required
                    onChange={handleInputChange2}
                    className="select-type"
                    defaultValue={formData.crType}
                  >
                    <option value="" className="select-type">
                      Select a type
                    </option>
                    <option value="Communal" className="select-type">
                      Communal/Shared
                    </option>
                    <option value="Private" className="select-type">
                      Private
                    </option>
                  </select>
                </div>
                <br />
                <div>
                  <label>UPLOAD PHOTOS (Maximum of 4 photos only)</label>
                  <br />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileEvent}
                  />
                  <br />
                  {fileLimit && (
                    <p>
                      Only a maximum of {MAX_COUNT} photos can be uploaded.
                      Reupload files!
                    </p>
                  )}
                  {uploadedFiles.length > 0 && (
                    <div>
                      <br />
                      <label>UPLOADED PHOTOS</label>
                      <ul>
                        {uploadedFiles.map((file, index) => (
                          <li key={index}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`photo-${index}`}
                            />
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(index)}
                            >
                              <a>Delete</a>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                    onChange={handleInputChange3}
                    defaultValue={formData.roomFee}
                    required
                    name="Room Fee per Room"
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
                    onChange={handleInputChange3}
                    defaultValue={formData.headFee}
                    required
                    name="Room Fee per Head"
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
                          onChange={handleInputChange3}
                          defaultValue={formData.electricityChecked}
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
                          name="Electricity Fee"
                          onChange={handleInputChange3}
                          defaultValue={formData.electricityFee}
                        />
                      )}
                      <label htmlFor="water">
                        <br />
                        <input
                          type="checkbox"
                          id="waterChecked"
                          checked={formData.waterChecked}
                          defaultValue={formData.waterChecked}
                          onChange={handleInputChange3}
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
                          name="Water Fee"
                          onChange={handleInputChange3}
                          defaultValue={formData.waterFee}
                        />
                      )}
                      <label htmlFor="deposit">
                        <br />
                        <input
                          type="checkbox"
                          id="depositChecked"
                          onChange={handleInputChange3}
                          checked={formData.depositChecked}
                          defaultValue={formData.depositChecked}
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
                          name="Deposit Fee"
                          onChange={handleInputChange3}
                          defaultValue={formData.depositFee}
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
                    onChange={handleInputChange4}
                    value={formData.ownerName}
                    required
                    name="Owner's Name"
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
                    onChange={handleInputChange4}
                    value={formData.ownerPhone}
                    required
                    name="Owner's Phone Number"
                  ></input>
                </div>
                <br />
                <div>
                  <label htmlFor="owner-email">OWNER'S E-MAIL</label>
                  <input
                    type="email"
                    id="ownerEmail"
                    title="Please enter a valid e-mail"
                    onChange={handleInputChange4}
                    defaultValue={formData.ownerEmail}
                    name="Owner's Email"
                  ></input>
                  {emailError && <span className="error-message">{emailError}</span>}
                </div>
                <br />
                <div>
                  <label htmlFor="caretaker-name">CARETAKER'S NAME</label>
                  <input
                    type="text"
                    id="caretakerName"
                    onChange={handleInputChange4}
                    defaultValue={formData.caretakerName}
                    name="Caretaker's Name"
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
                    name="Caretaker's Phone Number"
                    onChange={handleInputChange4}
                    defaultValue={formData.caretakerPhone}
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
        <h1>uhm ure not supposed to be here</h1>;
    }
  };

  return <>{renderFormStep()}</>;
};

export default Pg1;
