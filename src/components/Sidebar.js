import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  // State for managing dropdown toggles
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);

  return (
    <div className="sidebar">

      {/* Dashboard Link */}
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
      </ul>

      {/* Product Dropdown */}
      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setIsProductOpen(!isProductOpen)}
        >
          <span>Product</span>
          <span>{isProductOpen ? '-' : '+'}</span>
        </div>
        {isProductOpen && (
          <ul className="dropdown-menu">
            <li><NavLink to="/products">Add Product</NavLink></li>
            <li><NavLink to="/ProductList">Product List</NavLink></li>
            <li><NavLink to="/categories">Add Category</NavLink></li>
            <li><NavLink to="/CategoryList">Category List</NavLink></li>
            <li><NavLink to="/SubCategories">Add Sub Category</NavLink></li>
            <li><NavLink to="/SubCategoryList">Sub Category List</NavLink></li>
            <li><NavLink to="/Brands">Add Brand</NavLink></li>
            <li><NavLink to="/BrandList">Brand List</NavLink></li>
            <li><NavLink to="/ImportProducts">Import Products</NavLink></li>
            <li><NavLink to="/PrintBarcode">Print Barcode</NavLink></li>
          </ul>
        )}
      </div>

      {/* People Dropdown */}
      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setIsPeopleOpen(!isPeopleOpen)}
        >
          <span>People</span>
          <span>{isPeopleOpen ? '-' : '+'}</span>
        </div>
        {isPeopleOpen && (
          <ul className="dropdown-menu">
            <li><NavLink to="/AddSupplier">Add Supplier</NavLink></li>
            <li><NavLink to="/SupplierList">Supplier List</NavLink></li>
          </ul>
        )}
      </div>

      {/* Quotation Dropdown */}
      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setIsQuotationOpen(!isQuotationOpen)}
        >
          <span>Quotation</span>
          <span>{isQuotationOpen ? '-' : '+'}</span>
        </div>
        {isQuotationOpen && (
          <ul className="dropdown-menu">
            <li><NavLink to="/AddQuotation">Add Quotation</NavLink></li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
