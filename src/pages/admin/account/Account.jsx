import React from 'react';
import './account.scss';
import Header from '../../../components/admin/header/Header';
import Footer from '../../../components/footer/Footer';

const Account = () => {
  return (
    <>
    <Header/>
    <div className="account container">
      <h2 className='account-h2'>My Account</h2>
      <div className="personal-information">
        <h3>Personal Information</h3>
      </div>

    </div>
    <Footer/>
  
    </>
  )
}

export default Account;