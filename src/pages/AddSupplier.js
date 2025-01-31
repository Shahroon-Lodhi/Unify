import React, { useState } from 'react';
import TextInput from '../components/TextInput'; // Reusing TextInput
import Dropdown from '../components/Dropdown'; // Reusing Dropdown
import './AddSupplier.css';

const AddSupplier = () => {
  const [supplierName, setSupplierName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [supplierImage, setSupplierImage] = useState(null);

  const handleImageChange = (e) => {
    setSupplierImage(e.target.files[0]);
  };

  const handleBoxClick = () => {
    document.getElementById('supplierImage').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ supplierName, email, phone, country, city, address, description, supplierImage });
  };

  return (
    <div className="add-product">
      <h2>Supplier Management</h2>
      <p>Add/Update Supplier</p>
      <form onSubmit={handleSubmit}>
        <TextInput label="Supplier Name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required />
        <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextInput label="Phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <TextInput label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <Dropdown
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          options={["Pakistan", "Saudia", "Bhutan"]}
          required
        />

        <Dropdown
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={["Lahore", "Riyadh", "Bhutan"]}
          required
        />

        {/* File Upload */}
        <label>
          <div className="file-upload-box" onClick={handleBoxClick}>
            <span>Click to upload Supplier image or drag and drop</span>
            {supplierImage && <div className="file-name">{supplierImage.name}</div>}
            <input
              id="supplierImage"
              type="file"
              className="hidden-file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </label>

        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;
