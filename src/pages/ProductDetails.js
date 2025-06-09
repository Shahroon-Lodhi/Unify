// File: src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { sku } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://strapi-backend-production-63b5.up.railway.app/api/products?populate=Image&filters[Product_SKU][$eq]=${sku}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          const item = data.data[0];
          setProduct({
            id: item.id,
            ...item.attributes,
            Image: item.attributes.Image,
          });
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [sku]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <div className="product-details">
      <div className="header">
        <h2>Product Details</h2>
        <button className="back-button" onClick={() => navigate(-1)}>← Back to List</button>
      </div>
      <div className="card">
        <div className="field"><span className="label">Product Name:</span> {product.Product_Name}</div>
        <div className="field"><span className="label">SKU:</span> {product.Product_SKU}</div>
        <div className="field"><span className="label">Category:</span> {product.Category}</div>
        <div className="field"><span className="label">HS Code:</span> {product.HS_Code}</div>
        <div className="field"><span className="label">Cost Price:</span> ${product.Cost_Price?.toFixed(2)}</div>
        <div className="field"><span className="label">Selling Price:</span> ${product.Selling_Price?.toFixed(2)}</div>
        <div className="field"><span className="label">Stock Quantity:</span> {product.Stock_Quantity}</div>
        {product.Image?.data?.attributes?.url && (
          <div className="field image-field">
            <span className="label">Image:</span>
            <img src={`https://strapi-backend-production-63b5.up.railway.app${product.Image.data.attributes.url}`} alt={product.Product_Name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
