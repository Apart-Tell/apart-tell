import React from 'react';
import './account.scss';
import Header from '../../../components/admin/header/Header';
import Footer from '../../../components/footer/Footer';

const Account = () => {
  return (
    <>
    <Header/>
    <div className="account-wrapper container">

      <div className="account-header">
        <h2>My Account</h2>
      </div>

      <div className="account-section">

        <form action="" className="account-form">
          <h3>Personal Information</h3>
          <hr />

          <div className="acc-info-container">

            <div className="account-info">
              <label htmlFor="fname">FIRST NAME</label>
              <input type="text" id='fname'/>
            </div>
            <div className="account-info">
              <label htmlFor="mname">MIDDLE NAME</label>
              <input type="text" id='mname'/>
            </div>
            <div className="account-info">
              <label htmlFor="lname">LAST NAME</label>
              <input type="text" id='lname'/>
            </div>
            <div className="account-info">
              <label htmlFor="pnum">PHONE NUMBER</label>
              <input type="number" id='pnum'/>
            </div>

          </div>
          <div className="account-save-btn">
              <button type="submit">Save</button>
          </div>
        </form>

        <form action="" className="account-form">
          <h3>E-mail Address</h3>
          <hr />

          <div className="acc-info-container">

            <div className="account-info">
              <label htmlFor="email">E-MAIL ADDRESS</label>
              <input type="text" id='email'/>
            </div>

          </div>
          <div className="account-save-btn">
              <button type="submit">Save</button>
          </div>
        </form>

        <form action="" className="account-form">
          <h3>Password</h3>
          <hr />

          <div className="password-info-container">

            <div className="account-info">
              <label htmlFor="currpass">CURRENT PASSWORD</label>
              <input type="text" id='currpass'/>
            </div>
            <div className="account-info">
              <label htmlFor="newpass">NEW PASSWORD</label>
              <input type="text" id='newpass'/>
            </div>
            <div className="account-info">
              <label htmlFor="confirmpass">CONFIRM PASSWORD</label>
              <input type="text" id='confirmpass'/>
            </div>

          </div>
          <div className="account-save-btn">
              <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>

    <Footer/>

    </>
  )
}

export default Account;