import React from 'react';
import './headline.scss';

const Headline = ({ isLoaded, type }) => {

    let headlineText = '';

    if (isLoaded) {
        switch (type) {
        case "Apartment":
            headlineText = "Apartments";
            break;
        case 'Boarding':
            headlineText = 'Boarding House';
            break;
        case 'Dormitory':
            headlineText = 'Dormitory';
            break;
        default:
            headlineText = 'Where to stay in Mintal?';
            break;
        }
    } else {
        headlineText = 'Where to stay in Mintal?';
    }

    return (
        <>
            <div className="headline-section">
                    <div className="headline-text">
                        <h2>{headlineText}</h2>
                    </div>

                    {/* <div className="sort-dropdown-container">
                        <div className="sort-dropdown">
                            <select>
                            <option>Sort</option>
                            <option>Apartment</option>
                            <option>Boarding House</option>
                            <option>Apartment</option>
                            </select>
                        </div>
                    </div> */}
            </div>
        </>
    )

}

export default Headline;
