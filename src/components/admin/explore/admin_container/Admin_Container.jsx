import React, { useState } from 'react';
import Admin_Checklist from '../admin_checklist/Admin_Checklist';
import Admin_Listing from '../admin_listing/Admin_Listing';
import "./admin_container.scss";

const Admin_Container = ({ isLoaded, type }) => {
  const [containerClass, setContainerClass] = useState('main-container');

  const updateContainerClass = (isDropdownVisible) => {
    const newContainerClass =
      isDropdownVisible && window.innerWidth <= 1000
        ? 'main-container filtered'
        : 'main-container';
    setContainerClass(newContainerClass);
  };

  const [filterValues, setFilterValues] = useState({
    checkboxes: {},
    numberInputs: {},
    selectedOption: 'Select a type',
  });

  const updateFilters = (newFilters) => {
    setFilterValues(newFilters);
  };

  return (
    <>
      <div className="explore-page-container">
        <div className={containerClass}>
          <Admin_Checklist
            updateContainerClass={updateContainerClass}
            updateFilters={updateFilters}
            isLoaded={isLoaded}
            type={type}
          />
          <div className="headline-listing-section">
            <Admin_Listing
              isLoaded={isLoaded}
              type={type}
              filterValues={filterValues}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Container;
