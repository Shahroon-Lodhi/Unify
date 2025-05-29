import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import TextInput from "../components/TextInput";
import Dropdown from "../components/Dropdown";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [hsCode, setHsCode] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
const [imageId, setImageId] = useState(null);


  // Fetch categories from Strapi
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/categories");
        const data = await response.json();
        setCategories(data.data.map((cat) => cat.name)); // Extract category names
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  
    const formData = new FormData();
    formData.append("files", file);
  
    try {
      const res = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      if (data && data[0]) {
        setImageId(data[0].id); // Save image ID
        console.log("✅ Image uploaded, ID:", data[0].id);
      }
    } catch (err) {
      console.error("❌ Image upload failed:", err);
    }
  };
  

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
        image: imageId, // Include image ID here
      },
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

      // Reset form
      setProductName("");
      setProductSKU("");
      setCategory("");
      setHsCode("");
      setCostPrice("");
      setSellingPrice("");
      setStockQuantity("");
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
        <Dropdown label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required options={categories} />
        <TextInput label="HS Code" value={hsCode} onChange={(e) => setHsCode(e.target.value)} required />
        <TextInput label="Cost Price" type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
        <TextInput label="Selling Price" type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required />
        <TextInput label="Stock Quantity" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
        <label>Product Image</label>
<input type="file" accept="image/*" onChange={handleImageChange} required />


        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
