import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fetch products from Strapi
  useEffect(() => {
    fetch("http://localhost:1337/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const productData = data.data.map((item) => ({
          id: item.id,
          ...item, // Include all product attributes directly
        }));
        console.log("Formatted product data:", productData);
        setProducts(productData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter and Sort Products
  const filteredProducts = products.filter((product) => {
    return (
      product.Product_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Product_SKU?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Sorting Functionality
  const sortData = (key) => {
    setSortConfig((prev) => {
      const direction = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  return (
    <div className="add-product-listt">
      <div className="headerr">
        <div>
          <h2>Product List</h2>
          <p>Manage your products</p>
        </div>
        <button className="add-buttonn" onClick={() => navigate("/products")}>
          + Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-barr">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-containerr">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th onClick={() => sortData("Product_ID")}>
                Product ID {sortConfig.key === "Product_ID" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Product_Name")}>
                Product Name {sortConfig.key === "Product_Name" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Product_SKU")}>
                SKU {sortConfig.key === "Product_SKU" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Category")}>
                Category {sortConfig.key === "Category" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("HS_Code")}>
                HS Code {sortConfig.key === "HS_Code" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Cost_Price")}>
                Cost Price {sortConfig.key === "Cost_Price" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Selling_Price")}>
                Selling Price {sortConfig.key === "Selling_Price" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Stock_Quantity")}>
                Stock Quantity {sortConfig.key === "Stock_Quantity" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td><input type="checkbox" /></td>
                <td>{product.Product_ID || "N/A"}</td>
                <td>{product.Product_Name || "N/A"}</td>
                <td>{product.Product_SKU || "N/A"}</td>
                <td>{product.Category || "N/A"}</td>
                <td>{product.HS_Code || "N/A"}</td>
                <td>${product.Cost_Price?.toFixed(2) || "N/A"}</td>
                <td>${product.Selling_Price?.toFixed(2) || "N/A"}</td>
                <td>{product.Stock_Quantity || "N/A"}</td>
                <td>
                  <span className="action-icon view-iconn">👁️</span>
                  <span className="action-icon edit-iconn">✏️</span>
                  <span className="action-icon delete-iconn">🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
