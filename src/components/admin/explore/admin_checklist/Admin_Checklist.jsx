import React, { useState, useEffect } from 'react';
import './admin_checklist.scss';

const Checklist = ({ updateContainerClass, updateFilters, isLoaded, type }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState('Select a type');
  const [rentalFeeRoomInput, setRentalFeeRoomInput] = useState({rentalFeeRoom: 0});
  const [rentalFeeHeadInput, setRentalFeeHeadInput] = useState({rentalFeeHead: 0});
  const [amenityValues, setAmenityValues] = useState({
    Wifi: false,
    "Air Conditioning": false,
    "Laundry Area": false,
    Kitchen: false
  });
  const [crTypeValues, setCRTypeValues] = useState({Private: false, Communal: false});
  const [numOfOccupantsInput, setNumOfOccupantsInput] = useState({occupants: 0});
  const [nearbyValues, setNearbyValues] = useState({
    Eatery: false,
    "Laundry Shop": false,
    "Retail Shop": false,
    "Water Refill Station": false,
    Pharmacy: false
  })
  const [additionalValues, setAdditionalValues] = useState({
    electricityFee: false,
    waterFee: false,
    depositFee: false
  })

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
    updateContainerClass(isDropdownVisible);
  };

  useEffect(() => {
    updateFilters({
      selectedOption: selectedOption,
      rentalFeeRoom: rentalFeeRoomInput,
      rentalFeeHead: rentalFeeHeadInput,
      amenities: amenityValues,
      crType: crTypeValues,
      occupants: numOfOccupantsInput,
      nearby: nearbyValues,
      additional: additionalValues
    });
  }, [selectedOption, rentalFeeRoomInput, rentalFeeHeadInput, amenityValues,
      crTypeValues, numOfOccupantsInput, nearbyValues, additionalValues]);

  useEffect(() => {
    if (isLoaded && type && type !== selectedOption) {
      setSelectedOption(type);
    }
  }, [isLoaded, type, selectedOption]);

  const handleSelectChange = (e) => {setSelectedOption(e.target.value);};

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

  const handleAmenitiesChange = (e) => {
    const { name, checked } = e.target;
    setAmenityValues((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleCRTypeChange = (e) => {
    const { name, checked } = e.target;
    setCRTypeValues((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleOccupantsChange = (e) => {
    const { name, value } = e.target;
    setNumOfOccupantsInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNearbyChange = (e) => {
    const { name, checked } = e.target;
    setNearbyValues((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleAdditionalFeesChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalValues((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

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
              <select value={isLoaded && type === selectedOption ? type : selectedOption} onChange={handleSelectChange}>
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
                  name="Wifi"
                  checked={amenityValues.Wifi}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="wifi">Wifi</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Air Conditioning"
                  checked={amenityValues['Air Conditioning']}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="aircon">Air Conditioning</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Laundry Area"
                  checked={amenityValues['Laundry Area']}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="laundry">Laundry Area</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Kitchen"
                  checked={amenityValues.Kitchen}
                  onChange={handleAmenitiesChange}
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
                  name="Private"
                  checked={crTypeValues.Private}
                  onChange={handleCRTypeChange}
                />
                <label htmlFor="cr-type">Private</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Communal"
                  checked={crTypeValues.Communal}
                  onChange={handleCRTypeChange}
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
                value={numOfOccupantsInput.occupants}
                onChange={handleOccupantsChange}
              />
              <hr />
            </form>

            <form className="nearby checklist-item">
              <h5>Nearby</h5>
              <div className="item">
                <input
                  type="checkbox"
                  name="Eatery"
                  checked={nearbyValues.Eatery}
                  onChange={handleNearbyChange}
                />
                <label htmlFor="nearby">Eatery/restaurants</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Laundry Shop"
                  checked={nearbyValues['Laundry Shop']}
                  onChange={handleNearbyChange}
                />
                <label htmlFor="nearby">Laundry shops</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Retail Store"
                  checked={nearbyValues.Retail}
                  onChange={handleNearbyChange}
                />
                <label htmlFor="nearby">Retail stores</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Water Refill Station"
                  checked={nearbyValues["Water Refill Station"]}
                  onChange={handleNearbyChange}
                />
                <label htmlFor="nearby">Water refill stations</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="Pharmacy"
                  checked={nearbyValues.Pharmacy}
                  onChange={handleNearbyChange}
                />
                <label htmlFor="nearby">Pharmacy</label>
              </div>
              <hr />
            </form>

            <form className="additional-fees checklist-item">
              <h5>Exclude additional fees</h5>
              <div className="item">
                <input
                  type="checkbox"
                  name="electricityFee"
                  checked={additionalValues.electricityFee}
                  onChange={handleAdditionalFeesChange}
                />
                <label htmlFor="additional-fee">Electricity rate</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="waterFee"
                  checked={additionalValues.waterFee}
                  onChange={handleAdditionalFeesChange}
                />
                <label htmlFor="additional-fee">Water rate</label>
              </div>
              <div className="item">
                <input
                  type="checkbox"
                  name="depositFee"
                  checked={additionalValues.depositFee}
                  onChange={handleAdditionalFeesChange}
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
