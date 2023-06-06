import React from 'react';
import "./edit_listing.scss";
import Header from '../../../components/admin/header/Header';
import Footer from '../../../components/admin/footer/Footer';
import Edit_Listing_Component from '../../../components/admin/edit_listing/Edit_Listing_Component';

const Edit_Listing = () => {
  return (
    <>
    <Header/>
    <Edit_Listing_Component/>
    <Footer/>
    </>
  )
}

export default Edit_Listing
