import React, { useEffect, useState } from 'react';
import "./billing.scss";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useParams } from 'react-router-dom';

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
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
     <div className='display-style container'>
      <br/>
      <h2>Billing Details</h2>
      <br/>
      <p>Rental Fee (per room): {accommodation.roomFee}</p>
      <p>Rental Fee (per head): {accommodation.headFee}</p>
      {/*Add a feature that only checked items and the data that goes with the items are displayed*/}
      <p>Additional Fees:</p>
      <p className='additional-fees-style'>Electricity: {accommodation.electricityFee}</p>
      <p className='additional-fees-style'>Water: {accommodation.waterFee}</p>
      <p className='additional-fees-style'>Deposit: {accommodation.deposit}</p>
      </div>
    </>
  )
}

export default Billing;
