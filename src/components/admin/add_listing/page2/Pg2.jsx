import React from "react";
import { useState } from "react";
import "./pg2.scss";
import { useNavigate } from "react-router-dom";
import {
  setDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const MAX_COUNT = 4;

const Pg2 = () => {
  // const navigate=useNavigate();
  // const {docUid}=navigate.getState().state;
  // handles occupants data
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    occupants: "",
    dimensions: "",
    crType: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  // handles input change for OCCUPANTS
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormdata) => {
      return {
        ...prevFormdata,
        [id]: value,
      };
    });
    validateForm();
    console.log(id, value);
  };

  // handles file uplaod
  const handleUploadFiles = async (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    for (const file of files) {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          break;
        } else {
          const storageRef = ref(getStorage(), `room_photos/${file.name}`);
          await uploadBytes(storageRef, file);
        }
      }
    }
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.from(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const validateForm = () => {
    const { occupants, dimensions, crType } = formData;
    if (occupants == "" || dimensions == "" || crType == "") {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  // checks whether all input fields are filled out
  const handleNextClick = async (e) => {
    // Perform any additional validation if needed
    if (!isFormValid) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      const accRef = doc(collection(db, "accommodations"), currentUser.uid);
      await updateDoc(accRef, {
        ...formData,
        progress: 2,
       // photos: photoRefs,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", accRef.id);
      window.location.href = "/page3";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="wrapper container">
        <h2>Room Details</h2>
        <form>
          <div>
            <label htmlFor="occupants-room">Number of occupants per room</label>
            <input
              type="number"
              id="occupants"
              min={1}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div>
            <br />
            <label htmlFor="room-dimension">Room Dimension</label>
            <input
              type="text"
              id="dimensions"
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div>
            <br />
            <label>Comfort Room Type</label>
            <span>
              <input
                type="radio"
                id="crType"
                name="crType"
                value="communal"
                onChange={handleInputChange}
                required
              ></input>
              <label htmlFor="communal"> Communal/Shared</label>
            </span>
            <span>
              <input
                type="radio"
                id="crType"
                name="crType"
                value="private"
                onChange={handleInputChange}
                required
              ></input>
              <label htmlFor="private"> Private</label>
            </span>
          </div>
          <br></br>
          <div>
            <label htmlFor="photos">Upload photos</label>
            <br />
            <input
              id="fileUpload"
              type="file"
              multiple
              accept="image/png"
              onChange={handleFileEvent}
              disabled={fileLimit}
              required
            />
            <br />

            <label htmlFor="fileUpload">
              <br />
              <a className={`btn btn-primary ${!fileLimit ? "" : "disabled"} `}>
                Uploaded Files
              </a>
            </label>

            <div className="uploaded-files-list">
              {uploadedFiles.map((file) => (
                <div>{file.name}</div>
              ))}
            </div>
          </div>
          <button type="button" className="prev-btn">
            <a href="/page1">Prev</a>
          </button>
          <button type="button" className="next-btn" onClick={handleNextClick}>
            <a>Next</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default Pg2;
