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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  //const [fileURL, setFileURL]=useState([]);
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
  async function handleFileEvent(e) {
    const chosenFiles = Array.from(e.target.files);
    const fileURLs=[];
    // Upload the images to Firebase Storage
    for (const file of chosenFiles) {
      const storageRef = ref(getStorage(), `room_photos/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("download link to your file: ", downloadURL);
      fileURLs.push(downloadURL);
    }
  
    // Send the references to the images to Firebase Firestore
    const currentUser = auth.currentUser;
    const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    await updateDoc(accRef, {
      photos: fileURLs,
    });
    
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
  //    const chosenFiles = Array.from(e.target.files);
  //    if (!chosenFiles.length) {
    //    alert("Please upload at least one file.");
   //     return;
   //   }
    //  const photoUrls = await getPhotoUrls(chosenFiles);
      await updateDoc(accRef, {
        ...formData,
    //    photos: photoUrls,
        progress: 2,
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
