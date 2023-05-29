import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useParams } from "react-router-dom";
import "./general.scss";

const General = () => {
  const [accommodation, setAccommodations] = useState({});
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const [roomDimension, setRoomDimension] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "accommodations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAccommodations(data);
          if (data.photos) {
            console.log("Uploaded Photos:", data.photos);
            setUploadedPhotos(data.photos);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="display-style container">
        {accommodation.accName && <h2>{accommodation.accName}</h2>}
        {accommodation.accAddress && <p>{accommodation.accAddress}</p>}

        {uploadedPhotos && uploadedPhotos.length > 0 && (
          <div className="photo-list-wrapper">
            <div className="main-photo-container">
              <img
                className="main-photo"
                src={uploadedPhotos[3]}
                alt={`photo-0`}
              />
            </div>
          </div>
        )}

        <br/>

        <h3>Description</h3>
        {accommodation.accDescription && (
          <p>{accommodation.accDescription}</p>
        )}

        <br/>

        <h3>Amenities</h3>
        {accommodation.amenities && (
          <p>{accommodation.amenities && accommodation.amenities.join(", ")}</p>
        )}

        <br/>

        <h3>Nearby</h3>
        {accommodation.accAddress && (
          <p>{accommodation.nearby && accommodation.nearby.join(", ")}</p>
        )}

        <br/>

        <h3>Rules</h3>
        {accommodation.accRules && (
          <ul className="rules-list">
            {accommodation.accRules.split('\n').map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        )}

        <br/>

        <h3>Number of occupants (per room)</h3>
        {accommodation.occupants && (
         <p>Only {accommodation.occupants} occupants are allowed per room.</p>
        )}

        {roomDimension && (
          <>
          <br/>
          <h3>Room dimension</h3>
          {accommodation.length && accommodation.width && accommodation.metric && (
            <p>
              Each room is approximately {accommodation.length} x {accommodation.width} {accommodation.metric}
            </p>
          )}
          </>
        )}

        <br/>
        <h3>Comfort room type</h3>
        {accommodation.crType && (
          <p>This accommodation have comfort rooms of {accommodation.crType} type.</p>
        )}
        <br/>

        <h3>Rental fee (per room)</h3>
          {accommodation.roomFee && (
            <p>Each room has a rental fee of PHP {accommodation.roomFee}.</p>
          )}
        
        {accommodation.headFee && (
            <>
              <br/>
              <h3>Rental fee (per head)</h3>
              <p>Each room has a rental fee of PHP {accommodation.headFee} per head.</p>
            </>
          )}

        {/*Code doesn't display inputted data. Needs to be fixed*/}
          {accommodation.electricityFee && accommodation.waterFee && accommodation.deposit && (
          <p className="additional-fees-style">
            Additional Fees:
            <p>Electicity: {accommodation.electricityFee}</p>
            <p>Water: {accommodation.waterFee}</p>
            <p>Deposit: {accommodation.deposit}</p>
          </p>
        )}
      
        {uploadedPhotos && uploadedPhotos.length > 0 && (
          <>
            <br/>
            <h3>Gallery</h3>
            <ul className="photo-list">
              {uploadedPhotos.map((photoUrl, index) => (
                <li key={index}>
                  <img src={photoUrl} alt={`photo-${index}`} />
                </li>
              ))}
            </ul>
          </>
        )}

        <br/>
        <h3>Contact</h3>
        {accommodation.ownerName && (
            <p>Owner's name: {accommodation.ownerName}</p>   
        )}
        {accommodation.ownerPhone && (
            <p>Owner's phone number: {accommodation.ownerPhone}</p>   
        )}
        {accommodation.ownerEmail && (
          <>
            <p>Owner's e-mail address: {accommodation.ownerEmail}</p>  
          </>
        )}
         {accommodation.caretakerName && (
          <>
            <p>Caretaker's name: {accommodation.caretakerName}</p>  
          </>
        )}
         {accommodation.caretakerPhone && (
          <>
            <p>Caretaker's phone number: {accommodation.caretakerPhone}</p>  
          </>
        )}
      </div>
    </>
  );
};

export default General;
