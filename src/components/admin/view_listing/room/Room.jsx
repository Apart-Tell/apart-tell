import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useParams } from "react-router-dom";
import "./room.scss";

const Room = () => {
  const [accommodation, setAccommodations] = useState({});
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

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
    <div className="display-style container">
      <br />
      <h2>Room Details</h2>
      <br />
      {accommodation.occupants && (
        <p>Number of Occupants (per room): {accommodation.occupants}</p>
      )}

      {accommodation.length && accommodation.width && accommodation.metric && (
        <p>
          Room Dimension:
          <p>length: {accommodation.length}</p>
          <p>width: {accommodation.width}</p>
          <p>metric: {accommodation.metric}</p>
        </p>
      )}

      {accommodation.crType && <p>Comfort Room Type: {accommodation.crType}</p>}
      {uploadedPhotos && uploadedPhotos.length > 0 && (
        <div className="photo-list-wrapper">
          <p>Uploaded Photos: </p>
          <ul className="photo-list">
            {uploadedPhotos.map((photoUrl, index) => (
              <li key={index}>
                <img src={photoUrl} alt={`photo-${index}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Room;
