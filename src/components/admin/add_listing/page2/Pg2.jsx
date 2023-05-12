import React from 'react';
import { useState } from 'react';
import './pg2.scss';

const MAX_COUNT = 4;

const Pg2 = () => {
  // handles occupants data
  const [occupants, setOccupants] = useState('');
  // handles dimensions data
  const [dimension, setDimension] = useState('');
   // handles CR type data
  const [CRType, setCRType] = useState('');
  // handles file upload
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false);

  // handles input change for OCCUPANTS
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'occupants-room') {
      setOccupants(value);
    } else if (id === 'room-dimension') {
      setDimension(value);
    } else if (id === 'communal' || id === 'private') {
      setCRType(value);
    }
  };

  // handles file uplaod
  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
      files.some((file) => {
        if (uploaded.findIndex((f) => f.name === file.name) === -1) {
          uploaded.push(file);
            if (uploaded.length === MAX_COUNT) setFileLimit(true);
              if (uploaded.length > MAX_COUNT) {
                alert(`You can only add a maximum of ${MAX_COUNT} files`);
                setFileLimit(false);
                limitExceeded = true;
                return true;
              }
            }
      })
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  const handleFileEvent =  (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }

  // checks whether all input fields are filled out
  const handleNextClick = (e) => {
    // Perform any additional validation if needed
    if (!occupants || !dimension || !CRType) {
        e.preventDefault();
        alert('Please fill in all the required fields.');
    } else {
      // Can proceed to next page
      window.location.href = '/page3';
    }
  };

  return (
    <>
    <div className='wrapper container'>
        <h2>Room Details</h2>
        <form>
          <div>
            <label htmlFor='occupants-room'>Number of occupants per room</label>
            <input type="number" id='occupants-room' min={1} value={occupants} onChange={handleInputChange} required></input>
          </div>
          <div>
            <br/>
            <label htmlFor='room-dimension'>Room Dimension</label>
            <input type='text' id="room-dimension" value={dimension} onChange={handleInputChange} required></input>
          </div>
          <div>
            <br/>
            <label>Comfort Room Type</label>
            <span>
              <input type="radio" id="communal" name='cr-type'  value='communal' checked={CRType === 'communal'} onChange={handleInputChange} required></input>
              <label htmlFor='communal'> Communal/Shared</label>
            </span>
            <span>
              <input type='radio' id="private" name='cr-type' value='private' checked={CRType === 'private'} onChange={handleInputChange} required></input>
              <label htmlFor='private'> Private</label>
            </span>
          </div>
        <br></br> 
        <div>
          <label htmlFor="photos">Upload photos</label>
          <br/>
          <input id='fileUpload' type='file' multiple accept='image/png'  onChange={handleFileEvent} disabled={fileLimit} required/>
          <br/>

          <label htmlFor='fileUpload'>
            <br/>
				    <a  className={`btn btn-primary ${!fileLimit ? '' : 'disabled' } `}>Uploaded Files</a>
			    </label>

          <div className="uploaded-files-list">
            {uploadedFiles.map(file => (
              <div >
                {file.name}
              </div>
            ))}
          </div>
        </div>
          <button type="button" className='prev-btn'><a href='/page1'>Prev</a></button>
          <button type="button" className='next-btn' onClick={handleNextClick}><a>Next</a></button>
        </form>
    </div>
    </>
  )
}

export default Pg2;