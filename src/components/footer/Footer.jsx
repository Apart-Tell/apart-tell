import React from 'react';
import './footer.scss';

export default function Footer(){
  return (
      <footer>
        <hr/>
        <div className='footer-content'>
          <a href='/'><p>About Us</p></a>
          <p>2023 Apart-Tell. All Rights Reserved.</p>
        </div>
      </footer>
  )
}