import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';
import './AddSupplier.css';

const AddSupplier = () => {
  const [supplierName, setSupplierName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare supplier data
      const supplierData = {
        data: {
          Supplier_Name: supplierName,
          Supplier_Email: email,
          Contact_Number: phone,
          Address: address,
          Country: country,
          City: city,
          ZipCode: zipCode,
        },
      };

      // Send POST request to Strapi API
      const response = await fetch('http://localhost:1337/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        alert('Supplier added successfully!');
        // Reset form fields
        setSupplierName('');
        setEmail('');
        setPhone('');
        setCountry('');
        setCity('');
        setAddress('');
        setZipCode('');
      } else {
        alert('Failed to add supplier. Please try again.');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('An error occurred while adding the supplier.');
    } finally {
      setIsLoading(false);
    }
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
        <TextInput label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />

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

        <button type="submit" disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Supplier'}</button>
      </form>
    </div>
  );
};

export default AddSupplier;
