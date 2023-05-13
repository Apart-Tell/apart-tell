import React from 'react';
import "./adminhome.scss";
import Search from '../../../components/search/Search';
import Option from '../../../components/option/Option';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/admin/header/Header';
import Listings from "../../../components/listings/Listings";

const AdminHome = () => {
  return (
    <>
    <Header/>
    <Search/>
    <Option/>
    <Listings/>
    <Footer/>
    </>
  )
}

export default AdminHome