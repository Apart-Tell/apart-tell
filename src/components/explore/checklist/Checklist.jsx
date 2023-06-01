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
              <h5>Type</h5>
              <select>
                <option>Select a type</option>
                <option>Apartment</option>
                <option>Boarding House</option>
                <option>Dormitory</option>
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
                <input 
                  type="checkbox" 
                  name="wifi" 
                  value="Wifi"
                />
                <label htmlFor="wifi">Wifi</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="aircon" 
                  value="Aircon"
                />
                <label htmlFor="aircon">Air Conditioning</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="laundryarea" 
                  value="Laundry Area"
                />
                <label htmlFor="laundry">Laundry Area</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="kitchen" 
                  value="Kitchen"
                />
                <label htmlFor="kitchen">Kitchen</label>
              </div>
              <hr />
            </form>

            <form className="cr-type checklist-item">
              <h5>Comfort room type</h5>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="private" 
                  value="Private"
                />
                <label htmlFor="cr-type">Private</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="communal" 
                  value="Communal"
                />
                <label htmlFor="cr-type">Communal/Shared</label>
              </div>
              <hr />
            </form>

            <form className="occupants checklist-item">
              <h5>Occupants (per room)</h5>
                <input type="number"/>
              <hr />
            </form>

            <form className="nearby checklist-item">
              <h5>Nearby</h5>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="Eatery" 
                  value="Eatery"
                />
                <label htmlFor="nearby">Eatery/restaurants</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="Laundry" 
                  value="Laundry"
                />
                <label htmlFor="nearby">Laundry shops</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="Retail" 
                  value="Retail"
                />
                <label htmlFor="nearby">Retail stores</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="Water" 
                  value="Water"
                />                
                <label htmlFor="nearby">Water refilling stations</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="Pharmacy" 
                  value="Pharmacy"/>
                <label htmlFor="nearby">Pharmacy</label>
              </div>
              <hr />
            </form>

            <form className="additional-fees checklist-item">
              <h5>Additional fees</h5>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="electricityFee" 
                  value="electricityFee"
                />
                <label htmlFor="additional-fee">Electricity rate</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox" 
                  name="waterFee" 
                  value="waterFee"
                />
                <label htmlFor="additional-fee">Water rate</label>
              </div>
              <div className="item">
                <input 
                  type="checkbox"
                  name="depositFee" 
                  value="depositFee"
                />
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
