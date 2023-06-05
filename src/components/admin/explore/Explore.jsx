import React from 'react';
import { useEffect, useState } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import Admin_Container from "../explore/admin_container/Admin_Container";

const Explore = () => {
    const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'accommodations'));
        const fetchedListings = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);


  return (
    <>
    <Admin_Container/>
    </>
  )
}

export default Explore;
