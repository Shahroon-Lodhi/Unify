import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubCategoryList.css";

function SubCategoryList() {
  const navigate = useNavigate();

  // Initial SubCategory List Data
  const [subCategories] = useState([
    {
      id: 1,
      name: "Macbook",
      Parent_Name: "Computers",
      image: "data:image/jpeg;base64,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",
      CategoryCode: "CT001",
      Description: "Laptop",
    },
    {
      id: 2,
      name: "Shoes",
      Parent_Name: "Addidas",
      image: "data:image/jpeg;base64,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",
      CategoryCode: "CT002",
      Description: "Good",
    },
    {
      id: 3,
      name: "Banana",
      Parent_Name: "Fruits",
      image: "data:image/jpeg;base64,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",
      CategoryCode: "CT003",
      Description: "Berries",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filtered and Sorted SubCategories
  const filteredSubCategories = subCategories.filter(
    (subCategory) =>
      subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subCategory.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subCategory.Parent_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subCategory.CategoryCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSubCategories = [...filteredSubCategories].sort((a, b) => {
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
    <div className="sub-category-list">
      <div className="header">
        <div>
          <h2>SubCategory List</h2>
          <p>View/Manage your subcategories</p>
        </div>
        <button className="add-buttonn" onClick={() => navigate("/SubCategories")}>
          + Add New SubCategory
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Image</th>
              <th onClick={() => sortData("name")}>
                Sub Category Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Description")}>
                Description {sortConfig.key === "Description" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Parent_Name")}>
                Parent Category Name {sortConfig.key === "Parent_Name" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("CategoryCode")}>
                Category Code {sortConfig.key === "CategoryCode" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubCategories.map((subCategory) => (
              <tr key={subCategory.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <img
                    src={subCategory.image}
                    alt={subCategory.name}
                    style={{ width: "50px", height: "50px", objectFit: "contain" }}
                  />
                </td>
                <td>{subCategory.name}</td>
                <td>{subCategory.Description}</td>
                <td>{subCategory.Parent_Name}</td>
                <td>{subCategory.CategoryCode}</td>

                <td>
                  <span className="action-icon view-icon">👁️</span>
                  <span className="action-icon edit-icon">✏️</span>
                  <span className="action-icon delete-icon">🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubCategoryList;
