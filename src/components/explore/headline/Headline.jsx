import React from 'react';
import './headline.scss';

const Headline = ({ isLoaded, type }) => {

    let headlineText = '';

    if (isLoaded) {
        switch (type) {
        case "Apartment":
            headlineText = "Apartment";
            break;
        case "Boarding house":
            headlineText = "Boarding House";
            break;
        case "Dormitory":
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
            </div>
        </>
    )

}

export default Headline;
