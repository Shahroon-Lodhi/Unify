import React, { useState } from 'react';
import './AddSupplier.css';

const AddSupplier = () => {
  const [SupplierName, setSupplierName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Country, setCountry] = useState('');
  const [City, setCity] = useState('');
  const [Address, setAddress] = useState('');
  const [Description, setDescription] = useState('');
  const [SupplierImage, setSupplierImage] = useState(null);


  const handleImageChange = (e) => {
    setSupplierImage(e.target.files[0]);
  };
  const handleBoxClick = () => {
    document.getElementById('SupplierImage').click();
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ SupplierName, Email, Phone, Country, City, Address, Description, SupplierImage });
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="add-product">
      <h2>Supplier Management</h2>
      <p>Add/Update Customer</p>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={SupplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
        </label>
        <label>
          Country:
          <select
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose Country
            </option>
            <option value="Pakistan">Pakistan</option>
            <option value="Saudia">Saudia</option>
            <option value="Bhutan">Bhutan</option>
          </select>
        </label>
        <label>
          City:
          <select
            value={City}
            onChange={(e) => setCity(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose City
            </option>
            <option value="Lahore">Lahore</option>
            <option value="Riyadh">Riyadh</option>
            <option value="Bhutan">Bhutan</option>
          </select>
        </label>
        <label>
          Address:
          <input
            type="text"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="number"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
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
          Email:
          <input
            type="number"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
        <div className="file-upload-box" onClick={handleBoxClick}>
          <span>Click to upload Supplier image or drag and drop</span>
          {SupplierImage && <div className="file-name">{SupplierImage.name}</div>}
          <input
            id="SupplierImage"
            type="file"
            className="hidden-file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddSupplier;
