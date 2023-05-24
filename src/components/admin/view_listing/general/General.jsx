import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useParams } from "react-router-dom";
import "./general.scss";

const General = () => {
  const [accommodation, setAccommodations] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "accommodations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAccommodations(docSnap.data());
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
        <h2>Listing Information</h2>
        <hr />
        <br />
        <br />
        <h2>General Accommodation Details</h2>
        <br />
        {accommodation.accName && <p> Name: {accommodation.accName}</p>}
        {accommodation.accAddress && <p>Address: {accommodation.accAddress}</p>}
        {accommodation.accType && <p>Type: {accommodation.accType}</p>}
        {accommodation.accDescription && (
          <p>Description: {accommodation.accDescription}</p>
        )}
        {accommodation.accRules && <p>Rules: {accommodation.accRules}</p>}
        {accommodation.amenities && (
          <p>
            Amenities:{" "}
            {accommodation.amenities && accommodation.amenities.join(", ")}
          </p>
        )}
        {accommodation.accAddress && (
          <p>
            Nearby: {accommodation.nearby && accommodation.nearby.join(", ")}
          </p>
        )}
      </div>
    </>
  );
};

export default General;
