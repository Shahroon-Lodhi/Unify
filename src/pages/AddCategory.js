import React, { useState } from 'react';
import axios from 'axios';
import TextInput from '../components/TextInput';
import './AddCategory.css';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryCode, setCategoryCode] = useState(''); // Assuming this is used for slug
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to match Strapi fields
    const newCategory = {
      name: categoryName,
      slug: categoryCode,
      description: description,
    };

    try {
      const response = await axios.post('https://strapi-backend-production-63b5.up.railway.app/api/categories', { data: newCategory }); // Adjust URL if needed
      console.log('Category added:', response.data);
      setSuccessMessage('Category added successfully!');
      // Reset form fields
      setCategoryName('');
      setCategoryCode('');
      setDescription('');
    } catch (error) {
      console.error('Error adding category:', error);
      setErrorMessage('Failed to add category. Please try again.');
    }
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <TextInput label="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
        <TextInput label="Category Code" value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)} required />
        <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Add Category</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddCategory;
