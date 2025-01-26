import React, { useState } from 'react';
import './AddSubCategory.css';

const AddSubCategory = () => {
  const [ParentCategory, setParentCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [Description, setDescription] = useState('');
  const [SubImage, setSubImage] = useState(null);
    
  
    const handleImageChange = (e) => {
      setSubImage(e.target.files[0]);
    };
    const handleBoxClick = () => {
      document.getElementById('productImage').click();
    };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ SubImage, ParentCategory, categoryName, categoryCode, Description });
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="add-category">
      <h2>Product Add sub Category</h2>
      <p> Create new product Category</p>
      <form onSubmit={handleSubmit}>
      <label>
          Parent Category:
          <select
            value={ParentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose Category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
          </select>
        </label>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        <label>
          Category code:
          <input
            type="text"
            value={categoryCode}
            onChange={(e) => setCategoryCode(e.target.value)}
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
          {SubImage && <div className="file-name">{SubImage.name}</div>}
          <input
            id="SubImage"
            type="file"
            className="hidden-file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        </label>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddSubCategory;
