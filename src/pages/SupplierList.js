import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SupplierList.css";

function SupplierList() {
  const navigate = useNavigate();
  const [supplierList, setSupplierList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/suppliers");
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setSupplierList(
            result.data.map((supplier) => ({
              id: supplier.id,
              name: supplier.Supplier_Name || "N/A",
              phone: supplier.Contact_Number || "N/A",
              email: supplier.Supplier_Email || "N/A",
              country: supplier.Country || "N/A",
              city: supplier.City || "N/A",
              zipCode: supplier.ZipCode || "N/A",
            }))
          );
        } else {
          console.error("Unexpected API response format:", result);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  // Filtered and Sorted Suppliers
  const filteredSupplierList = supplierList.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.zipCode.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th onClick={() => sortData("phone")}>
                Phone {sortConfig.key === "phone" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("email")}>
                Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("country")}>
                Country {sortConfig.key === "country" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("city")}>
                City {sortConfig.key === "city" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th onClick={() => sortData("zipCode")}>
                Zip Code {sortConfig.key === "zipCode" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedSupplierList.length > 0 ? (
              sortedSupplierList.map((supplier) => (
                <tr key={supplier.id}>
                  <td><input type="checkbox" /></td>
                  <td>{supplier.name}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.country}</td>
                  <td>{supplier.city}</td>
                  <td>{supplier.zipCode}</td>
                  <td>
                    <span className="action-icon view-icon">👁️</span>
                    <span className="action-icon edit-icon">✏️</span>
                    <span className="action-icon delete-icon">🗑️</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>No suppliers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierList;
