import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
  const navigate = useNavigate();

  // Initial Product List Data
  const [products, setProducts] = useState([
    { id: 1, name: "MacBook Pro", sku: "PT001", category: "Computers", brand: "N/D", price: 1500.0, unit: "pc", qty: 100.0, createdBy: "Admin" },
    { id: 2, name: "Orange", sku: "PT002", category: "Fruits", brand: "N/D", price: 10.0, unit: "pc", qty: 100.0, createdBy: "Admin" },
    { id: 3, name: "Pineapple", sku: "PT003", category: "Fruits", brand: "N/D", price: 10.0, unit: "pc", qty: 100.0, createdBy: "Admin" },
    { id: 4, name: "Strawberry", sku: "PT004", category: "Fruits", brand: "N/D", price: 10.0, unit: "pc", qty: 100.0, createdBy: "Admin" },
    { id: 5, name: "Avocado", sku: "PT005", category: "Accessories", brand: "N/D", price: 10.0, unit: "pc", qty: 150.0, createdBy: "Admin" },
    { id: 6, name: "MacBook Pro (Second)", sku: "PT006", category: "Shoes", brand: "N/D", price: 10.0, unit: "pc", qty: 100.0, createdBy: "Admin" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filtered and Sorted Products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <th onClick={() => sortData("name")}>
                Product Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("sku")}>
                SKU {sortConfig.key === "sku" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("category")}>
                Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("brand")}>
                Brand {sortConfig.key === "brand" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("price")}>
                Price {sortConfig.key === "price" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("unit")}>
                Unit {sortConfig.key === "unit" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("qty")}>
                Quantity {sortConfig.key === "qty" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("createdBy")}>
                Created By {sortConfig.key === "createdBy" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td><input type="checkbox" /></td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>{product.unit}</td>
                <td>{product.qty.toFixed(2)}</td>
                <td>{product.createdBy}</td>
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
