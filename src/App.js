import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import AddCategory from './pages/AddCategory';
import AddSubCategory from './pages/AddSubCategory';
import AddBrand from './pages/AddBrand';
import ProductList from './pages/ProductList';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import SubCategoryList from './pages/SubCategoryList';
import PrintBarcode from './pages/PrintBarcode';
import ImportProducts from './pages/ImportProducts';
import SupplierList from './pages/SupplierList';
import AddSupplier from './pages/AddSupplier';
import AddQuotation from './pages/AddQuotation';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StoreIntegrationForm from './pages/StoreIntegrationForm.tsx'
import Orders from './pages/orders.js';
import FacebookPoster from './pages/FacebookPoster.js';
import "./App.css";


function App() {

  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
          <Route path="/Subcategories" element={<ProtectedRoute><AddSubCategory /></ProtectedRoute>} />
          <Route path="/Brands" element={<ProtectedRoute><AddBrand /></ProtectedRoute>} />
          <Route path="/ProductList" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/CategoryList" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
          <Route path="/BrandList" element={<ProtectedRoute><BrandList /></ProtectedRoute>} />
          <Route path="/SubCategoryList" element={<ProtectedRoute><SubCategoryList /></ProtectedRoute>} />
          <Route path="/PrintBarcode" element={<ProtectedRoute><PrintBarcode /></ProtectedRoute>} />
          <Route path="/ImportProducts" element={<ProtectedRoute><ImportProducts /></ProtectedRoute>} />
          <Route path="/SupplierList" element={<ProtectedRoute><SupplierList /></ProtectedRoute>} />
          <Route path="/AddSupplier" element={<ProtectedRoute><AddSupplier /></ProtectedRoute>} />
          <Route path="/AddQuotation" element={<ProtectedRoute><AddQuotation /></ProtectedRoute>} />
          <Route path="/products/sku/:sku" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/StoreIntegrationForm" element={<StoreIntegrationForm />} />
          <Route path="/FacebookPoster" element={<FacebookPoster/>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

      </Routes>
    </Router>
  );
}



export default App;