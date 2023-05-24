import React from 'react';
import "./viewlisting.scss";
import Header from '../../../components/admin/header/Header';
import Footer from '../../../components/footer/Footer';
import General from '../../../components/admin/view_listing/general/General';
import Room from '../../../components/admin/view_listing/room/Room';
import Billing from '../../../components/admin/view_listing/billing/Billing';
import Management from '../../../components/admin/view_listing/management/Management';

const ViewListing = () => {
  return (
    <>
    <Header/>
    <General/>
    <Room/>
    <Billing/>
    <Management/>
    <Footer/>
    </>
  )
}

export default ViewListing
