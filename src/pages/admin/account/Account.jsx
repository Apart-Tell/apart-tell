import React from 'react';
import './account.scss';
import Header from '../../../components/admin/header/Header';
import Footer from '../../../components/footer/Footer';

const Account = () => {
  return (
    <>
    <Header/>
    <div className="container">
      <h1>My Account</h1>
      <h2>Personal Information</h2>
    </div>
    <Footer/>
  
    </>
  )
}

export default Account;