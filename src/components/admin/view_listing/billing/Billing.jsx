import React, { useEffect, useState } from "react";
import "./billing.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useParams } from "react-router-dom";

const Billing = () => {
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
        <br />
        <h2>Billing Details</h2>
        <br />
        {accommodation.roomFee && (
          <p>Rental Fee (per room): {accommodation.roomFee}</p>
        )}
        {accommodation.headFee && (
          <p>Rental Fee (per head): {accommodation.headFee}</p>
        )}
        

      {accommodation.electricityFee && accommodation.waterFee && accommodation.deposit && (
        <p className="additional-fees-style">
          Additional Fees:
          <p>Electicity: {accommodation.electricityFee}</p>
          <p>Water: {accommodation.waterFee}</p>
          <p>Deposit: {accommodation.deposit}</p>
        </p>
      )}
      </div>
    </>
  );
};

export default Billing;
