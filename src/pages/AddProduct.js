import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [Subcategory, setSubCategory] = useState('');
  const [Brand, setBrand] = useState('');
  const [Unit, setUnit] = useState('');
  const [SKU, setSKU] = useState('');
  const [Min_quantity, setMinQuantity] = useState('');
  const [Description, setDescription] = useState('');
  const [Tax, setTax] = useState('');
  const [Discount, setDiscount] = useState('');
  const [productImage, setProductImage] = useState(null);


  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };
  const handleBoxClick = () => {
    document.getElementById('productImage').click();
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ productName, price, quantity, category, Subcategory, Brand, SKU, Min_quantity, Description, Tax, Discount, productImage });
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          Sub Category:
          <select
            value={Subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose Sub Category
            </option>
            <option value="Electronics">Mobile</option>
            <option value="Clothing">Hoodies</option>
            <option value="Books">Manga</option>
            <option value="Home">Furniture</option>
          </select>
        </label>
        <label>
          Brand:
          <select
            value={Brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose Brand
            </option>
            <option value="Electronics">Apple</option>
            <option value="Clothing">Tom Tailor</option>
            <option value="Books">Dragon Ball</option>
            <option value="Home">oakwood</option>
          </select>
        </label>
        <label>
          Unit:
          <select
            value={Unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose Brand
            </option>
            <option value="Unit">Unit</option>
          </select>
        </label>
        <label>
          SKU:
          <input
            type="text"
            value={SKU}
            onChange={(e) => setSKU(e.target.value)}
            required
          />
        </label>
        <label>
          Minimum Quantity:
          <input
            type="number"
            value={Min_quantity}
            onChange={(e) => setMinQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
          Tax:
          <select
            value={Tax}
            onChange={(e) => setTax(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose Tax
            </option>
            <option value="2%">2%</option>
            <option value="5%">5%</option>
            <option value="10%">10%</option>
            <option value="15%">15%</option>
          </select>
        </label>
        <label>
          Discount:
          <select
            value={Discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="dropdown"
          >
            <option value="" disabled>
              Choose Percentage
            </option>
            <option value="2%">2%</option>
            <option value="5%">5%</option>
            <option value="10%">10%</option>
            <option value="15%">15%</option>
          </select>
        </label>

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
        <div className="file-upload-box" onClick={handleBoxClick}>
          <span>Click to upload product image or drag and drop</span>
          {productImage && <div className="file-name">{productImage.name}</div>}
          <input
            id="productImage"
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

export default AddProduct;
