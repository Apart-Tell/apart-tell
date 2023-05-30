import React from 'react';
import './searchbar.scss';

const Searchbar = () => {
    return (
        <>

        <div className="searchbar-section">
            <form>
                <div className="searchbar">
                    <input type="text" />
                    <button>Search</button>
                </div>
            </form>
        </div>

        </>
    )

}

export default Searchbar;