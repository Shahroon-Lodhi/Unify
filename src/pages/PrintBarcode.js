import React, { useState } from "react";
import "./PrintBarcode.css";

const PrintBarcode = () => {
  const [products, setProducts] = useState([
    { name: "Macbook pro", sku: "PT001", qty: 100 },
    { name: "Apple Earpods", sku: "PT002", qty: 1000 },
    { name: "Macbook Pro", sku: "PT003", qty: 5000 },
  ]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [paperSize, setPaperSize] = useState("36mm (1.4 inch)");

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const newProduct = { name: selectedProduct, sku: `PT00${products.length + 1}`, qty: 1 };
    setProducts([...products, newProduct]);
    setSelectedProduct("");
  };

  const handleDelete = (sku) => {
    setProducts(products.filter((product) => product.sku !== sku));
  };

  const handleSubmit = () => {
    console.log("Products to Print:", products);
    console.log("Selected Paper Size:", paperSize);
    alert("Submitted successfully!");
  };

  const handleCancel = () => {
    alert("Cancelled");
  };

  return (
    <div className="print-barcode">
      <header className="header">
        <h1>Print Barcode</h1>
        <p>Print product barcodes</p>
      </header>

      <main className="content">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <div className="input-group">
            <input
              type="text"
              id="productName"
              placeholder="Please type product code and select..."
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            />
            <button onClick={handleAddProduct} >Add</button>
          </div>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.sku}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.qty}</td>
                <td>
                  <button onClick={() => handleDelete(product.sku)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-group">
          <label htmlFor="paperSize">Paper Size</label>
          <select
            id="paperSize"
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value)}
          >
            <option value="36mm (1.4 inch)">36mm (1.4 inch)</option>
            <option value="48mm (2 inch)">48mm (2 inch)</option>
          </select>
        </div>

        <div className="form-actions">
          <button onClick={handleSubmit} className="submit-btn">Submit</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>
      </main>
    </div>
  );
};

export default PrintBarcode;
