import React from 'react';
import "./adminhome.scss";
import Search from '../../../components/search/Search';
import Option from '../../../components/option/Option';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/admin/header/Header';

const AdminHome = () => {
  return (
    <>
    <Header/>
    <Search/>
    <Option/>
    <Footer/>
    </>
  )
}

export default AdminHome