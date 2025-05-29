// components/DashboardLayout.js
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoadingSpinner from './LoadingSpinner';
import { Outlet, useLocation } from 'react-router-dom';
import './DashboardLayout.css'; // Optional

const DashboardLayout = () => {
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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
