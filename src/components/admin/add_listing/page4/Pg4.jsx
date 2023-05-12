import React from 'react';
import { useState } from 'react';
import './pg4.scss';

const Pg4 = () => {
    // handles owner name data
    const [ownerName, setOwnerName] = useState('');
    const handleOwnerNameChange = (event) => {
        setOwnerName(event.target.value);
    };

    // handles owner phone number data
    const [ownerPhone, setOwnerPhone] = useState('');
    const handleOwnerPhoneChange = (event) => {
        setOwnerPhone(event.target.value);
    };

    // handles owner email address data
    const [ownerEmail, setOwnerEmail] = useState('');
    const handleOwnerEmailChange = (event) => {
        setOwnerEmail(event.target.value);
    };

    // handles caretaker name data
    const [caretakerName, setCaretakerName] = useState('');
    const handleCaretakerNameChange = (event) => {
        setCaretakerName(event.target.value);
    };

    // handles caretaker phone data
    const [caretakerPhone, setCaretakerPhone] = useState('');
    const handleCaretakerPhoneChange = (event) => {
        setCaretakerPhone(event.target.value);
    };

    // handles submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if ( // if one or more input fields are not filled out
            ownerName.trim() === '' ||
            ownerPhone.trim() === '' ||
            ownerEmail.trim() === '' ||
            caretakerName.trim() === '' ||
            caretakerPhone.trim() === ''
        ) {
        alert('Please fill in all the required fields.');
        } else {
        // Perform form submission or other operations
        // All fields are filled, proceed with submission
            window.location.href = '/user/directory';
        }
    };

  return (
   <>
   <div className='pg4-wrapper container'>
    <h2>Management details</h2>
    <form>
        <div>
            <label htmlFor='owner-name'>Owner's name</label>
            <input 
                type='text' 
                id='owner-name' 
                value={ownerName}
                onChange={handleOwnerNameChange}
                required
            ></input>
        </div>
        <br/>
        <div>
            <label htmlFor='owner-phonenum' required>Owner's phone number</label>
            <input 
                type="tel" 
                id='owner-phonenum' 
                pattern="[0-9]{11}" 
                title="Please enter a valid phone number (ex. 091234568900)" 
                value={ownerPhone}
                onChange={handleOwnerPhoneChange}
                required
            ></input>
        </div>
        <br/>
        <div>
            <label htmlFor='owner-email'>Owner's e-mail</label>
            <input 
                type="text" 
                id='owner-email' 
                title="Please enter a valid e-mail" 
                value={ownerEmail}
                onChange={handleOwnerEmailChange}
                required
            ></input>
        </div>
        <br/>
        <div>
            <label htmlFor='caretaker-name'>Caretaker's name</label>
            <input 
                type="text" 
                id='caretaker-name' 
                value={caretakerName}
                onChange={handleCaretakerNameChange}
                required
            ></input>
        </div>
        <br/>
        <div>
            <label htmlFor='caretaker-phonenum'>Caretaker's phone number</label>
            <input 
                type="tel" 
                id='owner-email' 
                pattern="[0-9]{11}" 
                title="Please enter a valid phone number" 
                value={caretakerPhone}
                onChange={handleCaretakerPhoneChange}
                required
            ></input>
        </div>
        <button type='button' className='prev-btn'>
            <a href='/page3'>Prev</a>
        </button>
        <button type='button' onClick={handleSubmit}>
            <a>Submit</a>
        </button>
    </form>
   </div>
   </>
  )
}

export default Pg4;
