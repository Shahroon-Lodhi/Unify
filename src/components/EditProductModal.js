import React from "react";
import "./EditProductModal.css"; // You can move modal CSS here or import global CSS

const EditProductModal = ({ product, onClose, onChange, onUpdate }) => {
  return (
<div className="modal" onClick={onClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <h3>Edit Product</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onUpdate();
      }}
      className="modal-form"
    >
      <div className="form-grid">
        {[
          "Product_Name",
          "Cost_Price",
          "Selling_Price",
          "Category",
          "Stock_Quantity",
          "HS_Code",
        ].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace("_", " ")}:</label>
            <input
              type={field.includes("Price") || field === "Stock_Quantity" ? "number" : "text"}
              value={product[field] || ""}
              onChange={(e) => onChange({ ...product, [field]: e.target.value })}
              required
            />
          </div>
        ))}
      </div>

      <div className="modal-actions">
        <button type="submit" className="prod_det_update-btn">Update</button>
        <button type="button" onClick={onClose} className="prod_det_cancel-btn">Cancel</button>
      </div>
    </form>
  </div>
</div>

  );
};

export default EditProductModal;
