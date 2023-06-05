import React, { useState, useEffect } from "react";
import { collection, updateDoc, doc, query, limit, where, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../../../firebase";
import "./pg2.scss";

const MAX_COUNT = 4;

const Pg2 = () => {
  // State variables
  const [formData, setFormData] = useState({
    occupants: "",
    length: "",
    width: "",
    metric: "",
    crType: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [existingDocId, setExistingDocId] = useState(null);

  // Runs once when the component mounts
  useEffect(() => {
    // Function to check if there is an existing document
    const checkExistingDoc = async () => {
      // Create a query to fetch documents from the "accommodations" collection
      const q = query(
        collection(db, "accommodations"),  // Reference to the "accommodations" collection in Firestore
        where("progress", "==", 1),       // Filter documents where the "progress" field is equal to 1
        limit(1)                          // Limit the query result to only one document
      );
      // Execute the query and get the snapshot of the result
      const querySnapshot = await getDocs(q);
      // Check if any documents were found
      if (querySnapshot.size > 0) {
        // Get the ID of the first document in the result
        const firstDoc = querySnapshot.docs[0].id;
        // Set the existing document ID state variable
        setExistingDocId(firstDoc);
        console.log("exists");
      } else {
        // No documents found, set the existing document ID state variable to null
        setExistingDocId(null);
        console.log("does not");
      }
    };
    // Call the function to check for an existing document when the component mounts
    checkExistingDoc();
    // Log the current value of the existingDocId state variable (for debugging)
    console.log("checking");
    console.log(existingDocId);
  }, []);
  
  // Event handler for input changes
  const handleInputChange = (e) => {
    // Destructure the "id" and "value" properties from the event target (input element)
    const { id, value } = e.target;
    // Update the form data state by merging the previous form data with the updated value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    // Call the validateForm function to perform form validation
    validateForm();
  };
  

  // Function to validate the form
  const validateForm = () => {
    // Select all input and select elements that have the "required" attribute
    const inputs = document.querySelectorAll("input[required], select[required]");
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

  // Event handler for the previous button click
  const handlePrevClick = () => {
    // Show a confirmation dialog to the user
    const confirmation = window.confirm(
      "Are you sure you want to go back? Any unsaved changes on this page will be lost."
    );
  
    // Check if the user confirmed the action
    if (confirmation) {
      // Store the form data in sessionStorage
      sessionStorage.setItem("formData", JSON.stringify(formData));
      // Redirect the user to page1
      window.location.href = "/page1";
    }
  };  

  // Event handler for the next button click
  const handleNextClick = async (e) => {
    // Check if the form is valid
    if (!isFormValid) {
      e.preventDefault();
      alert("Please fill in all the required fields.");
    } else if (existingDocId !== null) {
      // Update an existing document
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(accRef, {
        ...formData,
        progress: 2,
      },
      { merge: true }
      );
      console.log("document edited: ", accRef.id);
      // Save form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));
      // Redirect the user to page3
      window.location.href = "/page3";
      alert("Success! Your information on this page has been saved.");
    }
  };
  

  // Event handler for file input change
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
  
    // Check if an existing document ID exists
    if (existingDocId !== null) {
      // Create a reference to the existing document
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      // Update the document with the file URLs
      await updateDoc(accRef, {
        photos: fileURLs,
      });
      // Log a message indicating that the document has been updated
      console.log("document updated: ", accRef.id);
    } else {
      // Log an error message if an existing document ID is not found
      console.log("may namali lol");
    }
  };
  
  // Event handler for deleting a photo
  const handleDeletePhoto = (index) => {
    // Create a copy of the uploadedFiles array
    const updatedUploadedFiles = [...uploadedFiles];
    // Remove the file at the specified index from the copied array
    updatedUploadedFiles.splice(index, 1);
    // Update the uploadedFiles state with the modified array
    setUploadedFiles(updatedUploadedFiles);
  
    // Create a reference to the existing document
    const accRef = doc(collection(db, "accommodations"), existingDocId);
    // Create an updatedPhotos array by filtering out the deleted file and mapping the remaining file URLs
    const updatedPhotos = updatedUploadedFiles
      .filter((_, i) => i !== index)
      .map((file) => fileURLs[file]);
  
    // Update the document with the updatedPhotos array
    updateDoc(accRef, {
      photos: updatedPhotos,
    });
  };  

  // JSX structure and elements
  return (
    <div className="wrapper container">
      <h2>Add New Listing</h2>
      <h3>Room Details</h3>
      <hr />
      <form>
        <div>
          <label htmlFor="occupants-room">NUMBER OF OCCUPANTS (per room)*</label>
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
              Only a maximum of {MAX_COUNT} photos can be uploaded. Reupload files!
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
                    <button type="button" onClick={() => handleDeletePhoto(index)}>
                      <a>Delete</a>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="button" className="prev-btn" onClick={handlePrevClick}>
          <a>Prev</a>
        </button>
        <button type="button" className="next-btn" onClick={handleNextClick}>
          <a>Next</a>
        </button>
      </form>
    </div>
  );
};

export default Pg2;