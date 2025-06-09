import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CategoryList.css";

function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fetch categories from Strapi when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://strapi-backend-production-63b5.up.railway.app/api/categories");
        console.log("API Response:", response.data); // Check the full response
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);

  // Filtered and Sorted Categories
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

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
              <th onClick={() => sortData("slug")}>
                Slug {sortConfig.key === "slug" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("description")}>
                Description {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category) => (
              <tr key={category.id}>
                <td><input type="checkbox" /></td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>{category.description}</td>
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
