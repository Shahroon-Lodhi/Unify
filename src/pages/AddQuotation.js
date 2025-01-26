import React, { useState } from 'react';
import './AddQuotation.css';

const AddQuotation = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [quotationDate, setQuotationDate] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      image: '🎧',
      name: 'Apple Earpods',
      netPrice: 150,
      stock: 500,
      qty: 1,
      discount: 10,
      tax: 15,
      subtotal: 135
    },
    {
      id: 2,
      image: '💻',
      name: 'Macbook Pro',
      netPrice: 1500,
      stock: 6000,
      qty: 2,
      discount: 50,
      tax: 30,
      subtotal: 3050
    }
  ]);
  const [searchProduct, setSearchProduct] = useState('');
  const [orderTax, setOrderTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Calculate grand total based on products and adjustments
  const calculateGrandTotal = () => {
    const productTotal = products.reduce((acc, product) => acc + product.subtotal, 0);
    const taxAmount = (orderTax / 100) * productTotal;
    const grandTotal = productTotal + taxAmount - discount + parseFloat(shipping || 0);
    return grandTotal.toFixed(2);
  };

  return (
    <div className="quotation-add">
      <h1>Quotation Add</h1>
      <p className="subtitle">Add/Update Quotation</p>

      <div className="form-header">
        <div className="form-group">
          <label>Customer Name</label>
          <div className="select-with-button">
            <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
              <option value="">Select Customer</option>
            </select>
            <button type="button" className="add-button">+</button>
          </div>
        </div>

        <div className="form-group">
          <label>Quotation Date</label>
          <input
            type="date"
            placeholder="DD-MM-YYYY"
            value={quotationDate}
            onChange={(e) => setQuotationDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Reference No.</label>
          <input
            type="text"
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Scan/Search Product by code and select..."
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>

      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Net Unit Price ($)</th>
              <th>Stock</th>
              <th>Qty</th>
              <th>Discount ($)</th>
              <th>Tax %</th>
              <th>Subtotal ($)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <span className="product-image">{product.image}</span>
                  {product.name}
                </td>
                <td>{product.netPrice}</td>
                <td>{product.stock}</td>
                <td>{product.qty}</td>
                <td>{product.discount}</td>
                <td>{product.tax}</td>
                <td>{product.subtotal}</td>
                <td>
                  <button type="button" className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="calculations">
        <div className="orders-section">
          <div className="form-row">
            <div className="form-group">
              <label>Order Tax (%)</label>
              <input
                type="number"
                value={orderTax}
                onChange={(e) => setOrderTax(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>Discount ($)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>Shipping ($)</label>
              <input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Choose Status</option>
              </select>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-row">
            <span>Order Tax</span>
            <span>{orderTax}%</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>$ {discount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>$ {shipping}</span>
          </div>
          <div className="summary-row total">
            <span>Grand Total</span>
            <span>$ {calculateGrandTotal()}</span>
          </div>
        </div>
      </div>

      <div className="form-group description">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="button-group">
        <button type="submit" className="submit-btn">Submit</button>
        <button type="button" className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default AddQuotation;
