import React from 'react';
import { useState } from 'react';
import "./pg3.scss";

const Pg3 = () => {
  // handles rental fee/room data
  const [rentalFeeRoom, setRentalFeeRoom] = useState('');
  const handleRentalFeeRoomChange = (event) => {
    setRentalFeeRoom(event.target.value);
  };

  // handles rental fee/head data
  const [rentalFeeHead, setRentalFeeHead] = useState('');
  const handleRentalFeeHeadChange = (event) => {
    setRentalFeeHead(event.target.value);
  };

  // handles electricity data (checked or unchecked)
  const [electricityChecked, setElectricityChecked] = useState(false);
  const handleElectricityChange = (event) => {
    setElectricityChecked(event.target.checked);
  };

  // handles electricity fee data
  const [electricityFee, setElectricityFee] = useState('');
  const handleElectricityFeeChange = (event) => {
    setElectricityFee(event.target.value);
  };

  // handles water data (checked or unchecked)
  const [waterChecked, setWaterChecked] = useState(false);
  const handleWaterChange = (event) => {
    setWaterChecked(event.target.checked);
  };

  // handles water fee data
  const [waterFee, setWaterFee] = useState('');
  const handleWaterFeeChange = (event) => {
    setWaterFee(event.target.value);
  };

  // handles deposit data (checked or unchecked)
  const [depositChecked, setDepositChecked] = useState(false);
  const handleDepositChange = (event) => {
    setDepositChecked(event.target.checked);
  };

  // handles deposit fee data (checked or unchecked)
  const [depositFee, setDepositFee] = useState('');
  const handleDepositFeeChange = (event) => {
    setDepositFee(event.target.value);
  };

  // form validation: checks whether all input fields are filled out before letting the user be redirected to the next page
  const handleNextClick = (e) => {
    // Perform any additional validation if needed
    if (!rentalFeeRoom || !rentalFeeHead) {
      e.preventDefault();
      alert('Please fill in all the required fields.');
    } else {
      // Proceed to the next page
      window.location.href = '/page4';
    }
  };

  return (
    <>
    <div className='wrapper container'>
      <h2>Billing Details</h2>
      <form>
        <div>
          <label htmlFor='rental-fee-room'>Rental fee per room</label>
          <input 
            type="text" 
            id='rental-fee-room' 
            pattern="^\d+(?:\.\d{1,2})?$" 
            placeholder="ex. 1000.00" 
            title="Please enter a valid numerical currency amount" 
            value={rentalFeeRoom}
            onChange={handleRentalFeeRoomChange}
            required
          ></input>
        </div>
        <br/>
        <div>
          <label htmlFor='rental-fee-head'>Rental fee per head</label>
          <input 
            type="text" 
            id="rental-fee-head" 
            pattern="^\d+(?:\.\d{1,2})?$" 
            placeholder="ex. 1000.00" 
            title="Please enter a valid numerical currency amount"
            value={rentalFeeHead}
            onChange={handleRentalFeeHeadChange} 
            required
          ></input>
        </div>
        <div>
        <br/>
        <div>
            <label>Additional fees</label>
                <br/>
                <div>       
                    <label htmlFor='electricity'>
                        <input type="checkbox" id="electricity" onChange={handleElectricityChange}/>
                        Electricity
                    </label>
                    {electricityChecked && (
                      <input type="text" placeholder="Enter electricity fee (per month)" pattern="^\d+(?:\.\d{1,2})?$"  title="Please enter a valid numerical currency amount" value={electricityFee} onChange={handleElectricityFeeChange}/>
                    )}
                    <label htmlFor='water'>
                      <br/>
                        <input type="checkbox" id='water' onChange={handleWaterChange}/>
                        Water
                    </label>
                    {waterChecked && (
                      <input type="text" placeholder="Enter water fee (per month)" pattern="^\d+(?:\.\d{1,2})?$"  title="Please enter a valid numerical currency amount" value={waterFee} onChange={handleWaterFeeChange}/>
                    )}
                    <label htmlFor='deposit'>
                        <br/>
                        <input type="checkbox" id="deposit" onChange={handleDepositChange}/>
                        Deposit
                    </label>
                    {depositChecked && (
                      <input type="text" placeholder="Enter deposit fee (per month)" pattern="^\d+(?:\.\d{1,2})?$"  title="Please enter a valid numerical currency amount" value={depositFee} onChange={handleDepositFeeChange}/>
                    )}
                </div>                
            </div>
        </div>
        <button type="button" className='prev-btn'>
          <a href='/page2'>Prev</a>
        </button>
        <button type="button" className='next-btn' onClick={handleNextClick}>
          <a>Next</a>
        </button>
      </form>
    </div>
    </>
  )
}

export default Pg3;