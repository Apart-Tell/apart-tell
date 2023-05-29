import React from 'react';
import "./adminhome.scss";
import Search from '../../../components/search/Search';
import Footer from '../../../components/admin/footer/Footer';
import Header from '../../../components/admin/header/Header';
import Options from '../../../components/admin/options/Options';
import Listings from '../../../components/admin/listings/Listings';

const AdminHome = () => {
  return (
    <>
    <Header/>
    {/*Must be updated for Search component (admin view)*/}
    <Search/>
    <Options/>
    <Listings/>
    <Footer/>
    </>
  )
}

export default AdminHome