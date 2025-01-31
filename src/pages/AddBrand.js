import React, { useState } from 'react';
import TextInput from '../components/TextInput'; 
import './AddBrand.css';

const AddBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [brandImage, setBrandImage] = useState(null);

  const handleImageChange = (e) => {
    setBrandImage(e.target.files[0]);
  };

  const handleBoxClick = () => {
    document.getElementById('brandImage').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ brandName, description, brandImage });
  };

  return (
    <div className="add-category">
      <h2>Brand Add</h2>
      <p>Create new Brand</p>
      <form onSubmit={handleSubmit}>
        {/* Using TextInput component */}
        <TextInput label="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} required />
        <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* File Upload */}
        <label>
          <div className="file-upload-box" onClick={handleBoxClick}>
            <span>Click to upload product image or drag and drop</span>
            {brandImage && <div className="file-name">{brandImage.name}</div>}
            <input
              id="brandImage"
              type="file"
              className="hidden-file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </label>

        <button type="submit">Add Brand</button>
      </form>
    </div>
  );
};

export default AddBrand;
