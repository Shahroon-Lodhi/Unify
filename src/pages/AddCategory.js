import React, { useState } from 'react';
import TextInput from '../components/TextInput'; // Reusing your existing component
import './AddCategory.css';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ categoryName, categoryCode, description });
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        {/* Using TextInput component */}
        <TextInput label="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
        <TextInput label="Category Code" value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)} required />
        <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
