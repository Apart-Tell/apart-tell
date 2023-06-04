import React from 'react';
import "./admin_headline.scss";

const Admin_Headline = ({ isLoaded, type, accommodationsCount }) => {

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
    } else if (accommodationsCount > 0) {
        headlineText = `${accommodationsCount} accommodations found!`;
    } else {
        headlineText = 'No accommodations found!';
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

export default Admin_Headline;
