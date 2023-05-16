import React from "react";
import { useState, useEffect } from "react";
import "./pg2.scss";
import {
  collection,
  updateDoc,
  doc,
  query,
  limit,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MAX_COUNT = 4;

const Pg2 = () => {
  // const {docUid}=navigate.getState().state;
  // handles occupants data
  const [formData, setFormData] = useState({
    occupants: "",
    dimensions: "",
    crType: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  //const [fileURL, setFileURL]=useState([]);
  // handles input change for OCCUPANTS

  const currentUser = auth.currentUser;
  const [existingDocId, setExistingDocId] = useState(null);
  useEffect(() => {
    const checkExistingDoc = async () => {
      const q = query(
        collection(db, "accommodations"),
        where("progress", "==", 1),
        limit(1)
      );
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
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevFormdata) => {
      return {
        ...prevFormdata,
        [id]: value,
      };
    });
    validateForm();
    // console.log(name, value);
  };
  
  const validateForm = () => {
    const inputs = document.querySelectorAll(
      "input[required], select[required]"
    );
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
      }
    });
    setIsFormValid(isValid);
  };

  // checks whether all input fields are filled out
  const handleNextClick = async () => {
    // Perform any additional validation if needed
    if (!isFormValid) {
      alert("Please fill in all the required fields.");
      e.preventDefault();
      return;
    } else if (existingDocId != null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 2,
        },
        { merge: true }
      );
      console.log("document updated: ", accRef.id);
      window.location.href = "/page3";
    }
    //try {
    //      const currentUser = auth.currentUser;
    //      const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    //      await updateDoc(accRef, {
    //        ...formData,
    //        progress: 2,
    //        createdAt: serverTimestamp(),
    //      });
    //      console.log("Document written with ID: ", accRef.id);
    //     window.location.href = "/page3";
    //} catch (error) {
    //      console.error("Error adding document: ", error);
    //    }
  };

  const handleFileEvent = async (e) => {
    const chosenFiles = Array.from(e.target.files);
    const fileURLs = [];
    const updatedUploadedFiles = [];

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

    if (existingDocId != null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(
        accRef,
        {
          photos: fileURLs,
        },
        { merge: true }
      );
      console.log("document updated: ", accRef.id);
      //const currentUser = auth.currentUser;
      //const accRef = doc(collection(db, "accommodations"), currentUser.uid);
      //await updateDoc(accRef, {
      //  photos: fileURLs,
    } else {
      console.log("may namali lol: ");
    }
  };

  // Issue: Will refresh the whole page when the 1st uploaded photo is
  const handleDeletePhoto = (index) => {
    const updatedUploadedFiles = [...uploadedFiles];
    updatedUploadedFiles.splice(index, 1);
    setUploadedFiles(updatedUploadedFiles);

    // Update the photos array in Firebase Firestore
    const currentUser = auth.currentUser;
    const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    const updatedPhotos = updatedUploadedFiles
      .filter((_, i) => i !== index)
      .map((file) => fileURLs[file]);

    updateDoc(accRef, {
      photos: updatedPhotos,
    });
  };
  

  const handleFileEvent = async (e) => {
    const chosenFiles = Array.from(e.target.files);
    const fileURLs = [];
    const updatedUploadedFiles = [];

    if (chosenFiles.length + uploadedFiles.length > MAX_COUNT) {
      setFileLimit(true);
      return;
    } else {
      setFileLimit(false);
    }

    for (const file of chosenFiles) {
      const storageRef = ref(
        getStorage(),
        `room_photos/${file.name}`
      );
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

    const currentUser = auth.currentUser;
    const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    await updateDoc(accRef, {
      photos: fileURLs,
    });
  };

  // Issue: Will refresh the whole page when the 1st uploaded photo is
  const handleDeletePhoto = (index) => {
    const updatedUploadedFiles = [...uploadedFiles];
    updatedUploadedFiles.splice(index, 1);
    setUploadedFiles(updatedUploadedFiles);
  
    // Update the photos array in Firebase Firestore
    const currentUser = auth.currentUser;
    const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    const updatedPhotos = updatedUploadedFiles
      .filter((_, i) => i !== index)
      .map((file) => fileURLs[file]);
  
    updateDoc(accRef, {
      photos: updatedPhotos,
    });
  };
  
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
            ></input>
          </div>
          <div>
            <br />
            <label htmlFor="room-dimension">ROOM DIMENSION*</label>
            <input
              type="text"
              id="dimensions"
              onChange={handleInputChange}
              required
            ></input>
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
          <br></br>
          <div>
            <label>UPLOAD PHOTOS</label>
            <br />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileEvent}
            ></input>
            <br />
            {fileLimit && (
              <p>
                Only a maximum of {MAX_COUNT} photos can be uploaded. Reupload
                files!
              </p>
            )}
            {uploadedFiles.length > 0 && (
              <div>
                <br />
                <br />
                <label>UPLOADED PHOTOS</label>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`photo-${index}`}
                      />
                      <button onClick={() => handleDeletePhoto(index)}>
                        <a>Delete</a>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
