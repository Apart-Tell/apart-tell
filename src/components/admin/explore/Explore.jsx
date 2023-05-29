import React from 'react';
import Container from '../../explore/container/Container';
import { useEffect, useState } from 'react';
import { collection,doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

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
    <Container/>
    </>
  )
}

export default Explore
