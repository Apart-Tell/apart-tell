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
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";

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

  const currentUser = auth.currentUser;
  const [existingDocId, setExistingDocId] = useState(null);

  useEffect(() => {
    const checkExistingDoc = async () => {
      const q = query(
        collection(db, "accommodations"),
        where("progress", "<", 4),
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
  }, []);

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
  const handleNextClick = async (e) => {
    // Perform any additional validation if needed
    if (!isFormValid) {
      e.preventDefault();
      alert("Please fill in all the required fields.");
    } else if (existingDocId != null) {
      const accRef = doc(collection(db, "accommodations"), existingDocId);
      await setDoc(
        accRef,
        {
          ...formData,
          progress: 1,
          editedBy: currentUser.uid,
          editedAt: serverTimestamp(),
        },
        { merge: true }
      );
      console.log("document created: ", accRef.id);
      window.location.href = "/page2";
      alert("Success! Your information on this page has been saved.");
    } else {
      const docRef = collection(db, "accommodations");
      await setDoc(doc(docRef), {
        ...formData,
        editedBy: currentUser.uid,
        editedAt: serverTimestamp(),
        createdBy: currentUser.uid,
        progress: 1,
      });
      console.log("document successfully written");
      window.location.href = "/page2";
      alert("Success! Your information on this page has been saved.");
    }
    //      const currentUser = auth.currentUser;
    //      const accRef = doc(collection(db, "accommodations"), currentUser.uid);
    //      setDoc(accRef, {
    //        ...formData,
    //        progress: 1,
    //      })
    //        .then((accRef) => {
    //          console.log("document successfully written");
    // console.log("props history", history);
    //navigate("/page2", {state: {docUid}});
    //        })
    //        .catch((error) => {
    //          console.error("error writing document: ", error);
    //        });
  };

  return (
    <>
      <div className="wrapper container">
        <h2>Add New Listing</h2>
        <div className="form-wrapper">
          <form>
            <div className="h3-wrapper">
              <h3 className="acc-details-txt">General Accommodation Details</h3>
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
      </div>
    </>
  );
};

export default Pg1;
