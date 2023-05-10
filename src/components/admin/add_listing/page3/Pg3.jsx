import React from 'react';
import { useState } from 'react';
import "./pg3.scss";

const Pg3 = () => {
  const [electricityChecked, setElectricityChecked] = useState(false);
  const [waterChecked, setWaterChecked] = useState(false);
  const [depositChecked, setDepositChecked] = useState(false);

  const handleElectricityChange = (event) => {
    setElectricityChecked(event.target.checked);
  };

  const handleWaterChange = (event) => {
    setWaterChecked(event.target.checked);
  };

  const handleDepositChange = (event) => {
    setDepositChecked(event.target.checked);
  };
  return (
    <>
    <div className='wrapper container'>
      <h2>Billing Details</h2>
      <form>
        <div>
          <label htmlFor='rental-fee-room'>Rental fee per room</label>
          <input type="text" id='rental-fee-room' pattern="^\d+(?:\.\d{1,2})?$" placeholder="ex. 1000.00" title="Please enter a valid numerical currency amount" required></input>
        </div>
        <br/>
        <div>
          <label htmlFor='rental-fee-head'>Rental fee per head</label>
          <input type="text" id="rental-fee-head" pattern="^\d+(?:\.\d{1,2})?$" placeholder="ex. 1000.00" title="Please enter a valid numerical currency amount" required></input>
        </div>
        <div>
        <br/>
        <div>
            <label>Additional fees</label>
                <br/>
                <div>       
                    <label htmlFor='electricity'>
                        <input type="checkbox" id="electricity" onChange={handleElectricityChange}  required/>
                        Electricity
                    </label>
                    {electricityChecked && (
                      <input type="text" placeholder="Enter electricity fee (per month)" pattern="^\d+(?:\.\d{1,2})?$"  title="Please enter a valid numerical currency amount" required />
                    )}
                    <label htmlFor='water'>
                      <br/>
                        <input type="checkbox" id='water' onChange={handleWaterChange} required/>
                        Water
                    </label>
                    {waterChecked && (
                      <input type="text" placeholder="Enter water fee (per month)" pattern="^\d+(?:\.\d{1,2})?$"  title="Please enter a valid numerical currency amount" required />
                    )}
                    <label htmlFor='deposit'>
                        <br/>
                        <input type="checkbox" id="deposit" onChange={handleDepositChange} required/>
                        Deposit
                    </label>
                    {depositChecked && (
                      <input type="text" placeholder="Enter deposit fee (per month)" pattern="^\d+(?:\.\d{1,2})?$"  title="Please enter a valid numerical currency amount" required />
                    )}
                </div>                
            </div>
        </div>
        <button type="button" className='prev-btn'>
          <a href='/page2'>Prev</a>
        </button>
        <button type="button" className='next-btn'>
          <a href='/page4'>Next</a>
        </button>
      </form>
    </div>
    </>
  )
}

export default Pg3
