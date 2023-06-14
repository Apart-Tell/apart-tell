import React from 'react';
import './headline.scss';

const Headline = ({ isLoaded, type, accommodationsCount }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);

        // Simulating API fetch
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    let headlineText = '';

    if (isLoading) {
        headlineText = 'Loading...'; // Display loading text
    } else if (isLoaded) {
        switch (type) {
            case 'Apartment':
                headlineText = 'Apartment';
                break;
            case 'Boarding house':
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
        headlineText = `${accommodationsCount} accommodation${
            accommodationsCount > 1 ? 's' : ''
        } found!`;
    } else {
        headlineText = 'No accommodations found!';
    }

    return (
        <>
            <div className="headline-section">
                {isLoading ? (
                    <div className="spinner">loading...</div>
                ) : (
                    <div className="headline-text">
                        <h2>{headlineText}</h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default Headline;
