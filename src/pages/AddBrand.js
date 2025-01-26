import React, { useState } from 'react';
import './AddBrand.css';

const AddBrand = () => {
  const [BrandName, setBrandName] = useState('');
  const [Description, setDescription] = useState('');
  const [BrandImage, setBrandImage] = useState(null);
  

  const handleImageChange = (e) => {
    setBrandImage(e.target.files[0]);
  };
  const handleBoxClick = () => {
    document.getElementById('productImage').click();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ BrandName, Description, BrandImage });
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="add-category">
      <h2>Brand Add</h2>
      <p> Create new Brand</p>
      <form onSubmit={handleSubmit}>
        <label>
          Brand Name:
          <input
            type="text"
            value={BrandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
        <div className="file-upload-box" onClick={handleBoxClick}>
          <span>Click to upload product image or drag and drop</span>
          {BrandImage && <div className="file-name">{BrandImage.name}</div>}
          <input
            id="BrandImage"
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
