import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Sidebar from './components/Sidebar';
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
import LoadingSpinner from './components/LoadingSpinner'; // Add this import

import "./App.css";

function AppContent() {
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsLoading(true);
    // Add a small delay to show the loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-wrapper">
        <Sidebar />
        <main className="main-container">
          {isLoading && <LoadingSpinner />}
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<AddProduct />} />
          <Route path="/categories" element={<AddCategory />} />
          <Route path="/Subcategories" element={<AddSubCategory />} />
          <Route path="/Brands" element={<AddBrand />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/CategoryList" element={<CategoryList />} />
          <Route path="/BrandList" element={<BrandList />} />
          <Route path="/SubCategoryList" element={<SubCategoryList />} />
          <Route path="/PrintBarcode" element={<PrintBarcode />} />
          <Route path="/ImportProducts" element={<ImportProducts />} />
          <Route path="/SupplierList" element={<SupplierList />} />
          <Route path="/AddSupplier" element={<AddSupplier />} />
          <Route path="/AddQuotation" element={<AddQuotation />} />



        </Routes>
        </main>
        </div>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;