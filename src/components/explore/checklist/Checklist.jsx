import React from 'react';
import './checklist.scss';

const Checklist = () => {

    const amenities = ["Wi-fi", "Air Conditioning", "Kitchen"];
    const comfortRoomType = ["Private", "Communal/shared"];
    const occupants = ["1", "2", "3", "4", "More (please specify):"];

    return (
        <>
        <div className="main-checklist container">
            <section className="checklist-section">
                <div className="one">
                    <div className="rental-fee">
                        <h5>Rental fee (per room)</h5>
                        <div className="fee-boxes">
                            <div className="min">
                                <input type="text" inputmode="numeric"  />
                                <label htmlFor="min">Min</label>
                            </div>
                            <p>-</p>
                            <div className="max">
                                <input type="text" inputmode="numeric" />
                                <label htmlFor="max">Max</label>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>

                <div className="two">
                    <h5>Amenities</h5>
                    <div className="checklist">
                        {amenities.map((item, index) => (
                        <div className="checklist-child" key={index}>
                            <input value={item} type="checkbox" />
                            <label>{item}</label>
                        </div>
                        ))}
                    </div>
                    <hr></hr>
                </div>

                <div className="three">
                    <h5>Comfort room type</h5>
                    <div className="checklist">
                        {comfortRoomType.map((item, index) => (
                        <div className="checklist-child" key={index}>
                            <input value={item} type="checkbox" />
                            <label>{item}</label>
                        </div>
                        ))}
                    </div>
                    <hr></hr>
                </div>

            </section>
        </div>
        </>
    );
}

export default Checklist;