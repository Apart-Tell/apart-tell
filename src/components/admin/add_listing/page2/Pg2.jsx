import React from 'react';
import { useState } from 'react';
import './pg2.scss';

const MAX_COUNT = 4;

const Pg2 = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);


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

  return (
    <>
    <div className='wrapper container'>
        <h2>Room Details</h2>
        <form>
          <div>
            <label htmlFor='occupants-room'>Number of occupants per room</label>
            <input type="number" id='occupants-room' min={1} required></input>
          </div>
          <div>
            <br/>
            <label htmlFor='room-dimension'>Room Dimension</label>
            <input type='text' id="room-dimension" required></input>
          </div>
          <div>
            <br/>
            <label>Comfort Room Type</label>
            <span>
              <input type="radio" id="communal" name='cr-type' required></input>
              <label htmlFor='communal'> Communal/Shared</label>
            </span>
            <span>
              <input type='radio' id="private" name='cr-type' required></input>
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
          <button type="button" className='next-btn'><a href='/page3'>Next</a></button>
        </form>
    </div>
    </>
  )
}

export default Pg2;
