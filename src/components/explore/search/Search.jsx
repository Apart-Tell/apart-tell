import React from 'react'
import './search.scss';

const Search = () => {
    return (
        <>
        <div className="searchbar container">
            <form className="searchbar-form">
                <div className="searchbar-wrap">
                    <input
                        type="text"
                        name="add-item"
                        id="add-item"
                        placeholder="Search..."
                    />
                    <button>
                       Search
                    </button>
                </div>
            </form>
        </div>

        </>
    );
}

export default Search;