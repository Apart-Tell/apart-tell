import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useParams } from 'react-router-dom';
import "./management.scss";

const Management = () => {
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
        <h2>Management Details</h2>
        <br/>
        {/*Add feature such that only the input fields that are filled out are to be displayed in this component*/}
        <p>Owner's Name: {accommodation.ownerName}</p>
        <p>Owner's Phone Number:  {accommodation.ownerPhone}</p>
        <p>Owner's Email: {accommodation.ownerEmail}</p>
        <p>Caretaker's Name:  {accommodation.caretakerName}</p>
        <p>Caretaker's Phone:  {accommodation.caretakerPhone}</p>
      </div>
    </>
  )
}

export default Management;
