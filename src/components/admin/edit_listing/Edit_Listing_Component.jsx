import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../../firebase";
import "./edit_listing.scss";


const Edit_Listing_Component = () => {
  // State variables to store data from Firestore and other UI states
  const [accommodation, setAccommodation] = useState({});
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [roomDimension, setRoomDimension] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  // Retrieve the ID parameter from the URL
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the document reference for the specified accommodation ID
        const docRef = doc(db, "accommodations", id);
        // Fetch the document snapshot from Firestore
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Extract the data from the document snapshot and update the state
          const data = docSnap.data();
          setAccommodation(data);
          if (data.photos) {
            setUploadedPhotos(data.photos);
          }
          if (data.length && data.width && data.metric) {
            setRoomDimension(`${data.length} x ${data.width} ${data.metric}`);
          }
          setEditData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if(!editData.electricityChecked){
        editData.electricityFee="";
      }
      if(!editData.waterChecked){
        editData.waterFee="";
      }
      if(!editData.depositChecked){
        editData.depositFee="";
      }
      await updateDoc(doc(db, "accommodations", id), editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "accType") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const optionValue = selectedOption.value;

      setEditData((prevData) => ({
        ...prevData,
        [name]: optionValue,
      }));
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleInputChangeAmenities = (e) => {
    const { name, value, checked } = e.target;

    if (name === "amenities") {
      if (checked) {
        setEditData((prevData) => ({
          ...prevData,
          amenities: [...(prevData.amenities || []), value],
        }));
      } else {
        setEditData((prevData) => ({
          ...prevData,
          amenities: (prevData.amenities || []).filter(
            (amenity) => amenity !== value
          ),
        }));
      }
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleInputChangeNearby = (e) => {
    const { name, value, checked } = e.target;

    if (name === "nearby") {
      if (checked) {
        setEditData((prevData) => ({
          ...prevData,
          nearby: [...(prevData.nearby || []), value],
        }));
      } else {
        setEditData((prevData) => ({
          ...prevData,
          nearby: (prevData.nearby || []).filter((nearby) => nearby !== value),
        }));
      }
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);

    // Create an array of objects containing the selected files
    const uploadedPhotosArray = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    // Update the uploadedPhotos state with the selected files
    setUploadedPhotos(uploadedPhotosArray);
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
    if (chosenFiles.length + uploadedPhotos.length > 4) {
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
    setUploadedPhotos((prevUploadedPhotos) => [
      ...prevUploadedPhotos,
      ...updatedUploadedFiles,
    ]);
  
    // Update the photos array in formData with the file URLs
    setEditData((prevEditData) => ({
      ...prevEditData,
      photos: [...prevEditData.photos, ...fileURLs],
    }));
  };
  const handleDeletePhoto = (index) => {
    // Create a copy of the uploadedFiles array
    const updatedUploadedFiles = [...uploadedPhotos];
    // Remove the file at the specified index from the copied array
    updatedUploadedFiles.splice(index, 1);
    // Update the uploadedFiles state with the modified array
    setUploadedPhotos(updatedUploadedFiles);
  
    // Update the photos array in formData by filtering out the deleted file URL
    setEditData((prevEditData) => ({
      ...prevEditData,
      photos: prevEditData.photos.filter((_, i) => i !== index),
    }));
  };

  // ISSUE: Input fields for owner's and caretaker's phone number should only accept numerical values (up to 11 digits)
  const handleInputChangePhoneEmail = (e) => {
    // Destructure the id and value properties from the event target
    const { name, value } = e.target;

    // Check if the input field corresponds to ownerPhone or caretakerPhone
    if (name === "ownerPhone" || name === "caretakerPhone") {
      // Remove non-digit characters from the entered value
      const phoneNumber = value.replace(/\D/g, "");

      // Check if the phone number exceeds 11 digits
      if (phoneNumber.length > 11) {
        // If it exceeds, truncate the value to 11 digits
        e.target.value = phoneNumber.slice(0, 11);
      } else {
        // If it doesn't exceed, assign the modified phone number value
        e.target.value = phoneNumber;
        setEditData((prevData) => ({
          ...prevData,
          [name]: phoneNumber,
        }));
      }
    }

    // Check if the input field corresponds to ownerEmail
    if (name === "ownerEmail") {
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
      setEditData((prevEditData) => ({
        ...prevEditData,
        [name]: value,
      }));
    }

    // Update the form data state by merging the new value for the corresponding id
    setEditData((prevEditData) => ({
      ...prevEditData,
      [name]: value,
    }));
    console.log(id, value);
  };

  const handleInputChange3 = (e) => {
    // Destructure properties from the event target object
    const { id, type, value, checked } = e.target;

    // Update the form data state using the setFormData function
    setEditData((prevState) => ({
      // Spread the previous form data state
      ...prevState,
      // Update the specific field based on the event target's ID
      [id]: type === "checkbox" ? checked : value,
    }));

    // Output the ID and value of the input field to the console
    console.log(id, value);
  };

  return (
    <>
      {isEditing ? (
        <>
          <div className="edit-listing-style container">
            <h2 className="title-text">Edit Listing</h2>
            <div>
              <form className="edit-form-style">
                <div>
                  <h3 className="title-2-text">
                    General Accommodation Details
                  </h3>
                  <hr />
                </div>

                <br />

                {/* Render editable field for ACCOMMODATION NAME */}
                <div className="name-editable">
                  <label htmlFor="accName">NAME</label>
                  <input
                    type="text"
                    name="accName"
                    value={editData.accName || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <br />

                {/* Render editable field for ACCOMMODATION ADDRESS */}
                <div>
                  <label htmlFor="accAddress">ADDRESS</label>
                  <input
                    type="text"
                    name="accAddress"
                    value={editData.accAddress || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <br />

                {/*Render editable field for TYPE */}
                <div>
                  <label htmlFor="accType">TYPE</label>
                  <select
                    name="accType"
                    value={editData.accType || ""}
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

                <br />

                {/* Render editable field for DESCRIPTION */}
                <div>
                  <label htmlFor="accDescription">DESCRIPTION</label>
                  <textarea
                    name="accDescription"
                    value={editData.accDescription || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <br />

                {/* Render editable field for RULES */}
                <div>
                  <label htmlFor="accRules">RULES & REGULATION</label>
                  <textarea
                    name="accRules"
                    value={editData.accRules || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <br />

                {/*Render editable field for AMENITIES */}
                <div>
                  <label htmlFor="amenities">AMENITIES</label>
                  <br />
                  <div>
                    <label htmlFor="amenities">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="Wifi"
                        checked={
                          editData.amenities &&
                          editData.amenities.includes("Wifi")
                        }
                        onChange={handleInputChangeAmenities}
                      />
                      Wi-Fi
                    </label>
                    <label htmlFor="amenities">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="Air Conditioning"
                        checked={
                          editData.amenities &&
                          editData.amenities.includes("Air Conditioning")
                        }
                        onChange={handleInputChangeAmenities}
                      />
                      Air conditioning
                    </label>
                    <label htmlFor="amenities">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="Laundry Area"
                        checked={
                          editData.amenities &&
                          editData.amenities.includes("Laundry Area")
                        }
                        onChange={handleInputChangeAmenities}
                      />
                      Laundry area
                    </label>
                    <label htmlFor="amenities">
                      <input
                        type="checkbox"
                        name="amenities"
                        value="Kitchen"
                        checked={
                          editData.amenities &&
                          editData.amenities.includes("Kitchen")
                        }
                        onChange={handleInputChangeAmenities}
                      />
                      Kitchen
                    </label>
                  </div>
                </div>

                {/*Render editable field for NEARBY*/}
                <div>
                  <label htmlFor="nearby">NEARBY</label>
                  <br />
                  <div>
                    <label htmlFor="nearby">
                      <input
                        type="checkbox"
                        name="nearby"
                        value="Eatery"
                        checked={
                          editData.nearby && editData.nearby.includes("Eatery")
                        }
                        onChange={handleInputChangeNearby}
                      />
                      Eatery/Restaurant
                    </label>
                    <label htmlFor="nearby">
                      <input
                        type="checkbox"
                        name="nearby"
                        value="Laundry Shop"
                        checked={
                          editData.nearby &&
                          editData.nearby.includes("Laundry Shop")
                        }
                        onChange={handleInputChangeNearby}
                      />
                      Laundry Shop
                    </label>
                    <label htmlFor="nearby">
                      <input
                        type="checkbox"
                        name="nearby"
                        value="Retail Store"
                        checked={
                          editData.nearby &&
                          editData.nearby.includes("Retail Store")
                        }
                        onChange={handleInputChangeNearby}
                      />
                      Retail Store
                    </label>
                    <label htmlFor="nearby">
                      <input
                        type="checkbox"
                        name="nearby"
                        value="Water Refill Station"
                        checked={
                          editData.nearby &&
                          editData.nearby.includes("Water Refill Station")
                        }
                        onChange={handleInputChangeNearby}
                      />
                      Water refilling station
                    </label>
                    <label htmlFor="nearby">
                      <input
                        type="checkbox"
                        name="nearby"
                        value="Pharmacy"
                        checked={
                          editData.nearby &&
                          editData.nearby.includes("Pharmacy")
                        }
                        onChange={handleInputChangeNearby}
                      />
                      Pharmacy
                    </label>
                  </div>
                </div>
                <br />

                {/* NOTE: Page 2 of Add Listing Form starts here*/}
                <div>
                  <h3 className="title-2-text">Room Details</h3>
                  <hr />
                </div>

                <br />

                {/* Render editable field for NUMBER OF OCCUPANTS (per room)*/}
                <div>
                  <label htmlFor="occupants">
                    NUMBER OF OCCUPANTS (per room)
                  </label>
                  <input
                    type="number"
                    name="occupants"
                    min={1}
                    onChange={handleInputChange}
                    value={editData.occupants || ""}
                  />
                </div>

                {/* NOTE: CORRECTLY Render editable field for ROOM DIMENSIONS (NOT REQUIRED INPUT FIELD)*/}
                <div className="room-dimension">
                  <br />
                  <label htmlFor="room-dimension">ROOM DIMENSION</label>
                  <div className="room-dimension-inputs">
                    <input
                      type="number"
                      name="length"
                      min={1}
                      className="length-style"
                      placeholder="Length"
                      onChange={handleInputChange}
                      value={editData.length || ""}
                    />
                    <span style={{ margin: "0 5px" }}>x</span>
                    <input
                      type="number"
                      name="width"
                      min={1}
                      className="width-style"
                      placeholder="Width"
                      onChange={handleInputChange}
                      value={editData.width || ""}
                    />
                  </div>
                  <select
                    name="metric"
                    className="metric-style"
                    onChange={handleInputChange}
                    value={editData.metric || ""}
                  >
                    <option value="">Select</option>
                    <option value="feet">Feet</option>
                    <option value="inches">Inches</option>
                    <option value="meters">Meters</option>
                  </select>
                </div>

                <br />

                {/* Render editable field for COMFORT ROOM TYPE*/}
                <div>
                  <label htmlFor="crType">COMFORT ROOM TYPE</label>
                  <select
                    name="crType"
                    onChange={handleInputChange}
                    value={editData.crType || ""}
                    className="select-type"
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

                {/* NOTE: CORRECTLY render editable field for UPLOADED PHOTOS*/}
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
                      Only a maximum of 4 photos can be uploaded.
                      Reupload files!
                    </p>
                  )}
                  {uploadedPhotos.length > 0 && (
                    <div>
                      <br />
                      <label>UPLOADED PHOTOS</label>
                      <ul>
                        {uploadedPhotos.map((file, index) => (
                          <li key={index}>
                            <img
                              src={file}
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

                <br />
                <br />

                {/* NOTE: Page 3 of Add Listing Form starts here*/}
                <div>
                  <h3 className="title-2-text">Billing Details</h3>
                  <hr />
                </div>

                <br />

                {/* Render editable field for RENTAL FEE (per room)*/}
                <div>
                  <label htmlFor="rental-fee-room">
                    RENTAL FEE (per room)*
                  </label>
                  <input
                    type="number"
                    name="roomFee"
                    title="Please enter a valid numerical currency amount"
                    step="0.01"
                    min="0"
                    max="9999999.99"
                    placeholder="ex. 1000.00"
                    onChange={handleInputChange}
                    value={editData.roomFee || ""}
                  />
                </div>

                <br />

                {/* Render editable field for RENTAL FEE (per head)*/}
                <div>
                  <label htmlFor="rental-fee-room">
                    RENTAL FEE (per head)*
                  </label>
                  <input
                    type="number"
                    name="headFee"
                    title="Please enter a valid numerical currency amount"
                    step="0.01"
                    min="0"
                    max="9999999.99"
                    placeholder="ex. 1000.00"
                    onChange={handleInputChange}
                    value={editData.headFee || ""}
                  />
                </div>

                {/*NOTE: Render editable field for ADDITIONAL FEES*/}

                <br />
                <div>
                  <label>ADDITIONAL FEES</label>
                  <br />
                  <div>
                    <label htmlFor="electricity">
                      <input
                        type="checkbox"
                        id="electricityChecked"
                        checked={editData.electricityChecked}
                        onChange={handleInputChange3}
                        value={editData.electricityChecked||""}
                      />
                      Electricity
                    </label>
                    {editData.electricityChecked && (
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
                        value={editData.electricityFee}
                      />
                    )}
                    <label htmlFor="water">
                      <br />
                      <input
                        type="checkbox"
                        id="waterChecked"
                        checked={editData.waterChecked}
                        value={editData.waterFee || ""}
                        onChange={handleInputChange3}
                      />
                      Water
                    </label>
                    {editData.waterChecked && (
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
                        value={editData.waterFee}
                      />
                    )}
                    <label htmlFor="deposit">
                      <br />
                      <input
                        type="checkbox"
                        id="depositChecked"
                        onChange={handleInputChange3}
                        checked={editData.depositChecked}
                        value={editData.depositChecked||""}
                      />
                      Deposit
                    </label>
                    {editData.depositChecked && (
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
                        value={editData.depositFee||""}
                      />
                    )}
                  </div>
                </div>
                <br />

                {/* NOTE: Page 4 of Add Listing Form starts here*/}
                <div>
                  <h3 className="title-2-text">Management Details</h3>
                  <hr />
                </div>

                <br />

                {/* Render editable field for OWNER'S NAME*/}
                <div>
                  <label htmlFor="owner-name">OWNER'S NAME</label>
                  <input
                    type="text"
                    name="ownerName"
                    //onChange={handleInputChange}
                    value={editData.ownerName || ""}
                  ></input>
                </div>

                <br />

                {/* Render editable field for OWNER'S PHONE NUMBER*/}
                {/* Issue: Add pattern validation*/}
                <div>
                  <label htmlFor="owner-phonenum">OWNER'S PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    pattern="\d{11}"
                    title="Please enter a valid Philippine phone number (11 digits, starting with '09')"
                    onChange={handleInputChangePhoneEmail}
                    value={editData.ownerPhone || ""}
                  ></input>
                </div>

                <br />

                {/* Render editable field for OWNER'S E-MAIL ADDRESS*/}
                <div>
                  <label htmlFor="owner-email">OWNER'S E-MAIL</label>
                  <input
                    type="email"
                    name="ownerEmail"
                    title="Please enter a valid e-mail"
                    onChange={handleInputChangePhoneEmail}
                    value={editData.ownerEmail || ""}
                  ></input>
                  {emailError && (
                    <span className="error-message">{emailError}</span>
                  )}
                </div>

                <br />

                {/* Render editable field for CARETAKER'S NAME ADDRESS*/}
                {/* Issue: Whether to completely not allow user to edit this field even if they did not fill this out*/}
                <div>
                  <label htmlFor="caretaker-name">CARETAKER'S NAME</label>
                  <input
                    type="text"
                    name="caretakerName"
                    onChange={handleInputChange}
                    value={editData.caretakerName}
                  ></input>
                </div>

                <br />

                <div>
                  {/* Render editable field for CARETAKER'S PHONE NUMBER*/}
                  {/* Issue: Add pattern validation*/}
                  <label htmlFor="caretaker-phonenum">
                    CARETAKER'S PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    name="caretakerPhone"
                    pattern="\d{11}"
                    title="Please enter a valid Philippine phone number (11 digits, starting with '09')"
                    onChange={handleInputChangePhoneEmail}
                    value={editData.caretakerPhone || ""}
                  ></input>
                </div>
              </form>
            </div>

            <button type="button" onClick={handleSaveClick}>
              <a>Save</a>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Display other non-editable fields */}
          {/* Display the accommodation data */}
          <div className="edit-listing-style container">
            {/* Display the accommodation name if available */}
            {accommodation.accName && <h2>{accommodation.accName}</h2>}

            {/* Display the accommodation address if available */}
            {accommodation.accAddress && <p>{accommodation.accAddress}</p>}

            {/* Display the first uploaded photo if available */}
            {uploadedPhotos && uploadedPhotos.length > 0 && (
              <div className="photo-list-wrapper">
                <div className="main-photo-container">
                  <img
                    className="main-photo"
                    src={uploadedPhotos[0]}
                    alt={`photo-0`}
                  />
                </div>
              </div>
            )}

            <br />

            <h3>Description</h3>
            <hr className="hr-edit-style" />
            {/* Display the accommodation description if available */}
            {accommodation.accDescription && (
              <p>{accommodation.accDescription}</p>
            )}

            <br />

            {/* Display the list of amenities if available */}
            <h3>Amenities</h3>
            <hr className="hr-edit-style" />
            {accommodation.amenities && (
              <p>
                {accommodation.amenities && accommodation.amenities.join(", ")}
              </p>
            )}

            <br />

            {/* Display the list of nearby locations if available */}
            <h3>Nearby</h3>
            <hr className="hr-edit-style" />
            {accommodation.accAddress && (
              <p>{accommodation.nearby && accommodation.nearby.join(", ")}</p>
            )}

            <br />

            {/* Display the list of rules if available */}
            <h3>Rules</h3>
            <hr className="hr-edit-style" />
            {accommodation.accRules && (
              <ul className="rules-list">
                {accommodation.accRules.split("\n").map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            )}

            <br />

            {/* Display the number of occupants allowed per room if available */}
            <h3>Number of occupants (per room)</h3>
            <hr className="hr-edit-style" />
            {accommodation.occupants && (
              <p>
                Only {accommodation.occupants} occupants are allowed per room.
              </p>
            )}

            {/*Display room dimension if available*/}
            {roomDimension && (
              <>
                <br />
                <h3>Room dimension</h3>
                <hr className="hr-edit-style" />
                {/* Display the room dimensions if available */}
                {accommodation.length &&
                  accommodation.width &&
                  accommodation.metric && (
                    <p>
                      Each room is approximately {accommodation.length} x{" "}
                      {accommodation.width} {accommodation.metric}.
                    </p>
                  )}
              </>
            )}

            <br />

            {/* Display the type of comfort rooms available if available */}
            <h3>Comfort room type</h3>
            <hr className="hr-edit-style" />
            {accommodation.crType && (
              <p>
                This accommodation has comfort rooms of {accommodation.crType}{" "}
                type.
              </p>
            )}

            <br />

            <h3>Rental fee (per room)</h3>
            <hr className="hr-edit-style" />
            {/* Display the rental fee per room if available */}
            {accommodation.roomFee && (
              <p>Each room has a rental fee of PHP {accommodation.roomFee}.</p>
            )}

            {/* Display the rental fee per head if available */}
            {accommodation.headFee && (
              <>
                <br />
                <h3>Rental fee (per head)</h3>
                <hr className="hr-edit-style" />
                <p>
                  Each room has a rental fee of PHP {accommodation.headFee} per
                  head.
                </p>
              </>
            )}

            {/* Display additional fees if available */}
            {/*Code doesn't display inputted data. Needs to be fixed*/}
            {(accommodation.electricityFee ||
              accommodation.waterFee ||
              accommodation.depositFee) && (
              <>
                <br />
                <h3>Additional Fees</h3>
                <p className="additional-fees-style">
                <hr className="hr-edit-style" />
                  {accommodation.electricityFee && (
                    <p>Electricity: {accommodation.electricityFee}</p>
                  )}
                  {accommodation.waterFee && (
                    <p>Water: {accommodation.waterFee}</p>
                  )}
                  {accommodation.depositFee && (
                    <p>Deposit: {accommodation.depositFee}</p>
                  )}
                </p>
              </>
            )}

            <br />

            <h3>Contact</h3>
            <hr className="hr-edit-style" />
            {/* Display the owner's name if available */}
            {accommodation.ownerName && (
              <p>Owner's name: {accommodation.ownerName}</p>
            )}

            {/* Display the owner's phone number if available */}
            {accommodation.ownerPhone && (
              <p>Owner's phone number: {accommodation.ownerPhone}</p>
            )}

            {/* Display the owner's email address if available */}
            {accommodation.ownerEmail && (
              <>
                <p>Owner's e-mail address: {accommodation.ownerEmail}</p>
              </>
            )}

            {/* Display the caretaker's name if available */}
            {accommodation.caretakerName && (
              <>
                <p>Caretaker's name: {accommodation.caretakerName}</p>
              </>
            )}

            {/* Display the caretaker's phone number if available */}
            {accommodation.caretakerPhone && (
              <>
                <p>Caretaker's phone number: {accommodation.caretakerPhone}</p>
              </>
            )}

            {/* Display the gallery of uploaded photos if available */}
            {uploadedPhotos && uploadedPhotos.length > 0 && (
              <>
                <br />
                <h3>Gallery</h3>
                <hr />
                <ul className="photo-list">
                  {uploadedPhotos.map((photoUrl, index) => (
                    <li key={index}>
                      <img src={photoUrl} alt={`photo-${index}`} />
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button type="button" onClick={handleEditClick}>
              <a>Edit</a>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Edit_Listing_Component;
