import React from 'react';
import "./crud.scss";
import { HiPlus } from 'react-icons/hi';

const CRUD = () => {
  return (
    <>
    <div className='crud-wrapper container'>
        <h2>My Directory</h2>
        <div className='search-add'>
            <input type='text' placeholder='Search by name'></input>
            <button className='search-btn button'>
                <a href='/'>Search</a>
            </button>
            <button className='add-btn button'>
                <a href='/page1'> + Add New Listing</a>
            </button>
        </div>
        <div className='crud-table'>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </div>
    </div>
    </>
  )
}

export default CRUD