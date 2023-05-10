import React from 'react';
import './pg4.scss';

const Pg4 = () => {
  return (
   <>
   <div className='pg4-wrapper container'>
    <h2>Management details</h2>
    <form>
        <div>
            <label htmlFor='owner-name'>Owner's name</label>
            <input type='text' id='owner-name' required></input>
        </div>
        <br/>
        <div>
            <label htmlFor='owner-phonenum' required>Owner's phone number</label>
            <input type="tel" id='owner-phonenum' pattern="[0-9]{11}" title="Please enter a valid phone number (ex. 091234568900)" required></input>
        </div>
        <br/>
        <div>
            <label htmlFor='owner-email'>Owner's e-mail</label>
            <input type="email" id='owner-email' title="Please enter a valid e-mail" required></input>
        </div>
        <br/>
        <div>
            <label htmlFor='caretaker-name'>Caretaker's name</label>
            <input type="text" id='caretaker-name' required></input>
        </div>
        <br/>
        <div>
            <label htmlFor='caretaker-phonenum'>Caretaker's phone number</label>
            <input type="tel" id='owner-email' pattern="[0-9]{11}" title="Please enter a valid phone number" required></input>
        </div>
        <button type='button' className='prev-btn'><a href='/page3'>Prev</a></button>
        <button type='button'><a href='/user/directory'>Submit</a></button>
    </form>
   </div>
   </>
  )
}

export default Pg4;
