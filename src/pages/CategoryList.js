import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryList.css";

function CategoryList() {
  const navigate = useNavigate();

  // Initial Category List Data
  const [categories, setCategories] = useState([
    { id: 1, name: "Computers", CategoryCode: "CT001", Description: "Laptop", createdBy: "Admin" },
    { id: 2, name: "Fruits", CategoryCode: "CT002", Description: "Fresh fruits", createdBy: "Admin" },
    { id: 3, name: "Vegetables", CategoryCode: "CT003", Description: "Organic vegetables", createdBy: "Admin" },
    { id: 4, name: "Furniture", CategoryCode: "CT004", Description: "Home furniture", createdBy: "Admin" },
    { id: 5, name: "Electronics", CategoryCode: "CT005", Description: "Gadgets and devices", createdBy: "Admin" },
    { id: 6, name: "Accessories", CategoryCode: "CT006", Description: "Fashion accessories", createdBy: "Admin" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filtered and Sorted Categories
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.CategoryCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
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
          <h2>Product Category List</h2>
          <p>View/Manage your product Categories</p>
        </div>
        <button className="add-buttonn" onClick={() => navigate("/Categories")}>
          + Add New Category
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
                Category Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("CategoryCode")}>
                Category Code {sortConfig.key === "CategoryCode" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Description")}>
                Description {sortConfig.key === "Description" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("createdBy")}>
                Created By {sortConfig.key === "createdBy" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category) => (
              <tr key={category.id}>
                <td><input type="checkbox" /></td>
                <td>{category.name}</td>
                <td>{category.CategoryCode}</td>
                <td>{category.Description}</td>
                <td>{category.createdBy}</td>
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

export default CategoryList;
