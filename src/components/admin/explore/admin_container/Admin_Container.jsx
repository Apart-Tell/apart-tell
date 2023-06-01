import React from 'react';
import { useEffect, useState } from 'react';
import "./admin_container.scss";
import Admin_Checklist from '../admin_checklist/Admin_Checklist';
import Admin_Listing from '../admin_listing/Admin_Listing';

const Admin_Container = ({ isLoaded, type }) => {
    const [containerClass, setContainerClass] = useState('main-container');
      
    const updateContainerClass = (isDropdownVisible) => {
    const newContainerClass =
        isDropdownVisible && window.innerWidth <= 1000
            ? 'main-container filtered'
            : 'main-container';
        setContainerClass(newContainerClass);
    };
      
    return (
        <>
            <div className="explore-page container">
              <div className={containerClass}>
                <Admin_Checklist updateContainerClass={updateContainerClass} />
                <div className="headline-listing-section">
                  <Admin_Listing isLoaded={isLoaded} type={type}/>
                </div>
              </div>
            </div>
          </>
        );
    };

export default Admin_Container;
