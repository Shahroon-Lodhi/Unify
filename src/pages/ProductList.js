import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);

  useEffect(() => {
    // Fetch products
    fetch("http://localhost:1337/api/products")
      .then((response) => response.json())
      .then((data) => {
        const productData = data.data.map((item) => ({
          id: item.id,
          ...item,
        }));
        setProducts(productData);
      })
      .catch((error) => console.error("Error fetching products:", error));
    
    // Fetch categories
    fetch("http://localhost:1337/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data.map((cat) => cat.name)); // Extract category names
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.Product_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Product_SKU?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const handleDelete = (productId, sku) => {
    fetch(`http://localhost:1337/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== productId));

          fetch(`http://localhost:1337/api/products/${productId}/delete`, {
            method: 'POST',
          })
            .then((deleteResponse) => {
              if (!deleteResponse.ok) {
                console.error('Failed to delete from WooCommerce/Shopify.');
              }
            })
            .catch((error) => console.error('Error deleting from WooCommerce/Shopify:', error));
        } else {
          console.error('Failed to delete product from Strapi.');
        }
      })
      .catch((error) => console.error('Error deleting product from Strapi:', error));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };
  
  const handleView = (product) => {
    setViewingProduct(product);
    setIsViewModalOpen(true);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:1337/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Product_Name: editingProduct.Product_Name,
          Product_SKU: editingProduct.Product_SKU,
          Category: editingProduct.Category,
          HS_Code: editingProduct.HS_Code,
          Cost_Price: editingProduct.Cost_Price,
          Selling_Price: editingProduct.Selling_Price,
          Stock_Quantity: editingProduct.Stock_Quantity,
        },
      }),
    })
      .then((response) => response.json())
      .then(() => {
        const updated = products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...editingProduct } : p
        );
        setProducts(updated);
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Update failed:", error);
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
              <th onClick={() => sortData("Product_Name")}>Product Name</th>
              <th onClick={() => sortData("Product_SKU")}>SKU</th>
              <th onClick={() => sortData("Category")}>Category</th>
              <th onClick={() => sortData("HS_Code")}>HS Code</th>
              <th onClick={() => sortData("Cost_Price")}>Cost Price</th>
              <th onClick={() => sortData("Selling_Price")}>Selling Price</th>
              <th onClick={() => sortData("Stock_Quantity")}>Stock Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} onClick={() => handleView(product)} className="product-row">
                <td onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                <td>{product.Product_Name || "N/A"}</td>
                <td>{product.Product_SKU || "N/A"}</td>
                <td>{product.Category || "N/A"}</td>
                <td>{product.HS_Code || "N/A"}</td>
                <td>${product.Cost_Price?.toFixed(2) || "N/A"}</td>
                <td>${product.Selling_Price?.toFixed(2) || "N/A"}</td>
                <td>{product.Stock_Quantity || "N/A"}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <span className="action-icon edit-iconn" onClick={() => handleEdit(product)}>✏️</span>
                  <span className="action-icon delete-iconn" onClick={() => handleDelete(product.id, product.Product_SKU)}>🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h3>Edit Product</h3>
              <button className="close-button" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>
            
            <div className="edit-modal-content">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={editingProduct.Product_Name || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, Product_Name: e.target.value })
                  }
                  placeholder="Product Name"
                />
              </div>
              
              <div className="form-group">
                <label>SKU (Cannot be changed)</label>
                <input
                  type="text"
                  value={editingProduct.Product_SKU || ""}
                  disabled
                  className="disabled-input"
                  placeholder="SKU"
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  value={editingProduct.Category || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, Category: e.target.value })
                  }
                  className="category-dropdown"
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>HS Code</label>
                <input
                  type="text"
                  value={editingProduct.HS_Code || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, HS_Code: e.target.value })
                  }
                  placeholder="HS Code"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half-width">
                  <label>Cost Price ($)</label>
                  <input
                    type="number"
                    value={editingProduct.Cost_Price || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, Cost_Price: parseFloat(e.target.value) })
                    }
                    placeholder="Cost Price"
                    step="0.01"
                  />
                </div>
                
                <div className="form-group half-width">
                  <label>Selling Price ($)</label>
                  <input
                    type="number"
                    value={editingProduct.Selling_Price || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, Selling_Price: parseFloat(e.target.value) })
                    }
                    placeholder="Selling Price"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={editingProduct.Stock_Quantity || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, Stock_Quantity: parseInt(e.target.value) })
                  }
                  placeholder="Stock Quantity"
                />
              </div>
            </div>
            
            <div className="edit-modal-footer">
              <button className="cancel-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              <button className="save-button" onClick={handleUpdate}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Product View Modal */}
      {isViewModalOpen && viewingProduct && (
        <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="view-modal-header">
              <h3>Product Details</h3>
              <button className="close-button" onClick={() => setIsViewModalOpen(false)}>×</button>
            </div>
            
            <div className="view-modal-content">
              <div className="product-view-section">
                <div className="product-view-left">
                  {/* If product has an image, display it */}
                  {viewingProduct.image ? (
                    <img 
                      src={`http://localhost:1337${viewingProduct.image.url}`} 
                      alt={viewingProduct.Product_Name} 
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image-placeholder">
                      No Image Available
                    </div>
                  )}
                </div>
                
                <div className="product-view-right">
                  <h2 className="product-title">{viewingProduct.Product_Name}</h2>
                  
                  <div className="product-meta">
                    <span className="product-category">{viewingProduct.Category}</span>
                    <span className="product-sku">SKU: {viewingProduct.Product_SKU}</span>
                  </div>
                  
                  <div className="product-pricing">
                    <div className="price-item">
                      <span className="price-label">Cost Price</span>
                      <span className="price-value">${viewingProduct.Cost_Price?.toFixed(2) || "N/A"}</span>
                    </div>
                    
                    <div className="price-item">
                      <span className="price-label">Selling Price</span>
                      <span className="price-value">${viewingProduct.Selling_Price?.toFixed(2) || "N/A"}</span>
                    </div>
                  </div>
                  
                  <div className="stock-info">
                    <span className="stock-label">In Stock</span>
                    <span className="stock-value">{viewingProduct.Stock_Quantity || "0"}</span>
                  </div>
                </div>
              </div>
              
              <div className="product-details-section">
                <h4>Additional Details</h4>
                
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">HS Code</span>
                    <span className="detail-value">{viewingProduct.HS_Code || "N/A"}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Date Added</span>
                    <span className="detail-value">
                      {viewingProduct.createdAt ? new Date(viewingProduct.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Last Updated</span>
                    <span className="detail-value">
                      {viewingProduct.updatedAt ? new Date(viewingProduct.updatedAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="view-modal-footer">
              <button className="edit-button" onClick={() => {
                setIsViewModalOpen(false);
                handleEdit(viewingProduct);
              }}>Edit Product</button>
              <button className="close-view-button" onClick={() => setIsViewModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;