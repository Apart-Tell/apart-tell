import React from 'react';
import "./adminhome.scss";
import Footer from '../../../components/admin/footer/Footer';
import Header from '../../../components/admin/header/Header';
import Options from '../../../components/admin/options/Options';
import Listings from '../../../components/admin/listings/Listings';
import { Search } from '../../../components/admin/search/Search';

const AdminHome = () => {
  return (
    <>
    <Header/>
    <Search/>
    <Options/>
    <Listings/>
    <Footer/>
    </>
  )
}

export default AdminHome