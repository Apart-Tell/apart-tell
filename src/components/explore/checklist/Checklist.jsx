import React, { useState, useEffect } from 'react';
import './checklist.scss';

const Checklist = ({ updateContainerClass, updateFilters }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    wifi: false,
    aircon: false,
    laundryarea: false,
    kitchen: false,
    privateCR: false,
    communalCR: false,
    eatery: false,
    laundry: false,
    retail: false,
    water: false,
    pharmacy: false,
    electricityFee: false,
    waterFee: false,
    depositFee: false
  });

  const [rentalFeeRoomInput, setRentalFeeRoomInput] = useState({
    rentalFeeRoom: 0
  });

  const [rentalFeeHeadInput, setRentalFeeHeadInput] = useState({
    rentalFeeHead: 0
  });

  const [selectedOption, setSelectedOption] = useState('Select a type');

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
    updateContainerClass(isDropdownVisible);
  };

  useEffect(() => {
    updateFilters({
      selectedOption: selectedOption,
      rentalFeeRoom: rentalFeeRoomInput,
      rentalFeeHead: rentalFeeHeadInput,
      checkboxes: checkboxValues,
    });
  }, [selectedOption, rentalFeeRoomInput, rentalFeeHeadInput, checkboxValues]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleRentalFeeRoomInput = (e) => {
    const { name, value } = e.target;
    setRentalFeeRoomInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRentalFeeHeadInput = (e) => {
    const { name, value } = e.target;
    setRentalFeeHeadInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  console.log('Selected option:', selectedOption);
  console.log('Rental fee (room):', rentalFeeRoomInput);
  console.log('Rental fee (head):', rentalFeeHeadInput);

  return (
    <>
      <div className="checklist-section">
        <div className="filter-icon" onClick={toggleDropdown}>
          <img src="src/assets/svg/filter.svg" 
          alt="Filter Icon" 
          className="filter-icon-img"
          />
        </div>

        <div
          className={`checklist-container ${
            isDropdownVisible ? 'visible' : ''
          }`}
        >
          <div className="checklist-items">
            <form className="type-selection checklist-item">
              <h5>Type</h5>
              <select value={selectedOption} onChange={handleSelectChange}>
                <option>Select a type</option>
                <option>Apartment</option>
                <option>Boarding house</option>
                <option>Dormitory</option>
              </select>
              <hr />
            </form>

            <form className="rental-fee-room checklist-item">
              <h5>Rental Fee (per room)</h5>
              <input
                type="number"
                name="rentalFeeRoom"
                value={rentalFeeRoomInput.rentalFeeRoom}
                onChange={handleRentalFeeRoomInput}
              />
              <hr />
            </form>

            <form className="rental-fee-head checklist-item">
              <h5>Rental Fee (per head)</h5>
              <input
                type="number"
                name="rentalFeeHead"
                value={rentalFeeHeadInput.rentalFeeHead}
                onChange={handleRentalFeeHeadInput}
              />
              <hr />
            </form>

            <form className="amenities checklist-item">
              <h5>Amenities</h5>
              <div className="item">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={checkboxValues.wifi}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="wifi">Wifi</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="aircon"
                  checked={checkboxValues.aircon}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="aircon">Air Conditioning</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="laundryarea"
                  checked={checkboxValues.laundryarea}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="laundry">Laundry Area</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="kitchen"
                  checked={checkboxValues.kitchen}
                  onChange={handleCheckboxChange}
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
                  name="privateCR"
                  checked={checkboxValues.privateCR}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="cr-type">Private</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="communalCR"
                  checked={checkboxValues.communalCR}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="cr-type">Communal/Shared</label>
              </div>
              <hr />
            </form>

            <form className="occupants checklist-item">
              <h5>Occupants (per room)</h5>
              <input
                type="number"
                name="occupants"
                value="occupants"
              />
              <hr />
            </form>

            <form className="nearby checklist-item">
              <h5>Nearby</h5>
              <div className="item">
                <input
                  type="checkbox"
                  name="eatery"
                  checked={checkboxValues.eatery}
                />
                <label htmlFor="nearby">Eatery/restaurants</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="laundry"
                  checked={checkboxValues.laundry}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="nearby">Laundry shops</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="retail"
                  checked={checkboxValues.retail}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="nearby">Retail stores</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="water"
                  checked={checkboxValues.water}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="nearby">Water refilling stations</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="pharmacy"
                  checked={checkboxValues.pharmacy}
                  onChange={handleCheckboxChange}
                />
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
                  checked={checkboxValues.electricityFee}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="additional-fee">Electricity rate</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="waterFee"
                  checked={checkboxValues.waterFee}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="additional-fee">Water rate</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="depositFee"
                  checked={checkboxValues.depositFee}
                  onChange={handleCheckboxChange}
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
