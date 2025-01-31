import React, { useState } from 'react';
import TextInput from '../components/TextInput'; 
import Dropdown from '../components/Dropdown'; 
import './AddSubCategory.css';

const AddSubCategory = () => {
  const [parentCategory, setParentCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [description, setDescription] = useState('');
  const [subImage, setSubImage] = useState(null);

  const handleImageChange = (e) => {
    setSubImage(e.target.files[0]);
  };

  const handleBoxClick = () => {
    document.getElementById('subImage').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ subImage, parentCategory, categoryName, categoryCode, description });
  };

  return (
    <div className="add-category">
      <h2>Product Add Subcategory</h2>
      <p>Create a new product subcategory</p>
      <form onSubmit={handleSubmit}>
        {/* Using Dropdown component */}
        <Dropdown
          label="Parent Category"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          options={["Electronics", "Clothing", "Books", "Home"]}
          required
        />

        {/* Using TextInput component */}
        <TextInput label="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
        <TextInput label="Category Code" value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)} required />
        <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* File Upload */}
        <label>
          <div className="file-upload-box" onClick={handleBoxClick}>
            <span>Click to upload product image or drag and drop</span>
            {subImage && <div className="file-name">{subImage.name}</div>}
            <input
              id="subImage"
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
