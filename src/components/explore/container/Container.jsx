import React from 'react';
import Checklist from '../checklist/Checklist';
import Headline from '../headline/Headline';
import Listing from '../listing/Listing';
import './container.scss';

const Container = () => {
    return (
      <>
        <div className="explore-page container">
            <div className="main-container">
                <Checklist/>
                <div className="headline-listing-section">
                    <Listing/>
                </div>
            </div>
        </div>
      </>
    );
  }

  export default Container;