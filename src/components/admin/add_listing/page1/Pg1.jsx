import React from 'react';
import "./pg1.scss";

const Pg1 = () => {
  return (
    <>
    <div className='wrapper container'>
        <h2>General Accommodation Details</h2>
        <form>
            <div>
                <label htmlFor="accName">Name</label>
                <input type='text' id="accName" required></input>
            </div>
            <br/>
            <div>
                <label htmlFor="accAddress">Address</label>
                <input type='text' id="accAddress" required></input>
            </div>
            <br/>
            <div>
                <label htmlFor="accType">Type</label>
                <select id="accType" required>
                    <option value="" className='select-type'>Select a type</option>
                    <option value="apartment" className='select-type'>Apartment</option>
                    <option value="boarding-house" className='select-type'>Boarding House</option>
                    <option value="dormitory" className='select-type'>Dormitory</option>
                </select>
            </div>
            <br/>
            <div>
                <label htmlFor="accDescription">Description</label>
                <textarea id="accDescription" className='description-style' required></textarea>
            </div>
            <br/>
            <div>
                <label htmlFor="accAddress">Rules and Regulations</label>
                <textarea id="accAddress" className='rules-style' required></textarea>
            </div>
            <br/>
            <div>
                <label>Amenities</label>
                <br/>
                <div>       
                    <label htmlFor='amenities'>
                        <input type="checkbox" id="amenities" value="wifi"/>
                        Wi-Fi
                    </label>
                    <label htmlFor='amenities'>
                        <input type="checkbox" id="amenities" value="aircon"/>
                        Air conditioning
                    </label>
                    <label htmlFor='amenities'>
                        <input type="checkbox" id="amenities" value="laundry-area"/>
                        Laundry area
                    </label>
                    <label htmlFor='amenities'>
                        <input type="checkbox" id="amenities" value="kitchen"/>
                        Kitchen
                    </label>
                </div>                
            </div>
            <div>
                <label>Nearby</label>
                <div>
                    <br/>
                    <label htmlFor='nearby'>
                        <input type="checkbox" id="nearby" value="wifi"/>
                        Eatery/Restaurant
                    </label>
                    <label htmlFor='nearby'>
                        <input type="checkbox" id='nearby' value="laundry-shop"/>
                        Laundry shop
                    </label>
                    <label htmlFor='nearby'>
                        <input type="checkbox" id='nearby' value="retail-store"/>
                        Retail store
                    </label>
                    <label htmlFor='nearby'>
                        <input type="checkbox" id='nearby' value="water-refill-station"/>
                        Water refilling station
                    </label>
                    <label htmlFor='nearby'>
                        <input type="checkbox" id="nearby" value="pharmacy"/>
                        Pharmacy
                    </label>
                </div>
            </div>
            <button type='button'><a href='/page2'>Next</a></button>
        </form>
    </div>
    </>
  )
}

export default Pg1
