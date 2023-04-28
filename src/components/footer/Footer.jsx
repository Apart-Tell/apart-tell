import React from 'react';
import './footer.scss';

export default function Footer(){
  return (
    <div>
      <footer>
        <div className='footer container'>
        <hr></hr>

        <div className='footer-row'>
          <div className='footer-column'>
            <a href='/'><p>About Us</p></a>
            <p>2023 Apart-tell. All Rights Reserved.</p>
          </div>
        </div>
        </div>
      </footer>
    </div>
  )
}