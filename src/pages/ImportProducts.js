import React, { useState } from 'react';
import './ImportProducts.css';

const ImportProducts = () => {
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'text/csv') {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === 'text/csv') {
      setFile(selectedFile);
    }
  };

  const handleDownloadSample = () => {
    // Implementation for downloading sample file
    console.log('Downloading sample file...');
  };

  const handleSubmit = () => {
    // Implementation for handling file upload
    console.log('Uploading file:', file);
  };

  const handleCancel = () => {
    setFile(null);
  };

  const requiredFields = [
    { name: 'Product Name', key: 'productName' },
    { name: 'Category', key: 'category' },
    { name: 'SKU code', key: 'skuCode' },
    { name: 'Product Cost', key: 'productCost' },
    { name: 'Product Price', key: 'productPrice' },
    { name: 'Product Unit', key: 'productUnit' },
  ];

  const optionalFields = [
    { name: 'Minimum Qty', key: 'minQty' },
    { name: 'Quantity', key: 'quantity' },
    { name: 'Tax', key: 'tax' },
    { name: 'Discount Type', key: 'discountType' },
    { name: 'Brand', key: 'brand' },
    { name: 'Minimum Qty', key: 'minimumQty' },
  ];

  return (
    <div className="import-products">
      <h1>Import Products</h1>
      <p className="subtitle">Bulk upload your products</p>

      <div className="card">
        <p className="csv-text">Field must be in csv format</p>
        
        <button className="download-btn" onClick={handleDownloadSample}>
          Download Sample File
        </button>

        <div className="upload-section">
          <p className="upload-title">Upload CSV File</p>
          <div
            className="drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <div className="upload-icon">⬆️</div>
            <p>Drag and drop a file to upload</p>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        <div className="fields-grid">
          <div className="required-fields">
            {requiredFields.map((field) => (
              <div key={field.key} className="field-row">
                <span className="field-name">{field.name}</span>
                <span className="required-text">This Field is required</span>
              </div>
            ))}
          </div>
          <div className="optional-fields">
            {optionalFields.map((field) => (
              <div key={field.key} className="field-row">
                <span className="field-name">{field.name}</span>
                <span className="optional-text">Field optional</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button 
          className={`submit-btn ${!file ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!file}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ImportProducts;