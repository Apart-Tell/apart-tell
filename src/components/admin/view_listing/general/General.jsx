import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useParams } from "react-router-dom";
import "./general.scss";

const General = () => {
  // State variables to store data from Firestore and other UI states
  const [accommodation, setAccommodations] = useState({});
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [roomDimension, setRoomDimension] = useState("");

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
          setAccommodations(data);
          if (data.photos) {
            setUploadedPhotos(data.photos);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    // Fetch the accommodation data when the component mounts
    fetchData();
  }, [id]);

  return (
    <>
      <div className="display-style container">
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

        <br/>

        <h3>Description</h3>
        <hr/>
        {/* Display the accommodation description if available */}
        {accommodation.accDescription && (
          <p>{accommodation.accDescription}</p>
        )}

        {/* Display the list of amenities if available */}
        <br/>

        <h3>Amenities</h3>
        <hr/>
        {accommodation.amenities && (
          <p>{accommodation.amenities && accommodation.amenities.join(", ")}</p>
        )}

        <br/>

        <h3>Nearby</h3>
        <hr/>
        {/* Display the list of nearby locations if available */}
        {accommodation.accAddress && (
          <p>{accommodation.nearby && accommodation.nearby.join(", ")}</p>
        )}

        <br/>

        <h3>Rules</h3>
        <hr/>
        {/* Display the list of rules if available */}
        {accommodation.accRules && (
          <ul className="rules-list">
            {accommodation.accRules.split('\n').map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        )}

        <br/>

        <h3>Number of occupants (per room)</h3>
        <hr/>
        {/* Display the number of occupants allowed per room if available */}
        {accommodation.occupants && (
         <p>Only {accommodation.occupants} occupants are allowed per room.</p>
        )}

        {/* Display room dimension if available */}
        {roomDimension && (
          <>
          <br/>
          <h3>Room dimension</h3>
          <hr/>
          {/* Display the room dimensions if available */}
          {accommodation.length && accommodation.width && accommodation.metric && (
            <p>
              Each room is approximately {accommodation.length} x {accommodation.width} {accommodation.metric}
            </p>
          )}
          </>
        )}

        <br/>
        <h3>Comfort room type</h3>
        <hr/>
        {/* Display the type of comfort rooms available if available */}
        {accommodation.crType && (
          <p>This accommodation has comfort rooms of {accommodation.crType} type.</p>
        )}
        <br/>

        <h3>Rental fee (per room)</h3>
        <hr/>
        {/* Display the rental fee per room if available */}
          {accommodation.roomFee && (
            <p>Each room has a rental fee of PHP {accommodation.roomFee}.</p>
          )}
        
        {/* Display the rental fee per head if available */}
        {accommodation.headFee && (
            <>
              <br/>
              <h3>Rental fee (per head)</h3>
              <hr/>
              <p>Each room has a rental fee of PHP {accommodation.headFee} per head.</p>
            </>
          )}

        {/* Display additional fees if available */}
        {/*Code doesn't display inputted data. Needs to be fixed*/}
          {accommodation.electricityFee && accommodation.waterFee && accommodation.deposit && (
          <p className="additional-fees-style">
            Additional Fees:
            <p>Electricity: {accommodation.electricityFee}</p>
            <p>Water: {accommodation.waterFee}</p>
            <p>Deposit: {accommodation.deposit}</p>
          </p>
        )}

        <br/>
        <h3>Contact</h3>
        <hr/>
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
            <br/>
            <h3>Gallery</h3>
            <hr/>
            <ul className="photo-list">
              {uploadedPhotos.map((photoUrl, index) => (
                <li key={index}>
                  <img src={photoUrl} alt={`photo-${index}`} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default General;
