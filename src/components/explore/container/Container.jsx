import React from 'react';
import Search from '../searchbar/Searchbar';
import Checklist from '../checklist/Checklist';
import Headline from '../headline/Headline';
import Listing from '../listing/Listing';
import './container.scss';

const Container = () => {
    return (
      <>
        <div className="explore-page container">
            <Search/>
            <div className="main-container">
                <Checklist/>
                <div className="headline-listing-section">
                    <Headline/>
                    <Listing/>
                </div>
            </div>
        </div>
      </>
    );
  }

  export default Container;