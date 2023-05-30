import React, { useState } from 'react';
import './checklist.scss';

const Checklist = ({ updateContainerClass }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
    updateContainerClass(isDropdownVisible);
  };

  return (
    <>
      <div className="checklist-section">
        <div className="filter-icon" onClick={toggleDropdown}>
          <img src="src/assets/svg/filter.svg" alt="Filter Icon" />
        </div>

        <div
          className={`checklist-container ${
            isDropdownVisible ? 'visible' : ''
          }`}
        >
          <div className="checklist-items">
            <div className="type-selection checklist-item">
              <label>Type</label>
              <select>
                <option>Select a type</option>
                <option>Apartment</option>
                <option>Boarding House</option>
                <option>Apartment</option>
              </select>
              <hr />
            </div>
            <form className="rental-fee-room checklist-item">
              <label htmlFor="">Rental Fee (per room)</label>
              <input type="text" />
              <hr />
            </form>
            <form className="rental-fee-head checklist-item">
              <label htmlFor="">Rental Fee (per head)</label>
              <input type="text" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checklist;
