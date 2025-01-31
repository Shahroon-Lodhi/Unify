import React, { useState } from 'react';
import './AddProduct.css';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productSKU, setProductSKU] = useState('');
  const [category, setCategory] = useState('');
  const [hsCode, setHsCode] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      data: {
        Product_Name: productName,
        Product_SKU: productSKU,
        Category: category,
        HS_Code: hsCode,
        Cost_Price: parseFloat(costPrice),
        Selling_Price: parseFloat(sellingPrice),
        Stock_Quantity: parseInt(stockQuantity),
      }
    };

    try {
      const response = await fetch("http://localhost:1337/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const responseData = await response.json();
      console.log("Strapi Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error?.message || "Failed to add product");
      }

      alert("✅ Product added successfully!");

      // Reset form after successful submission
      setProductName('');
      setProductSKU('');
      setCategory('');
      setHsCode('');
      setCostPrice('');
      setSellingPrice('');
      setStockQuantity('');

    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Error adding product. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <TextInput label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        <TextInput label="Product SKU" value={productSKU} onChange={(e) => setProductSKU(e.target.value)} required />
        <Dropdown label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required options={["Electronics", "Clothing", "Books", "Home"]} />
        <TextInput label="HS Code" value={hsCode} onChange={(e) => setHsCode(e.target.value)} required />
        <TextInput label="Cost Price" type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
        <TextInput label="Selling Price" type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required />
        <TextInput label="Stock Quantity" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
