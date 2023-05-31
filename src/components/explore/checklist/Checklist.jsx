import React, { useState } from 'react';
import './checklist.scss';

const Checklist = ({ updateContainerClass }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
    updateContainerClass(isDropdownVisible);
  };

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: checked ? value : null,
    }));
    onFilterChange(filters);
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
              <h5>Type</h5>
              <select>
                <option>Select a type</option>
                <option>Apartment</option>
                <option>Boarding House</option>
                <option>Apartment</option>
              </select>
              <hr />
            </div>
            
              <form className="rental-fee-room checklist-item">
                <h5>Rental Fee (per room)</h5>
                <input type="number"/>
                <hr />
              </form>
              <form className="rental-fee-head checklist-item">
                <h5>Rental Fee (per head)</h5>
                <input type="number"/>
                <hr />
              </form>

              <form className="amenities checklist-item">
                <h5>Amenities</h5>
                <div className="item">
                  <input type="checkbox" name="wifi" value="Wifi" onChange={handleFilterChange} />
                  <label htmlFor="wifi">Wifi</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="aircon" value="Aircon" onChange={handleFilterChange} />
                  <label htmlFor="aircon">Air Conditioning</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="kitchen" value="Kitchen" onChange={handleFilterChange} />
                  <label htmlFor="kitchen">Kitchen</label>
                </div>
                <hr />
            </form>

              <form className="cr-type checklist-item">
                <h5>Comfort room type</h5>
                <div className="item">
                  <input type="checkbox" name="private" value="Private"></input>
                  <label htmlFor="cr-type">Private</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="communal" value="Communal"></input>
                  <label htmlFor="cr-type">Communal/Shared</label>
                </div>
                <hr />
              </form>

              <form className="occupants checklist-item">
                <h5>Occupants (per room)</h5>
                  <input type="number"></input>
                <hr />
              </form>

              <form className="nearby checklist-item">
                <h5>Nearby</h5>
                <div className="item">
                  <input type="checkbox" name="Eatery" value="Eatery"></input>
                  <label htmlFor="nearby">Eatery/restaurants</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="Laundry" value="Laundry"></input>
                  <label htmlFor="nearby">Laundry shops</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="Retail" value="Retail"></input>
                  <label htmlFor="nearby">Retail stores</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="Water" value="Water"></input>
                  <label htmlFor="nearby">Water refilling stations</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="Pharmacy" value="Pharmacy"></input>
                  <label htmlFor="nearby">Pharmacy</label>
                </div>
                <hr />
              </form>

              <form className="additional-fees checklist-item">
                <h5>Additional fees</h5>
                <div className="item">
                  <input type="checkbox" name="electricityFee" value="electricityFee"></input>
                  <label htmlFor="additional-fee">Electricity rate</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="waterFee" value="waterFee"></input>
                  <label htmlFor="additional-fee">Water rate</label>
                </div>
                <div className="item">
                  <input type="checkbox" name="depositFee" value="depositFee"></input>
                  <label htmlFor="additional-fee">Deposit</label>
                </div>
              </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checklist;
