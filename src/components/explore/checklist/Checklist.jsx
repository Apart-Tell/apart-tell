import React from 'react';
import './checklist.scss';

const Checklist = () => {
    return (
        <>

        <div className="checklist-section">
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

        </>
    )

}

export default Checklist;