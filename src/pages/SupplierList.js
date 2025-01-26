import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SupplierList.css";

function SupplierList() {
  const navigate = useNavigate();

  // Initial Supplier List Data
  const [supplierList, setSupplierList] = useState([
    { id: 1, name: "ABC Computers", Code: "S001", Phone: "030048597", Email: "example@gmail.com", Country: "Pakistan" },
    { id: 2, name: "XYZ Computers", Code: "S002", Phone: "030048596", Email: "example@gmail.com", Country: "Saudia" },
    { id: 3, name: "Tech Electronics", Code: "S003", Phone: "030048595", Email: "example@gmail.com", Country: "Bhutan" },
    { id: 4, name: "Mega Suppliers", Code: "S004", Phone: "030048594", Email: "example@gmail.com", Country: "Pakistan" },
    { id: 5, name: "Global Traders", Code: "S005", Phone: "030048593", Email: "example@gmail.com", Country: "Pakistan" },
    { id: 6, name: "Market Supplies", Code: "S006", Phone: "030048592", Email: "example@gmail.com", Country: "Pakistan" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filtered and Sorted Suppliers
  const filteredSupplierList = supplierList.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.Phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.Country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSupplierList = [...filteredSupplierList].sort((a, b) => {
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
    <div className="add-product-list">
      <div className="header">
        <div>
          <h2>Supplier List</h2>
          <p>View/Manage your supplier list</p>
        </div>
        <button className="add-buttonn" onClick={() => navigate("/AddSupplier")}>
          + Add New Supplier
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
              <th onClick={() => sortData("name")}>
                Supplier Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Code")}>
                Supplier Code {sortConfig.key === "Code" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Phone")}>
                Phone {sortConfig.key === "Phone" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Email")}>
                Email {sortConfig.key === "Email" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("Country")}>
                Country {sortConfig.key === "Country" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedSupplierList.map((supplier) => (
              <tr key={supplier.id}>
                <td><input type="checkbox" /></td>
                <td>{supplier.name}</td>
                <td>{supplier.Code}</td>
                <td>{supplier.Phone}</td>
                <td>{supplier.Email}</td>
                <td>{supplier.Country}</td>
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

export default SupplierList;
