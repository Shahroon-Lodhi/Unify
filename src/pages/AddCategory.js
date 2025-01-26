import React, { useState } from 'react';
import './AddCategory.css';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [Description, setDescription] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ categoryName, categoryCode, Description });
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
