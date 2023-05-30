import React, { useState, useEffect } from "react";
import { collection, updateDoc, doc, query, limit, where, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../../../firebase";
import "./pg2.scss";

const MAX_COUNT = 4;

const Pg2 = () => {
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

  useEffect(() => {
    const checkExistingDoc = async () => {
      const q = query(collection(db, "accommodations"), where("progress", "==", 1), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const firstDoc = querySnapshot.docs[0].id;
        setExistingDocId(firstDoc);
        console.log("exists");
      } else {
        setExistingDocId(null);
        console.log("does not");
      }
    };
    checkExistingDoc();
    console.log("checking");
    console.log(existingDocId);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    validateForm();
  };

  const validateForm = () => {
    const inputs = document.querySelectorAll("input[required], select[required]");
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
  };

  const handlePrevClick = () => {
    const confirmation = window.confirm(
      "Are you sure you want to go back? Any unsaved changes on this page will be lost."
    );

    if (confirmation) {
      sessionStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "/page1";
    }
  };

  const handleNextClick = async (e) => {
    if (!isFormValid) {
      e.preventDefault();
      alert("Please fill in all the required fields.");
    } else if (existingDocId !== null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(accRef, {
        ...formData,
        progress: 2,
      },
      { merge: true }
      );
      console.log("document edited: ", accRef.id);
      localStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "/page3";
      alert("Success! Your information on this page has been saved.");
    }
  };

  const handleFileEvent = async (e) => {
    const chosenFiles = Array.from(e.target.files);
    const fileURLs = [];
    const updatedUploadedFiles = [];

    alert("Uploading files... This might take some time.");

    if (chosenFiles.length + uploadedFiles.length > MAX_COUNT) {
      setFileLimit(true);
      return;
    } else {
      setFileLimit(false);
    }

    for (const file of chosenFiles) {
      const storageRef = ref(getStorage(), `room_photos/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("download link to your file: ", downloadURL);
      fileURLs.push(downloadURL);
      updatedUploadedFiles.push(file);
    }

    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      ...updatedUploadedFiles,
    ]);

    if (existingDocId !== null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await updateDoc(accRef, {
        photos: fileURLs,
      });
      console.log("document updated: ", accRef.id);
    } else {
      console.log("may namali lol");
    }
  };

  const handleDeletePhoto = (index) => {
    const updatedUploadedFiles = [...uploadedFiles];
    updatedUploadedFiles.splice(index, 1);
    setUploadedFiles(updatedUploadedFiles);

    const accRef = doc(collection(db, "accommodations"), existingDocId);
    const updatedPhotos = updatedUploadedFiles
      .filter((_, i) => i !== index)
      .map((file) => fileURLs[file]);

    updateDoc(accRef, {
      photos: updatedPhotos,
    });
  };

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
